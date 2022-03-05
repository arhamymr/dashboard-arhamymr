import { collection, getFirestore, getDocs, addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 


export const getDocument = async (collectionName) => {
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
    throw new Error({
      status: 'failed',
      message: 'Failed to get document from' + collectionName,
      error: error?.message,
    })
  }
};

export const getDetailDocument = async (collectionName, docId) => {
  const db = getFirestore();

  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        status: 'Success',
        message: 'Data has been fetched from' + collectionName,
        data: {
          id: docId,
          ...docSnap.data(),
        }
      }
    } else {
      return {
        status: 'Success',
        message: 'No such document',
        data: {}
      }
    }

  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to get document from' + collectionName,
      error: error?.message,
      data: {},
    })
  }
};



export const postDocument = async (collectionName, data) => {
  const db = getFirestore();

  const payload = {
    ...data,
    created_date: new Date(),
  }

  try {
    await addDoc(collection(db, collectionName), payload);
    return {
      status: 'Success',
      message: 'Data has been added to' + collectionName,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to add document to' + collectionName,
      error: error?.message,
    })
  }
};

export const postDocumentWithCustomId = async (collectionName, docId, data) => {
  const db = getFirestore();
  try {
    await setDoc(doc(db, collectionName, docId), data);
    return {
      status: 'Success',
      message: 'Data has been added to' + collectionName,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to add document to' + collectionName,
      error: error?.message,
    })
  }
}

export const updateDocument = async (collectionName, docId, updateData) => {
  const db = getFirestore();
  try {
    const documentRef = doc(db, collectionName, docId);
    const payload = {
      ...updateData,
      updated_date: new Date(),
    }
    await updateDoc(documentRef, payload);
    return {
      status: 'Success',
      message: 'Data has been updated to ' + collectionName,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to update document to ' + collectionName,
      error: error?.message,
    })
  }
}