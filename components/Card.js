import { Box } from '@chakra-ui/react'
import * as React from 'react'

export const Card = (props) => (
  <Box
    bg="white"
    rounded={{
      md: 'lg',
    }}
    p={3}
    shadow="base"
    overflow="hidden"
    {...props}
  />
)
