import React from 'react';
import Link from '../../components/link';
import { useQuery } from '@apollo/client';
import { FEED_QUERY } from '../../graphQL';

const LinkList = () => {


  const { loading, error, data } = useQuery(FEED_QUERY);

  // Check if data is undefined or does not have the expected structure
  if( loading || !data ) {
    return <div>Loading...</div>;
  }
  if (error) {
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