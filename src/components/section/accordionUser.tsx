import { useCallback, useContext, useEffect, useState } from 'react';
import { Group, Avatar, Text, Accordion, Space } from '@mantine/core';
import Loading from '../loader';
import { GithubDataContext } from '../../context/GithubDataProvider';
import { type IUser, type IRepository } from '../../types';
import RepoDetail from './repoCard';
import classes from './accordionUser.module.css';
import { IconNotesOff } from '@tabler/icons-react';

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

  const fetchRepo = useCallback(async (userSelected: IUser) => {
    ctx?.setLoadingRepos(true);

    try {
      const response = await fetch(`https://api.github.com/users/${userSelected?.login}/repos`);
      if (!response.ok) {
        throw new Error("Search Failed");
      };
      const responseData = await response.json();

      if (responseData.length === 0) {
        // ctx?.setError("No github account with that username")
        console.log("No repo found");
      } else {
        ctx?.setUsers(prevUsers => (
          prevUsers.map(user => 
            user.login === userSelected.login
            ? { 
                ...user,
                repo_list: responseData.map((repo: IRepository) => ({
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      ctx?.setLoadingRepos(false);
    }
  }, [ctx])

  useEffect(() => {
    if (activeTab) {
      const userSelected = ctx?.users.find((user) => user.login === activeTab);
      if (userSelected) {
        ctx?.selectUser(userSelected);
        fetchRepo(userSelected);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  const AccordionDetails = ({repos}: {repos: IRepository[]}) => {
    return (
      <div style={{marginTop: '15px'}}>
        {ctx?.loadingRepos ?
        <div 
          style={{
            padding: '',
          }}
          >
          <Loading/>
          <Text size="xs" mt={2}>Getting Repo list...</Text>
        </div>
        :
        <>
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
          }) : <Text size='xs' my={30} fs={"italic"}>no public repositories owned by this user</Text>}
        </>
        }
      </div>
    )
  }

  const ListUsersEmpty = () => {
    return (
      <>
        <Space h="xl"/>
        {!ctx?.searchInput && <Text c={"gray"} size='xs'>Just type anything to start and let the search begin ✨</Text>}
        {ctx?.searchInput && ctx.users.length === 0 && 
          <Group justify='center' align='center' gap={5}>
            <IconNotesOff size={20} color='red'/>
            <Text c={"red"} size='xs'>Couldn't find anyone by that name</Text>
          </Group>
        }
      </>
    )
  }

  const handleAccordionChange = useCallback((value: string | null) => {
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
          }}
          classNames={classes}
          chevronPosition="right"
          variant="contained"
          value={activeTab}
          onChange={handleAccordionChange}
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
        <AccordionDetails repos={item.repo_list || []}/>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
    {!ctx || ctx?.loadingUsers ?
      <Loading/> 
      :
      <>
        {ctx.onTyping ? 
          <Text size='xs' c={"gray"}>we will automatically start searching after you stop typing... 🚀</Text>
          :
          <ListUsers/>
        }
      </>
    }
    </>
  );
}