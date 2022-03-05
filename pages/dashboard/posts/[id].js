import React from 'react';
import MainLayout from '../../../layout/main';
import Auth from "../../../layout/auth";
import PostDetails from '../../../containers/posts/postDetail';

function Home() {
  return ( 
    <Auth>
      <MainLayout>
        <PostDetails/>
      </MainLayout>
    </Auth>
  )
}

export default Home;
