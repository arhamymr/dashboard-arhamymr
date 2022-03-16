import { useState } from "react";
import slugify from 'slugify';
import { postDocument, updateDocument } from 'api/posts';
import { uploadFile } from 'api/upload';

function useDetail() {
  const [loading, setLoading] = useState(true);

  const publish = async (data) => {
    setLoading(true);
    try {
      const fileUploaded = await uploadFile(data.thumbnail);
      const payload = {
        ...data,
        thumbnail: fileUploaded?.data?.url,
        slug: slugify(data.title,"-").toLocaleLowerCase(),
        count: 0,
      }
      await postDocument("posts", payload);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  const update = async (docId, updateData) => {
    setLoading(true);
    try {
      if (updateData.thumbnail) {
        const fileUploaded = await uploadFile(updateData.thumbnail);
        const payload = {
          ...updateData,
          thumbnail: fileUploaded?.data?.url,
        }
        await updateDocument("posts", docId, payload)
      } else {
        await updateDocument("posts", docId, updateData)
      }
      
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    publish,
    update
  };
}



export default useDetail;
