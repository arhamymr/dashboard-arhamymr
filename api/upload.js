import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadFile = async (file) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `posts/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);

    return {
      status: 'Success',
      message: 'Data has been uploaded',
      data: {
        url: downloadUrl
      }
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to upload file',
      error,
    });
  }
};


export const deleteFile = async (fileName) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `posts/${fileName}`);
    await deleteObject(storageRef);
    
    return {
      status: 'Success',
      message: 'Data has been deleted',
    }

  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to delete file',
      error,
    })
  }
};
