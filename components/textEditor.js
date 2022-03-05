

import React, { useRef, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { Box } from '@chakra-ui/react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MyComponent = ({onChange, value, defaultValue }) => {

  const [content, setContent] = useState(defaultValue);
  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
      editor.current = sunEditor;
  };

  useEffect(() => {
    setContent(defaultValue)
  }, [defaultValue]);

  useEffect(() => {
    setContent(value);
  }, [value]);

  return (
    <Box mb={4}>
      <SunEditor 
        setContents={content}
        getSunEditorInstance={getSunEditorInstance} 
        onChange={onChange}
        height="100%"
        />
    </Box>
  );
};

export default MyComponent;


