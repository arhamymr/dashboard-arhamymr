import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spacer,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { getDataCollection } from "api/posts";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trimString } from 'utils/string';

const PostsDetail = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(async() => {
    const { data } = await getDataCollection("posts")
    setData(data)
  }, []);

  const handleRouterEdit = (id) => {
    router.push(`/dashboard/posts/${id}`)
  }

  return (
    <>
    <Flex bg={'white'} align="center" rounded="md" mb={4} p={4}>
      <Heading size="lg"> Posts </Heading>
      <Spacer/>
      <Link href="/dashboard/posts/create">
      <Button colorScheme={'blue'}> Buat Artikel baru</Button>
      </Link>
    </Flex>
    <Box  bg={'white'} rounded="md" mb={4} p={4}>
    
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>ID </Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} cursor="pointer" _hover={{ bg: 'red.100'}} onClick={() => handleRouterEdit(item.id)}>
              <Td>{trimString(item.id, 10)}</Td>
              <Td>{trimString(item.title, 100)}</Td>
              <Td>{trimString(item.description, 100)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
  </Box>
  </>
    
  )
}

export default PostsDetail;
