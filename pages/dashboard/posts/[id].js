import React from 'react';
import MainLayout from '../../../layout/main';
import Auth from "../../../layout/auth";
import Post from '../../../containers/posts';

function Home() {
  return ( 
    <Auth>
      <MainLayout>
        <Post/>
      </MainLayout>
    </Auth>
  )
}

export default Home;
