import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export function App() {
  const [user, setUser] = useState(null);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;

  // if (user && user.email === adminEmail) {
  //   return <AdminPage />;
  // }

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       // пользователь авторизован
  //       setUser(authUser);
  //     } else {
  //       // пользователь не авторизован
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return <div>{/* другие компоненты */}</div>;
}
