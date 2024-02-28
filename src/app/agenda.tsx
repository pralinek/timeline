import agenda from 'agenda';
import { connectToDatabase } from '../../utils/db';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  
  const myAgenda = new agenda().mongo(db, 'jobs');

  myAgenda.define('myJob', async (job) => {
    // Your job logic here
  });

  myAgenda.every('1 minute', 'myJob');

  await myAgenda.start();

  res.status(200).json({ message: 'Job scheduled successfully' });
};

import React from 'react';

const Home = ({ data }) => {
  // Render your component using the fetched data
};

Home.getInitialProps = async () => {
  // Fetch data from API or perform any necessary operations
  const res = await fetch('/api/data');
  const data = await res.json();

  return { data };
};

export default Home;
