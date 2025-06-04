import React from 'react'
import { Text } from '@mantine/core'

const TextHeading = ({children}: {children:React.ReactNode}) => {
  return (
    <Text 
      fz={{
        base: 18,
        xs: 30,
        md: 35,
      }}
      fw={900}
      mb={{base:0, xs:5}}
      variant="gradient"
      gradient={{ from: 'red', to: 'violet', deg: 90 }}
      >
      {children}
    </Text>
  )
  
}

export {TextHeading};