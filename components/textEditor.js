

import React, { useRef } from 'react';
import dynamic from "next/dynamic";
import { Box } from '@chakra-ui/react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MyComponent = ({onChange, value}) => {
  const editor = useRef();

  const getSunEditorInstance = (sunEditor) => {
      editor.current = sunEditor;
  };

  return (
    <Box mb={4}>
      <SunEditor 
        setContents={value}
        getSunEditorInstance={getSunEditorInstance} 
        onChange={onChange}
        />
    </Box>
  );
};

export default MyComponent;


