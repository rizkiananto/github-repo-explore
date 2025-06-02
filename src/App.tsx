import './App.css'
import '@mantine/core/styles.css';

import { MantineProvider, createTheme, Container, Space, Title, Text } from '@mantine/core';
import InputText from './components/input';
import AccordionList from './components/card';
import {GitUserProvider} from './page/github-explore';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <GitUserProvider>
          <Container
            w={{
              base: 360,
              sm: 550,
              md: 650,
            }}
            >
            <Text 
              fz={30}
              fw={900}
              variant="gradient"
              gradient={{ from: 'red', to: 'violet', deg: 90 }}
              >Find Github User</Text>
            <Title order={5} c={'gray'} fw={'normal'}>we will help you search github account 🧙‍♂️</Title>
            <Space h="xl"/>
            <div>
              <InputText/>
            </div>
            <Space h="xl" />
            <AccordionList/>
          </Container>
        </GitUserProvider>
      </MantineProvider>
    </>
  )
}

export default App
