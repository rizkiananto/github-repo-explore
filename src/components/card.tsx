/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useContext, useState } from 'react';
import { Group, Avatar, Text, Accordion, Space } from '@mantine/core';
import Loading from './loader';
import { GitUsersContext, type IRepository, type IUser } from '../page/github-explore';
import RepoDetail from './list';
import classes from './style.module.css';
import { repoList } from '../data/mockData';

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
  const ctx = useContext(GitUsersContext);
  const [load, setLoad] = useState(false);

  const fetchRepo = async (userSelected: IUser) => {
    // ctx?.setLoadingRepos(true);
    setLoad(true);
    setTimeout(() => {
      console.log('fetching repo for username:: ', userSelected);
      // ctx?.setLoadingRepos(false);
      setLoad(false);
    }, 2000);

    // try {
    //   const response = await fetch(`https://api.github.com/users/${userSelected?.login}/repos`);
    //   if (!response.ok) {
    //     throw new Error("Search Failed");
    //   };
    //   const responseData = await response.json();

    //   if (responseData.items.length === 0) {
    //     // ctx?.setError("No github account with that username")
    //     console.log("No repo found");
    //   } else {
    //     ctx?.setUsers(prevUsers => (
    //       prevUsers.map(user => 
    //         user.login === userSelected.login
    //         ? user.repo_list = responseData.map((repo: IRepository) => ({
    //             title: repo.title,
    //             description: repo.description,
    //             language: repo.language,
    //             forks_count: repo.forks_count,
    //             git_url: repo.git_url,
    //           }))
    //         : user
    //       )
    //     ));
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   ctx?.setLoadingRepos(false);
    // }
  }

  const showRepo = useCallback((name:string | null) => {
    console.log('11...',name)
    const userSelected = ctx?.users.find((user) => user.login === name);
    if (userSelected && userSelected.repo_list?.length === 0) {
      fetchRepo(userSelected);
    }
  }, [ctx])

  const AccordionDetails = () => {
    return (
      <div style={{marginTop: '15px'}}>
        <Text size="sm">Repository:</Text>
        {load ?
        <div 
          style={{
            padding: '',
          }}>
            <Loading/>
            <Text size="sm">Getting Repo list...</Text>
        </div>
        :
        <>
          {repoList.map((repo) => {
            return (
              <>
                <RepoDetail 
                  key={repo.id} 
                  title={repo.name} 
                  language={repo.language || ""} 
                  forks_count={repo.forks_count}
                  description={repo.description || ""}
                  git_url={repo.html_url}
                  />
                <Space h={'md'}/>
              </>
            )
          })}
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
      </>
    )
  }

  const ListUsers = () => {
    return (
      <>
        {ctx?.users.length === 0 ?
        <ListUsersEmpty/>
        : 
        <Accordion 
          styles={{
            root: {boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'},
            
          }}
          classNames={classes}
          chevronPosition="right" 
          variant="contained" 
          onChange={showRepo}
          >
          {items}
        </Accordion>
        }
      </>
    )
  }

  const items = ctx?.users.map((item) => (
    <Accordion.Item value={item.login} key={item.login}>
      <Accordion.Control>
        <AccordionLabel label={item.login} image={item.avatar_url} description={''} {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        <AccordionDetails/>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <>
    {!ctx || ctx?.loadingUsers ?
    <Loading/> 
    :
    <ListUsers/>
    }
    </>
  );
}