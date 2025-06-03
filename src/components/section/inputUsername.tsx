import { useContext } from 'react';
import { GithubDataContext } from '../../context/GithubDataProvider';
import { Input, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function InputText() {
  const ctx = useContext(GithubDataContext);
  
  return (
    <>
      {ctx &&
      <Input
        placeholder="Type any Github Username.."
        value={ctx.searchInput}
        onChange={(event) => 
          ctx.setSearchInput(event.currentTarget.value)
        }
        styles={{
          wrapper: {boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px', borderRadius: '10px', background: 'red', padding: 2, backgroundImage: "linear-gradient( 89.2deg,  rgba(255,255,255,1) -1.3%, rgba(253,109,38,1) 281.6% )"},
          input: {padding: '25px 20px 25px 35px', borderRadius: '10px', border: 'none', background: '#f2f2f2'}
        }}
        rightSectionPointerEvents="all"
        mt="md"
        leftSection={
          <IconSearch size={16}/>
        }
        rightSection={
          <CloseButton
            aria-label="Clear input now"
            onClick={() => ctx.clearSearch()}
            style={{ display: ctx.searchInput ? undefined : 'none' }}
          />
        }
      />
      }
    </>
  );
}