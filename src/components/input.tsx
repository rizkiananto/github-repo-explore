import { useContext } from 'react';
import { GitUsersContext } from '../page/github-explore';
import { Input, CloseButton } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function InputText() {
  const ctx = useContext(GitUsersContext);
  
  return (
    <>
      {ctx &&
      <Input
        placeholder="Start by typing any Github Username.."
        value={ctx.searchInput}
        onChange={(event) => 
          ctx.setSearchInput(event.currentTarget.value)
        }
        styles={{
          wrapper: {boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px', background: 'transparent'},
          input: {padding: '25px 20px 25px 35px', borderRadius: '10px', background: 'transparent'}
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