import React from 'react';
import MainLayout from '../../../layout/main';
import Auth from "../../../layout/auth";
import PostDetail from '../../../containers/postDetails';

function Home() {
  return ( 
    <Auth>
      <MainLayout>
        <PostDetail/>
      </MainLayout>
    </Auth>
  )
}

export default Home;
