import React from 'react';
import { 
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Text, 
  Flex,
  Box, Button} from '@chakra-ui/react';
import TextEditor from 'components/textEditor';
import Upload from "components/upload";
import { useForm , Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Category from 'components/category';

//api
import { uploadFile } from 'api/upload';
import { postDataCollection } from 'api/posts';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required(),
  thumbnail: yup.mixed().required('File is required'),
});

function Posts() {

  const { control, handleSubmit, register, error } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit =  async(data) => {
    const fileUploaded = await uploadFile(data.thumbnail);

    const payload = {
      ...data,
      thumbnail: fileUploaded?.data?.url,
    }
    console.log(payload, "payload")
    const test = await postDataCollection("posts", payload)
    console.log(test, fileUploaded)
  }
  console.log(error)

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
