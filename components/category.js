import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { getDataCollection , postDataCollection} from 'api/posts';

const Category = ({ onChange}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async() => {
    const { data } = await getDataCollection("categories");
    setOptions(data);
  }, []);


  const addCategory = async() => {
    setLoading(true);
    const newCategory = {
      value,
      label: value,
    }
    const data = await postDataCollection(`${newCategory.value}`, newCategory);
    console.log(data)
    setOptions([...options, newCategory]);
    setShow(false);
    setLoading(false)
  }
  
  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleChangeInput = e => {
    onChange(e.value)
  }
  
  return (
    <Box>
      <Text fontWeight="500" mb={2}> Category : </Text>
      <Box mb={4}>
        <Select options={options} onChange={handleChangeInput} />
      </Box>
      { show ? 
      <Box>
        <Input mb={3} placeholder="Add Category" onChange={handleChange}/>
        <Button isDisabled={loading} size="sm" colorScheme="teal" onClick={addCategory}> + Add Category </Button>
      </Box> :  
      <Text 
        fontWeight={'bold'}
        color="blue.500" 
        onClick={() => setShow(true)}
        fontSize="sm"
        cursor="pointer"
      > + Add Category </Text> }
     
     
    </Box>
  );
}

export default Category;