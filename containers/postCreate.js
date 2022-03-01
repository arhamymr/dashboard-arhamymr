import React, { useState } from 'react';
import { 
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Text, 
  Flex,
  useToast,
  FormErrorMessage,
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
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit, register, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit =  async(data) => {
    setLoading(true)
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
    
    if (result.status === "Success") {
      toast({
        title: 'Posts created.',
        description: "We've created your posts for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      router.replace("/dashboard/posts");
    } else {
      toast({
        title: 'Something went wring',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    setLoading(false)
    
  }

  console.log(errors, "erors")
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
          <FormControl mb={4} isInvalid={!!errors.title}>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input 
              name="title" 
              id='title' 
              placeholder='Tulis Title' 
              {...register("title")}/>
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
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
          <Controller
            control={control}
            rules={{
            required: true,
            }}
            render={({ field: { onChange } }) => (
              <Category onChange={onChange}/>
            )}
            name="category"
          />
        </Box>
      </Flex> 
      <Button type="submit" colorScheme={'blue'} isDisabled={loading || !!Object.keys(errors).length}>Submit</Button>
    </form>
    </Box>
    
  )
}

export default Posts;
