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
    } catch (error) {
      console.log('Socket initialization error:', error);
    }
  };

  useEffect(() => {
    if (userInstance) {
      initSocket(userInstance);
    }

    return () => {
      socketInstance?.disconnect();
    };
  }, [userInstance]);


  return (
    <SocketContext.Provider
      value={{ socketInstance, setSocketInstance, setUserInstance, userInstance, userInfo, setUserInfo }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
