import React from 'react'
import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import NavBar from './NavBar'
import Footer from './Footer'

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Top Foods</title>
      </Head>
      <main>
        <NavBar />
        <Container maxW="container.3xl" py={4}>
          {children}
        </Container>
        <Footer />
      </main>
    </>
  )
}

export default Layout
