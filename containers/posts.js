import React from 'react';
import { 
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Text, 
  Box, Button} from '@chakra-ui/react';
import TextEditor from '../components/textEditor';
import { useForm , Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { postDataCollection } from 'api/posts';
import Category from 'components/category';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  content: yup.string().required()
});

function Posts() {
  const { control, handleSubmit, register } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit =  async(data) => {
    await postDataCollection(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        p={6}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'lg'}
      >
        <Box>
          <FormControl mb={4}>
            <FormLabel htmlFor='title'>Title</FormLabel>
            <Input name="title" id='title' placeholder='Tulis Title' {...register("title")}/>
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
        <Box>
          <Category/>
        </Box>
        
        <Button type="submit">Submit test</Button>
      </Box> 
    </form>
  )
}

export default Posts;
