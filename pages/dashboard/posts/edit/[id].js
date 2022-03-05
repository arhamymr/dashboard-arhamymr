import React from 'react';
import MainLayout from 'layout/main';
import Auth from "layout/auth";
import PostCreate from 'containers/posts/postCreate';

function Home() {
  return ( 
    <Auth>
      <MainLayout>
        <PostCreate/>
      </MainLayout>
    </Auth>
  )
}

export default Home;
