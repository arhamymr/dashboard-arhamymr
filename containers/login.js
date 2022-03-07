import React, { useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { loginWithEmailAndPassword } from 'api/user';
import { useForm } from "react-hook-form";

export default function SimpleCard() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false)

  const onSubmit = async(data) => {
    setLoading(true)
    try {
      await loginWithEmailAndPassword(data.email, data.password)
      router.push('/dashboard/posts');
    } catch (e) {
      alert('Your passwors and email wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input 
                  name="email" 
                  type="email" 
                  {...register("email")} 
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input 
                  name="password" 
                  type="password" 
                  {...register("password")}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  isDisabled={loading}
                  colorScheme="blue"
                  type="submit"
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  {loading ? 'Loading' : 'Sign in'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
   
  );
}