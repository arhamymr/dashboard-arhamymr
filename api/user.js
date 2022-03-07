import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginWithEmailAndPassword = async (email, password) => {
  const auth = getAuth();
  try {
    const data = await signInWithEmailAndPassword(auth, email, password)
    return {
      status: 'Success',
      data,
    }
  } catch (error) {
    throw new Error({
      status: 'failed',
      error,
    });
  }
};