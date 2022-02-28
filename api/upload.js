import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

export const uploadFile = async (file) => {
  try {
    const storage = getStorage();
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
    return {
      status: 'failed',
      message: 'Failed to upload file',
      error,
    }
  }
};
