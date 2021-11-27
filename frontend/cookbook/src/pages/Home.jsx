import React from 'react';
import { Stack } from '@mui/material';

import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { BannerData } from '../components/BannerData';
import Category from '../components/Category';
import HomeRecipe from '../components/HomeRecipe';


function Home () {
  return (
    <div style={{ backgroundColor:'#F9FAF9', minHeight: '100vh' }}>
      <Navbar />
      <Stack
        pt={20}
        spacing={5}
      >
        <Banner bannerdata={BannerData} style={{ backgroundColor:'red' }}/>
        <Category />
        <HomeRecipe />
      </Stack>
    </div>
  )
}

export default Home;