import React from 'react'
import Link from 'next/link'
import { gql } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0'
import client from '../../apolloClient'

function ItemPage({ item }) {
  const { user } = useUser()
  return (
    <>
      {user ? (
        <div>
          <h1>{item.itemName}</h1>
          <img
            src={item.itemImage[0].url}
            alt={`${item.itemName} Cover Image`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: item.itemDescription.html }}
          />
          <button>
            <Link href="/api/auth/logout">Logout</Link>
          </button>
        </div>
      ) : (
        <button>
          <Link href="/api/auth/login">Login</Link>
        </button>
      )}
    </>
  )
}

export default ItemPage

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        items {
          slug
        }
      }
    `,
  })
  const { items } = data
  const paths = items.map((item) => ({
    params: { slug: [item.slug] },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0]
  const { data } = await client.query({
    query: gql`
      query ItemBySlug($slug: String!) {
        items(where: { slug: $slug }) {
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
            raw
            html
          }
        }
      }
    `,
    variables: { slug },
  })
  const { items } = data
  const item = items[0]
  return {
    props: {
      item,
    },
  }
}
