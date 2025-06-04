import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Group, Avatar, Text, Accordion, Space, Anchor } from '@mantine/core';
import Loading from '../loader';
import { GithubDataContext } from '../../context/GithubDataProvider';
import { type IUser, type IRepository } from '../../types';
import RepoDetail from './repoCard';
import classes from './accordionUser.module.css';
import { IconNotesOff, IconExternalLink } from '@tabler/icons-react';
import { LABELS } from '../../constants';
import { API_URL } from '../../constants/api';
import toast from 'react-hot-toast';

interface AccordionLabelProps {
  label: string;
  image: string;
  description: string;
}

function AccordionLabel({ label, image, description }: AccordionLabelProps) {
  return (
    <Group wrap="nowrap">
      <Avatar src={image} radius="xl" size="lg" />
      <div>
        <Text>{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

export default function AccordionList() {
  const ctx = useContext(GithubDataContext);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(true);
  const abortController = useRef<AbortController | null>(null);

  const fetchRepo = async (userSelected: IUser, signal?: AbortSignal) => {
    setLoadingRepos(true);
    try {
      const response = await fetch(
        `${API_URL}users/${userSelected?.login}/repos`,
        {signal}
      );
      if (signal?.aborted) {
        // repository fetch was cancelled
        console.log('Repository fetch was cancelled');
        return;
      }
      if (!response.ok) {
        toast.error("Error when fetching User Repository from Git API")
        throw new Error("Search Failed");
      };
      if (signal?.aborted) {
        console.log('Repository fetch was cancelled after response');
        return;
      }
      const responseData = await response.json();

      ctx?.setUsers(prevUsers => (
        prevUsers.map(user => 
          user.login === userSelected.login
          ? { 
              ...user,
              repo_list: responseData.length === 0 ? [] : responseData.map((repo: IRepository) => ({
                node_id: repo.node_id,
                name: repo.name,
                description: repo.description,
                language: repo.language,
                html_url: repo.html_url,
                forks_count: repo.forks_count,
                stargazers_count: repo.stargazers_count,
                watchers_count: repo.watchers_count
              }))
            }
          : user
        )
      ));
    } catch (error) {
      toast.error("Network Error");
      console.error(error);
    } finally {
      setLoadingRepos(false);
    }
  }

  useEffect(() => {
    if (activeTab) {
      const userSelected = ctx?.users.find((user) => user.login === activeTab);
      if (userSelected && !userSelected.repo_list) {
        const newAbortController = new AbortController();
        abortController.current = newAbortController;
        
        fetchRepo(userSelected, newAbortController.signal);
      }
    }

    return () => {
      if (abortController.current) abortController.current.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const AccordionDetails = ({repos, profile_link}: {repos: IRepository[], profile_link: string}) => {
    return (
      <div style={{marginTop: '15px'}}>
        {loadingRepos ?
        <div>
          <Loading/>
          <Text size="xs" mt={2}>{LABELS.ACTION_LOADING_REPO}</Text>
        </div>
        :
        <>
          <Group align='center' justify='center' gap={3} mb={15}>
            <Anchor
              variant="gradient"
              gradient={{ from: 'pink', to: 'red' }}
              fw={600}
              fz="xs"
              style={{ textDecoration: 'none' }}
              href={profile_link}
              target='_blank'
              >
              <Group gap={3} align="center">
                Check Full Profile on Github
                <IconExternalLink size={14} color='red' stroke={3}/>
              </Group>
            </Anchor>
          </Group>
          {repos?.length !== 0 ? repos?.map((repo) => {
            return ( 
              <div key={repo.node_id}>
                <RepoDetail 
                  name={repo.name} 
                  language={repo.language || ""} 
                  forks_count={repo.forks_count}
                  stargazers_count={repo.stargazers_count}
                  watchers_count={repo.watchers_count}
                  description={repo.description || ""}
                  html_url={repo.html_url}
                  />
                <Space h={'md'}/>
              </div>
            )
          }) : <Text size='xs' my={30} fs={"italic"}>{LABELS.ACTION_NO_REPO_RESULT}</Text>}
        </>
        }
      </div>
    )
  }

  const ListUsersEmpty = () => {
    return (
      <>
        <Space h="xl"/>
        {!ctx?.searchInput && <Text c={"gray"} size='xs'>{LABELS.ACTION_INITIAL}</Text>}
        {ctx?.searchInput && ctx.users.length === 0 && 
          <Group justify='center' align='center' gap={5}>
            <IconNotesOff size={20} color='red'/>
            <Text c={"red"} size='xs'>{LABELS.ACTION_NO_RESULT}</Text>
          </Group>
        }
      </>
    )
  }

  const handleAccordionChange = useCallback((value: string | null) => {
    if (abortController.current) {
      abortController.current.abort();
    }
    setActiveTab(value);
  }, []);

  const ListUsers = () => {
    return (
      <>
        {ctx && ctx.users.length > 0 ?
        <Accordion 
          key="user-accordion"
          styles={{
            root: {boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'},
            content: {
              transition: 'all 500ms ease'
            }
          }}
          classNames={classes}
          chevronPosition="right"
          variant="contained"
          value={activeTab}
          onChange={handleAccordionChange}
          transitionDuration={500}
          >
          {items}
        </Accordion>
        : 
        <ListUsersEmpty/>
        }
      </>
    )
  }

  const items = ctx?.users.map((item) => (
      <Accordion.Item key={item.login} value={item.login}>
        <Accordion.Control>
          <AccordionLabel label={item.login} image={item.avatar_url} description={''} {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <AccordionDetails repos={item.repo_list || []} profile_link={item.html_url}/>
        </Accordion.Panel>
      </Accordion.Item>
    )
  );

  return (
    <>
    {!ctx || ctx?.loadingUsers ?
      <Loading/> 
      :
      <>
        {ctx.onTyping ? !ctx.errorInput ?
          <Text size='xs' c={"gray"}>{LABELS.ACTION_TYPING}</Text> : null
          :
          <ListUsers/>
        }
      </>
    }
    </>
  );
}