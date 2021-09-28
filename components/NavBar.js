import React from 'react'
import Link from 'next/link'
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { useUser } from '@auth0/nextjs-auth0'

function NavBar() {
  const { user } = useUser()
  return (
    <Box bg="blue.900" w="100%" py={2} px={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Box fontSize="lg">
          <Link href="/">Edibles</Link>
        </Box>
        {user ? (
          <Flex alignItems="center">
            <Image
              borderRadius="50%"
              width="50"
              height="50"
              src={user.picture}
              alt="user profile image"
              overflow="hidden"
              mr={4}
            />
            <Box mr={4} color="blue">
              <Menu>
                <MenuButton as={IconButton} icon={<ChevronDownIcon />} />
                <MenuList>
                  <MenuItem>
                    <Link href="/cart">Cart</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/api/auth/logout">Logout</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        ) : (
          <Button colorScheme="blue">
            <Link href="/api/auth/login">Login</Link>
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default NavBar
