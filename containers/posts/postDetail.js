import React, { useEffect } from 'react';
import { 
  Box, 
  Text,
  Button,
  Spacer,
  Heading,
  Flex,
  Image,
  Badge,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useDetail from './hooks/useDetail';
import moment from 'moment';

const PostsDetail = () => {

  const router = useRouter();
  const { data, getDetail, loading } = useDetail();

  const detail = data.data;

  useEffect(() => {
    getDetail(router.query.id)
  }, [router.query.id]);


  return (
    <>
    <Flex bg={'white'} align="center" rounded="md" mb={4} p={4}>
      <Heading size="lg"> Posts </Heading>
      <Spacer/>
      <Link href={`/dashboard/posts/edit/${detail?.id}`}>
        <Button> Edit this article </Button>
      </Link>
    </Flex>
    <Box bg={'white'} rounded="md" mb={20} p={4}>
      {loading ? 
        <Text>Loading...</Text>
      :
        <>  
          <Image  
          height={200}
          objectFit={'cover'} 
          src={detail.thumbnail} alt={detail.title} mb={5} />
          <Heading maxWidth={600} mb={2}>{detail.title}</Heading>
          <Badge mb={2}colorScheme={detail.publish ? "green": "purple"}>{detail.publish ? 'Publish' : 'Draft'}</Badge>
          
          <Text fontSize="sm" color="gray.400" mb={5}> 
            Created Date: {moment(detail?.created_date?.toDate()).format('MMMM Do YYYY')}
          </Text>
          <Text  maxWidth={600} mb={4}> Author : {detail.author} </Text>
          <Text  maxWidth={600} mb={4}>{detail.description} </Text>
          <Text> Content: </Text>
          <Box maxWidth={600} dangerouslySetInnerHTML={{ __html: detail.content}}/>
        </>
      }
     
    </Box>
  </>
    
  )
}

export default PostsDetail;
