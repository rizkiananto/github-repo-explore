import { Card, Text, Badge, Button, Group, Space, Flex, Stack } from '@mantine/core';
import { IconGitFork, IconEye, IconStar, IconArrowRight, IconBrandGithub } from '@tabler/icons-react';
import { type IRepository } from '../../types';

function RepoDetail({
  name,
  description,
  language,
  forks_count,
  html_url,
  stargazers_count,
  watchers_count
}: Omit<IRepository, "node_id">) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex direction="column">
        <Flex justify="space-between" w="full" align="start" mt="md" mb="xs">
          <Stack gap='xs' maw={{
            base: 170,
            xs: 300
          }} pr={5}>
            <Text size="md" ta={'left'} fw={500} lineClamp={1}>{name}</Text>
            {language ? 
              <Badge 
                size='xs' 
                variant="gradient"
                gradient={{ from: 'teal', to: 'cyan', deg: 90 }}
                >
                  {language}
                </Badge> 
              : null}
            <Text size="xs" c="dimmed" ta={'left'} lineClamp={3}>
              {description}
            </Text>
          </Stack>
          <Group grow w={90}>
            <Stack gap={'xs'}>
              <IconGitFork size={16}/>
              <Text size='xs'>{forks_count}</Text>
            </Stack>
            <Stack gap={'xs'}>
              <IconEye size={16}/>
              <Text size='xs'>{watchers_count}</Text>
            </Stack>
            <Stack gap={'xs'}>
              <IconStar size={16}/>
              <Text size='xs'>{stargazers_count}</Text>
            </Stack>
          </Group>
        </Flex>
        <Space h="xl"/>
        <Group justify='end'>
        <a href={html_url} target='_blank'>
         <Button
            size='xs'
            fw={'normal'}
            variant="light"
            leftSection={<IconBrandGithub size={14} />}
            rightSection={<IconArrowRight size={14} />}
          >
          Visit Repo
        </Button>
        </a>
        </Group>
      </Flex>
    </Card>
  );
}

export default RepoDetail;