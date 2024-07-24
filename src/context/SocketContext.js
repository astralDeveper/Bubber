import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../screens/Api';

export const SocketContext = createContext();
export let SocketInstance;
const SocketContextProvider = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState(null);
  const [userInstance, setUserInstance] = useState(null);
  const [userInfo, setUserInfo] = useState({});


  const initSocket = async user => {
    try {
      if (!user) {
        return;
      }

      const Socket = io(BASE_URL, {
        query: { token: user?.token },
      });

      setSocketInstance(Socket);
      SocketInstance = Socket;

      Socket.emit('connected', { id: user?.user?._id });
      console.log('Socket connected and initialized');

      // Socket.on('disconnect', () => {
      //   console.log('Socket disconnected');
      // });
    } catch (error) {
      console.log('Socket initialization error:', error);
    }
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       let rawUser = await AsyncStorage.getItem('user');
  //       if (rawUser) {
  //         let user = await JSON.parse(rawUser);
  //         setUserInstance(user);
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    if (userInstance) {
      initSocket(userInstance);
    }

    return () => {
      socketInstance?.disconnect();
    };
  }, [userInstance]);

  console.log(userInstance)

  return (
    <SocketContext.Provider
      value={{ socketInstance, setSocketInstance, setUserInstance, userInstance, userInfo, setUserInfo }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
