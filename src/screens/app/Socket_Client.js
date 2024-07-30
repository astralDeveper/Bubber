import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import io from 'socket.io-client';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [data, setData] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjljNDExYjIyYjI3MTU3M2YwNmQ0NTciLCJpYXQiOjE3MjE1Mzc0MjV9.N_Gz5lYsNNn7EeN9-VklvDbLad2vQPyyHTVgFAbAR-0'; // Replace with your actual JWT token

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) {
          const parsedData = JSON.parse(data);

          setData(parsedData?.user?._id);
          //   console.log("paras",parsedData?.user?._id)
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error retrieving data', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Connect to the Socket.IO server with token in query
    const newSocket = io('http://192.168.100.12:3000', {
      query: {token},
    });
    setSocket(newSocket);

    // Emit the connected event
    newSocket.emit('connected', {userId: '669c411b22b271573f06d457'});

    // Listen for new messages
    newSocket.on('new-message', data => {
      console.log('New message received:', data);
      setChat(prevChat => [...prevChat, data]);
    });

    // Handle disconnection
    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit(
        'send-message',
        {
          from: '669c411b22b271573f06d457',
          to: '669ca4e7e3550f300b9f6115',
          message,
        },
        response => {
          if (response.status === 'ok') {
            console.log('Message sent successfully');
            setChat(prevChat => [
              ...prevChat,
              {from: '669c411b22b271573f06d457', message},
            ]);
          } else {
            console.error('Error sending message:', response.message);
          }
        },
      );
    }
  };
  const sendProfileViewRequest = async (userdata) => {
    try {
      const ownId = {
        userid: userInstance?.user?._id,
      };
  
      // Check if userdata is defined and has _id
      if (!userdata || !userdata._id) {
        throw new Error('User data is missing or does not contain _id');
      }
  
      // Emit the profile view request event
      socket.emit('send-profile-view-request', {
        fromUserId: ownId.userid,
        toUserId: userdata._id,
      });
  
      // Handle responses
      socket.on('profile-view-request', (data) => {
        console.log('Profile view request received:', data);
      });
  
      socket.on('error', (error) => {
        console.error('Error:', error.message);
      });
  
      socket.on('info', (info) => {
        console.info('Info:', info.message);
      });
  
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text>Chat Application</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
      <View style={{marginTop: 20}}>
        {chat.map((msg, index) => (
          <Text key={index}>
            {msg.from}: {msg.message}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default ChatComponent;
