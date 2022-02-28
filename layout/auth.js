import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Text, Box } from '@chakra-ui/react';

const Auth = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true)
    const auth = getAuth();
    try {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace("/")
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }, []);
  return (
    <Box>
      {loading ? <Text> authenticating ... </Text>: children}
    </Box>
  )
}

export default Auth;