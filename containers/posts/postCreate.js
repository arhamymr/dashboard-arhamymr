import React, { useEffect, useState } from 'react';
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
import Category from 'components/category';
import { useRouter } from 'next/router';

// hooks
import useCreate from './hooks/useCreate';
import useDetail from './hooks/useDetail';

// validation
import { schema } from './part/validation';

function Posts() {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPublish, setIsPublish] = useState(false);

  const { publish, update } = useCreate();
  const { getDetail, data } = useDetail();
  const { id } = router.query;
  
  const detail = data.data;

  useEffect(async() => {
    if(id) {
      await getDetail(id);
    }
  }, [id])


  const { 
    control, 
    handleSubmit, 
    register, 
    formState: { errors }
  } = useForm({
    resolver: id ? undefined : yupResolver(schema),
    mode: "onChange",
  });
  

  const onSubmit =  async(data) => {
    setLoading(true)

    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    try {
      if (id){
        console.log(data,"data", id);
        await update(id, {...data, publish: isPublish} );
        toast({
          title: 'Posts updated',
          description: "We've updated your posts for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.replace(`/dashboard/posts/${id}`)
      } else {
        await publish({...data, publish: isPublish});
        toast({
          title: 'Posts created.',
          description: "We've created your posts for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.replace("/dashboard/posts");
      }
     
    } catch (error) {
      toast({
        title: 'Something went wring',
        status: 'error',
        description: error.message,
        duration: 9000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
    { !detail && id ? <Text> loading ... </Text> : <Box w={'full'}
    bg={'white'}
    boxShadow={'2xl'}
    p={6}
    rounded={'lg'}
    mb={40}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        render={({ field: { onChange, value} }) => (
          <Upload preview={detail?.thumbnail} onChange={onChange} value={value}/>
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
              defaultValue={detail?.title}
              {...register("title")}/>
            <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea  
              defaultValue={detail?.description}
              name="description" 
              placeholder='Tulis Category' 
              {...register("description")} />
          </FormControl>
          <Text mb={3}>Content</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextEditor defaultValue={detail?.content} value={value} onChange={onChange} />
            )}
            name="content"
          />
        </Box>
        <Box flex={1}>
          <Controller
            control={control}
            defaultValue={detail?.category}
            render={({ field: { onChange } }) => (
              <Category defaultValue={detail?.category} onChange={onChange}/>
            )}
            name="category"
          />
        </Box>
      </Flex> 
      <Button 
        mr={3}
        type="submit" 
        onClick={() => setIsPublish(false)} 
        isDisabled={loading || !!Object.keys(errors).length}
      >
        Draft
      </Button>
      <Button 
        type="submit" 
        onClick={() => setIsPublish(true)} 
        colorScheme={'blue'} 
        isDisabled={loading || !!Object.keys(errors).length}
      >
        {id ? 'Update and Publish' : 'Publish'}
      </Button>
    </form>
    </Box>
  }
  </>
  )
}

export default Posts;
