import { collection, getFirestore, getDocs, addDoc} from "firebase/firestore"; 


export const getDataCollection = async (collectionName) => {
  const db = getFirestore();

  try {
    const postRef = collection(db, collectionName);
    const querySnapshot = await getDocs(postRef);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return {
      status: 'Success',
      message: 'Data has been fetched from' + collectionName,
      data,
    }
  } catch (error) {
    return {
      status: 'failed',
      message: 'Failed to get document from' + collectionName,
      error,
    }
  }
};


export const postDataCollection = async (collectionName, data) => {
  const db = getFirestore();

  try {
    await addDoc(collection(db, collectionName), data);
    return {
      status: 'Success',
      message: 'Data has been added to' + collectionName,
    }
  } catch (error) {
    return {
      status: 'failed',
      message: 'Failed to add document to' + collectionName,
      error,
    }
  }
};
