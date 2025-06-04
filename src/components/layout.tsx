import React from 'react'
import { Container } from '@mantine/core'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <Container
      w={{
        base: "full",
        sm: 550,
        md: 650,
      }}
      >
        {children}
      </Container>
  )
}

export default Layout