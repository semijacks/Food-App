import React from 'react'
import Head from 'next/head'
import { Container, Box } from '@chakra-ui/react'
import NavBar from './NavBar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Top Foods</title>
      </Head>
      <Box>
        <NavBar />
        <Container
          maxW={['container.sm', 'container.md', '95%']}
          minH="90vh"
          py={4}
          px={0}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
