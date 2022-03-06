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
  Badge,
} from '@chakra-ui/react';
import { deleteDocument, getDocument } from "api/posts";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trimString } from 'utils/string';

const PostsDetail = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  
  useEffect(async() => {
    const { data } = await getDocument("posts")
    setData(data)
  }, []);

  const handleRouterEdit = (id) => {
    router.push(`/dashboard/posts/${id}`)
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want delete this article on database?')) {
       await deleteDocument("posts", id);
       const { data } = await getDocument("posts")
       setData(data)
    } 
  }

  return (
    <>
    <Flex bg={'white'} align="center" rounded="md" mb={4} p={4}>
      <Heading size="lg"> Posts </Heading>
      <Spacer/>
      <a href="https://www.risethub.com/" rel="noopener noreferrer" target="_blank">
      <Button mr={4}> Lihat Web</Button>
      </a>
      
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
            <Th> Status </Th>
            <Th> Delete </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} cursor="pointer" _hover={{ bg: 'red.100'}} onClick={() => handleRouterEdit(item.id)}>
              <Td>{trimString(item.id, 10)}</Td>
              <Td>{trimString(item.title, 100)}</Td>
              <Td>{trimString(item.description, 100)}</Td>
              <Td><Badge colorScheme={item.publish ? 'green' : 'purple'}>{item.publish ? 'Publish' : 'Draft'}</Badge></Td>
              <td><Button colorScheme="red" onClick={(e) => handleDelete(e, item.id)}>Delete</Button></td>
            </Tr>
          ))}
        </Tbody>
      </Table>
  </Box>
  </>
    
  )
}

export default PostsDetail;
