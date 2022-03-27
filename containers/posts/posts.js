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
  Input, 
  HStack
} from '@chakra-ui/react';
import { deleteDocument, getDocument, getDocumentNext, getDocumentSearch } from "api/posts";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trimString } from 'utils/string';

const PostsDetail = () => {
  const [data, setData] = useState([]);
  const [lastVisible, setLastVisible] = useState('');
  const [search,setSearch] = useState('');
  const router = useRouter();
  
  useEffect(async() => {
    handleReset()
  }, []);

  const handleReset = async() => {
    const { data, lastVisible } = await getDocument("posts", 5)
    setData(data)
    setLastVisible(lastVisible)
  }

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

  const handleNext = async () => {
    const newData = await getDocumentNext("posts", lastVisible, 5)
    setData([...data, ...newData.data])
    setLastVisible(newData.lastVisible)
  }

  const handleSearch = async () => {
    const {data} = await getDocumentSearch("posts", search)
    setData(data)
    setLastVisible('')
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
      <HStack mb={6}>
        <Spacer/>
        <Button onClick={handleReset}>Reset</Button>
        <Input maxW={300} placeholder="Search article.." onChange={e => setSearch(e.target.value)}/> 
        <Button colorScheme={'blue'} onClick={handleSearch}> Search </Button>
      </HStack>
      
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
      {!!lastVisible && <Button colorScheme="blue" onClick={handleNext} mt={4}>Load More Article</Button>}
  </Box>
  </>
    
  )
}

export default PostsDetail;
