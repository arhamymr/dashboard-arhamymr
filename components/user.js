import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

import { Box, Text, Spacer, Flex} from '@chakra-ui/react';

export default function User() {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(async() => {
    try {
      const currentUser = await auth.currentUser;
      if (currentUser) {
        setUser(currentUser.displayName)
      } 
    } catch (error){
      console.log(error)
    }
  },[]);


  const handleSignOut = () => {
    setLoading(true)
    signOut(auth).then(() => {
      router.replace("/")
    }).catch((error) => {
      console.log("something wrong", error)
    }).finally(() => {
      setLoading(false);
    });
  }
  return (
    <Flex>
      <Spacer/>
 <Box 
      bg={'white'}
      p={2}
      mb={6}
      rounded={'md'}
    >
      <Text>{user}</Text>
      <Text cursor={'pointer'} fontWeight={'bold'} color={'red.500'} onClick={handleSignOut}> {loading ? 'sigining out...' : 'Sign out' } </Text>
    </Box>
    </Flex>
   
  );
}