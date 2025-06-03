import { Group, Text } from '@mantine/core'
import { GithubDataContext } from '../../context/GithubDataProvider'
import { useContext } from 'react'
import { USERS_TOTAL_LIMIT } from '../../constants/config'
import { IconSelectAll } from '@tabler/icons-react'

const CountMessage = () => {
  const ctx = useContext(GithubDataContext);

  if (!ctx || ctx.totalCount < 1 || ctx.loadingUsers || ctx.onTyping || !ctx.searchInput) return null;


  const Message = () => ( 
    <Group mt={20} gap={5} wrap='nowrap' align='start'>
      <IconSelectAll color='gray' size={14} />
      { ctx.totalCount <= USERS_TOTAL_LIMIT 
        ? <Text c="gray" ta={"left"} size="xs">All available data related to "{ctx.searchInput}" has been displayed</Text>
        : <Text c="gray" ta={"left"} size="xs">
            We found <Text span td={"underline"} fw={"bold"}>{ctx.totalCount}</Text> results. you can get a different list by trying different username combination!
          </Text>
      }
    </Group>
  )

  return (
    <>
      <Message />
    </>
  )
}

export default CountMessage;