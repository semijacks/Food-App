import { gql } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import Head from 'next/head'
import Link from 'next/link'
import client from '../apolloClient'
import {
  Box,
  IconButton,
  Grid,
  Text,
  Image,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
} from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa'
import { Card } from '../components/Card'

export default function Home({ items }) {
  const { user } = useUser()
  return (
    <>
      {user ? (
        <Grid
          w={['100%', '100%', '100%']}
          mx="auto"
          gridTemplateColumns="repeat(auto-fit, minmax(var(--chakra-sizes-3xs), 1fr))"
          gridGap={6}
        >
          {items.map((item, i) => (
            <Card maxW="250px" mx="auto" key={i}>
              <Image
                w="232px"
                h="232px"
                borderRadius={7}
                src={item.itemImage[0].url}
                alt={`${item.itemName} Cover Image`}
              />
              <Heading size="md" color="black.500" mt={5}>
                {`NGN ${item.price}`}
              </Heading>
              <Text
                color="black.500"
                fontSize="md"
                fontWeight="normal"
                isTruncated
                my={3}
              >
                {item.itemName}
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Button colorScheme="blue">
                  <Link href={`/items/${item.slug}`}>Details</Link>
                </Button>
                <IconButton
                  size="lg"
                  colorScheme="blue"
                  variant="outline"
                  aria-label="Add to cart"
                  icon={<FaShoppingCart />}
                />
              </Flex>
            </Card>
          ))}
        </Grid>
      ) : (
        <Alert status="warning" color="black.500" fontSize="md">
          <AlertIcon />
          <AlertTitle mr={2}>You are not logged in!</AlertTitle>
          <AlertDescription>
            Click login button above to access edibles
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        items {
          itemName
          price
          seller {
            sellerName
          }
          slug
          itemImage {
            url
          }
          itemDescription {
            markdown
          }
        }
      }
    `,
  })
  const { items } = data
  return {
    props: {
      items,
    },
  }
}
