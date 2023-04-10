import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function updateData(value, id) {
  const userRef = doc(db, 'users', id);

  await updateDoc(userRef, {
    role: value,
  });
}
