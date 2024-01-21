import React from 'react';
import Link from '../../components/link';
import { useQuery, gql } from '@apollo/client';

const LinkList = () => {
  const FEED_QUERY = gql`
    {
      feed {
        id
        links {
          id
          createdAt
          url
          description
        }
      }
    }
  `;

  const { data } = useQuery(FEED_QUERY);

  // Check if data is undefined or does not have the expected structure
  if (!data || !data.feed || !data.feed.links) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.feed.links.map((link: { id: string; createdAt: Date; url: string; description: string }) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;