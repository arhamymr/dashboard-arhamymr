import React, { useState } from "react";
import { Box, Image} from '@chakra-ui/react';

function UploadFile({ onChange, value, preview }) {
  const [file, setFile] = useState(null);

  
  const handleOnChange = e => {
    setFile(URL.createObjectURL(e.target.files[0]));
    onChange(e.target.files[0]);
    console.log(value, "value")
  };


  return (
    <Box mb={4}>
      {(!!file || !!preview)  && <Image
       mb={4} 
       height="250px"
       width="100%" 
       objectFit="cover"
       id="blah" 
       src={file || preview } alt="your image" />}
      <input 
        type="file" 
        onChange={handleOnChange}
      />
    </Box>
  );
}

export default UploadFile

