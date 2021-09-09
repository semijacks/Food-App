import { gql } from '@apollo/client'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import client from '../apolloClient'
import styles from '../styles/Home.module.css'

export default function Home({ items }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Food Ordering App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Food Ordering App</h1>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <Link href={`/items/${item.slug}`}>{item.itemName}</Link>
          </li>
        ))}
      </ul>
    </div>
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
