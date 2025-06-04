import './App.css'
import '@mantine/core/styles.css';

import { MantineProvider, createTheme, Space } from '@mantine/core';
import InputText from './components/section/inputUsername';
import AccordionList from './components/section/accordionUser';
import { GithubDataProvider } from './context/GithubDataProvider';
import Layout from './components/layout';
import Header from './components/section/header';
import CountMessage from './components/section/countMessage';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  fontFamily: 'Verdana, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Outfit, sans-serif' },
});

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <GithubDataProvider>
          <Layout>
            <Header/>
            <InputText/>
            <CountMessage/>
            <Space h="xl" />
            <AccordionList/>
            <Toaster/>
          </Layout>
        </GithubDataProvider>
      </MantineProvider>
    </>
  )
}

export default App
