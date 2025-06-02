import { Card, Text, Badge, Button, Group, Space, Flex, Stack } from '@mantine/core';
import { IconGitFork, IconEye, IconStar, IconArrowRight, IconBrandGithub } from '@tabler/icons-react';
import type { IRepository } from '../page/github-explore';

function RepoDetail({
  title,
  description,
  language,
  forks_count,
  git_url,
}: IRepository) {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex direction="column">
        <Group justify="space-between" w="full" align="start" mt="md" mb="xs">
          <Stack gap='xs'>
            <Text size="md" ta={'left'} fw={500}>{title}</Text>
            {language ? 
              <Badge 
                size='xs' 
                variant="gradient"
                gradient={{ from: 'teal', to: 'cyan', deg: 90 }}
                >
                  {language}
                </Badge> 
              : null}
            <Text size="xs" c="dimmed" ta={'left'}>
              {description}
            </Text>
          </Stack>
          <Group>
            <Stack gap={'xs'}>
              <IconGitFork size={16}/>
              <Text size='xs'>{forks_count}</Text>
            </Stack>
            <Stack gap={'xs'}>
              <IconEye size={16}/>
              <Text size='xs'>{forks_count}</Text>
            </Stack>
            <Stack gap={'xs'}>
              <IconStar size={16}/>
              <Text size='xs'>{forks_count}</Text>
            </Stack>
          </Group>
        </Group>
        <Space h="xl"/>
        <Group justify='end'>
        <a href={git_url} target='_blank'>
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