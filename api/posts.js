import { 
  collection, getFirestore, 
  getDocs, addDoc, 
  doc, getDoc, 
  setDoc, updateDoc,
  deleteDoc, where,
  limit, query, startAfter, orderBy
 } from "firebase/firestore"; 

 export const getDocumentSearch = async (collectionName, queryText) => {
  const db = getFirestore();
  try {
    const postRef = query(
      collection(db, collectionName), 
      where('title' ,'==', queryText)
    );
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
    console.log(error)
    throw new Error({
      status: 'failed',
      message: 'Failed to get document from' + collectionName,
      error: error?.message,
    })
  }
};


export const getDocument = async (collectionName, size = 10) => {
  const db = getFirestore();
  try {
    const postRef = query(collection(db, collectionName), orderBy("created_date"), limit(size));
    const querySnapshot = await getDocs(postRef);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    console.log(lastVisible, "last visible")
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      status: 'Success',
      message: 'Data has been fetched from' + collectionName,
      data,
      lastVisible,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to get document from' + collectionName,
      error: error?.message,
    })
  }
};

export const getDocumentNext = async (collectionName, lastVisible, size = 10) => {
  const db = getFirestore();
  try {
    const postRef = query(collection(db, collectionName), orderBy("created_date"), startAfter(lastVisible), limit(size));
    const querySnapshot = await getDocs(postRef);

    const newlastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      status: 'Success',
      message: 'Data has been fetched from' + collectionName,
      data,
      pagination : { 
        lastVisible: newlastVisible,
        totalDatas: querySnapshot.docs.length,
      }
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
    author: {
      name: data.author,
      occupation: data.occupation
    },
    created_date: new Date(),
  }

  delete payload.occupation;

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
      author : {
        name: updateData.author,
        occupation: updateData.occupation
      },
      updated_date: new Date(),
    }
    delete payload.occupation
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

export const deleteDocument = async (collectionName, docId) => {
  const db = getFirestore();
  try {
    const documentRef = doc(db, collectionName, docId);
    await deleteDoc(documentRef);

    return {
      status: 'Success',
      message: 'Data has been delete from ' + collectionName,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      message: 'Failed to delete document from ' + collectionName,
      error: error?.message,
    })
  }
}

