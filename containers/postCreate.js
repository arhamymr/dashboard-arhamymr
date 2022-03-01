import React from 'react';
import { 
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Text, 
  Flex,
  useToast,
  Box, Button} from '@chakra-ui/react';
import TextEditor from 'components/textEditor';
import Upload from "components/upload";
import { useForm , Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Category from 'components/category';
import slugify from 'slugify';
//api
import { uploadFile } from 'api/upload';
import { postDataCollection } from 'api/posts';
import { useRouter } from 'next/router';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required(),
  thumbnail: yup.mixed().required('File is required'),
});

function Posts() {
  const toast = useToast();
  const router = useRouter();
  
  const { control, handleSubmit, register } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit =  async(data) => {
    const fileUploaded = await uploadFile(data.thumbnail);

    const payload = {
      ...data,
      created_data: new Date(),
      updated_date: null,
      thumbnail: fileUploaded?.data?.url,
      slug: slugify(data.title,"-"),
      count: 0,
    }

    const result = await postDataCollection("posts", payload);
    router.replace("/dashboard/posts");
    if (result.status === "Success") {
      toast({
        title: 'Posts created.',
        description: "We've created your posts for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } else {
      toast({
        title: 'Something went wring',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Box w={'full'}
    bg={'white'}
    boxShadow={'2xl'}
    p={6}
    rounded={'lg'}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        rules={{
        required: true,
        }}
        render={({ field: { onChange, value} }) => (
          <Upload onChange={onChange} value={value}/>
        )}
        name="thumbnail"
      />
      
      <Flex
        gap={6}
      >
        <Box flex={3}>
          <FormControl mb={4}>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input 
              name="title" 
              id='title' 
              placeholder='Tulis Title' 
              {...register("title")}/>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea name="description" placeholder='Tulis Category' {...register("description")} />
          </FormControl>
          <Text mb={3}>Content</Text>
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextEditor value={value} onChange={onChange} />
            )}
            name="content"
          />
        </Box>
        <Box flex={1}>
          <Category/>
        </Box>
        
       
      </Flex> 
      <Button type="submit" colorScheme={'blue'}>Submit</Button>
    </form>
    </Box>
    
  )
}

export default Posts;
