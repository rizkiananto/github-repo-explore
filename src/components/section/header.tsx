import { Group, Title, Space, Image } from '@mantine/core'
import { TextHeading } from '../text'

const Header = () => {
  return (
    <>
      <Group align='center' gap={5} justify='center' mb={{base: 10, xs: 8}}>
        <TextHeading>Quick GitHub</TextHeading>
        <Image radius={"xl"} w={{base:18, xs:24}} h={{base:18, xs:24}} mx={{base: 0, xs: 5}} src={'./github.png'} bg={"gray"} />
        <TextHeading>Profile Finder</TextHeading>
      </Group>
      <Title 
        order={5} 
        c={'gray'} 
        fw={'normal'}
        fz={{
          base: 14,
          xs: 18
        }}
        >
          Instantly locate GitHub accounts and explore their public repositories. 🧙‍♂️
      </Title>
      <Space h="xl"/>
    </>
  )
}

export default Header;