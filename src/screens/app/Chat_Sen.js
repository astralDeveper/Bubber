import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { Back, Clip, Send } from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../../context/SocketContext'; // Ensure correct import
import axios from 'axios';
import { API, BASE_URL } from '../Api';
import { io } from 'socket.io-client';

const { height, width } = Dimensions.get('window');

const Chat_Sen = ({ navigation, route }) => {
  
  const { socketInstance, userInstance } = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [req, setReq] = useState(true);
  const { userdata } = route.params;
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(null);
  const scrollViewRef = useRef(null);
  const [socket, setSocket] = useState(null);
  

  const sendProfileViewRequest = async (userdata) => {
    try {
      const ownId = {
        userid: userInstance?.user?._id,
      };
      console.log(ownId, "s----------------------------------");
  
      // Check if userdata is defined and has _id
      if (!userdata || !userdata._id) {
        throw new Error('User data is missing or does not contain _id');
      }
  
      // Emit the profile view request event
      socketInstance.emit('send-profile-view-request', {
        fromUserId: ownId.userid,
        toUserId: userdata._id,
        message:"User Send a Profile View Reques"
      });
  
      // Handle responses
      socketInstance.on('profile-view-request', (data) => {
        console.log('Profile view request received:', data);
      });
  
      socketInstance.on('error', (error) => {
        console.error('Error:', error.message);
      });
  
      socketInstance.on('info', (info) => {
        console.info('Info:', info.message);
      });
  
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  };

  useEffect(() => {
    // Listen for profile view requests
    socketInstance.on('profile-view-request', (data) => {
      console.log('Profile view request received:', data);

      // Show alert
      Alert.alert(
        "Profile View Request",
        `User ${data.fromUserId} has viewed your profile.`,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    });

    // Cleanup on unmount
    return () => {
      socketInstance.off('profile-view-request');
    };
  }, []);
  const handleIncomingProfileViewRequests = () => {
    socketInstance.on('profile-view-request', (data) => {
      console.log('Profile view request received:', data);
      displayProfileViewRequest(data); // Function to display the request
    });
  
    socketInstance.on('error', (error) => {
      console.error('Error:', error.message);
    });
  
    socketInstance.on('info', (info) => {
      console.info('Info:', info.message);
    });
  };
  const displayProfileViewRequest = (data) => {
    const { message, from } = data;
    // Implement your logic to show the profile view request, e.g., update UI, show a notification
    console.log(`Notification: ${message} from user ID ${from}`);
    // Example: Display a notification or update a UI element
    const notificationArea = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.textContent = `You have a new profile view request from user ID ${from}`;
    notificationArea.appendChild(notification);
  };
  // Fetch conversation when component mounts or userdata changes
  useEffect(() => {
    const getConversation = async () => {
      try {
        const rawUser = await AsyncStorage.getItem('user');
        const user = JSON.parse(rawUser);
        if (user && user.token) {
          const res = await axios.get(`${BASE_URL}/auth/get-conversation/${userdata._id}`, {
            headers: { Authorization: user.token },
          });
          setConversation(res?.data?.conversation || {});
        } else {
          console.error('User token is missing');
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    getConversation();
  }, [userdata]);

  useEffect(() => {
    const handleNewMessage = data => {
      if (data) {
        setConversation(prev => ({
          ...prev,
          messages: [...(prev?.messages || []), data],
        }));
      }
    };

    const handleDeliveredMessage = data => {
      if (data) {
        setConversation(prev => ({
          ...prev,
          messages: [...(prev?.messages || []), data],
        }));
      }
    };

    if (socketInstance) {
      socketInstance.on('new-message', handleNewMessage);
      socketInstance.on('message-delivered', handleDeliveredMessage);
    }

    socketInstance.on('profile-view-request', (data) => {
      alert(data)
      // setModalVisible(true)
    });
    socketInstance.on('profile-view-request-accepted', (data) => {
      alert(data)
      setReq(false)
    });
    socketInstance.on('error', (data) => {
      console.log(data)
    });

    return () => {
      if (socketInstance) {
        socketInstance.off('new-message', handleNewMessage);
        socketInstance.off('message-delivered', handleDeliveredMessage);
        socketInstance.off('profile-view-request');
        socketInstance.off('profile-view-request-accepted');
        socketInstance.off('error');
      }
    };
  }, [socketInstance]);
  // const sendProfileViewRequest = async (userdata) => {
  //   try {
  //     const ownId = {
  //       userid: userInstance?.user?._id,
  //     };
  //     console.log(ownId, "s----------------------------------");
  
  //     // Check if userdata is defined and has _id
  //     if (!userdata || !userdata._id) {
  //       throw new Error('User data is missing or does not contain _id');
  //     }
  
  //     // Emit the profile view request event
  //     socket.emit('send-profile-view-request', {
  //       fromUserId: ownId.userid,
  //       toUserId: userdata._id,
  //     });
  
  //     // Handle responses
  //     socket.on('profile-view-request', (data) => {
  //       console.log('Profile view request received:', data);
  //     });
  
  //     socket.on('error', (error) => {
  //       console.error('Error:', error.message);
  //     });
  
  //     socket.on('info', (info) => {
  //       console.info('Info:', info.message);
  //     });
  
  //   } catch (error) {
  //     console.error('Error occurred:', error.message);
  //   }
  // };

  // const sendProfileViewRequest = () => {
  //   socket.emit('send-profile-view-request', { ownId, userdata._id });
  
  //   socket.on('profile-view-request', (data) => {
  //     console.log('Profile view request received:', data);
  //   });
  
  //   socket.on('error', (error) => {
  //     console.error('Error:', error.message);
  //   });
  
  //   socket.on('info', (info) => {
  //     console.info('Info:', info.message);
  //   });
  // };
  const acceptProfileViewRequest = async () => {
    try {
      const ownId = {
        userid: userInstance?.user?._id
      };

      // Check if userdata is defined and has _id
      if (!userdata || !userdata._id) {
        throw new Error('User data is missing or does not contain _id');
      }

      const rawUser = await AsyncStorage.getItem('user');
      const user = JSON.parse(rawUser);

      // Check if the user token exists
      if (!user?.token) {
        throw new Error('User token is missing');
      }

      const res = await axios.post(`${API.USER.ACCEPT_PROFILE}${userdata._id}`,
        ownId, {
        headers: {
          Authorization: `${user.token}`,  // Ensure the correct format for Authorization
        }
      });

      console.log('Response Data:', res.data);
    } catch (error) {
      console.error('Error occurred:', error.message);  // Log the error message for better debugging
    }
  };





  useEffect(() => {
    if (scrollViewRef.current && conversation) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [conversation]);

  const sendMessage = () => {
    if (socketInstance && userInstance?.user?._id) {
      socketInstance.emit('send-message', {
        from: userInstance.user._id,
        to: userdata._id,
        message,
      });
      setMessage('');
    } else {
      console.error('Socket instance or user ID is missing');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}>
            <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.backButton}>
              <Back />
            </TouchableOpacity>
            <Text style={styles.displayNameText}>{userdata?.displayName ? userdata?.displayName : userdata?.name}</Text>
          </View>
          {req && (
            <TouchableOpacity onPress={() => {
              // setModalVisible(true)
              sendProfileViewRequest(userdata)
            }} style={styles.profileRequestButton}>
              <Text style={styles.profileRequestText}>Profile Request</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView ref={scrollViewRef}>
          {conversation?.messages?.map((item, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                {
                  backgroundColor: item?.sender === userInstance?.user?._id ? '#20A090' : '#F2F7FB',
                  alignSelf: item?.sender === userInstance?.user?._id ? 'flex-end' : 'flex-start',
                  borderTopRightRadius: item?.sender === userInstance?.user?._id ? 0 : 10,
                  borderTopLeftRadius: item?.sender === userInstance?.user?._id ? 10 : 0,
                },
              ]}
            >
              <Text style={[
                styles.messageText,
                { color: item?.sender === userInstance?.user?._id ? '#FFF' : '#000' },
              ]}>
                {item?.content}
              </Text>
              <Text style={styles.timestamp}>10:57 AM</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            placeholder="Write your message"
            placeholderTextColor={'#797C7B'}
            value={message}
            onChangeText={setMessage}
            style={styles.textInput}
          />
          <TouchableOpacity>
            <Clip />
          </TouchableOpacity>
          <TouchableOpacity onPress={sendMessage}>
            <Send />
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.modalBackground}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Profile Request Received</Text>
              <Text style={styles.modalMessage}>
                Amina Iqbal has sent you a request to view your profile details, including your display picture, name, and more.
              </Text>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.declineButton}
                >
                  <Text style={styles.modalActionText}>Decline</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    acceptProfileViewRequest()
                  }}
                  style={styles.allowButton}
                >
                  <Text style={styles.modalActionText}>Allow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#3EC8BF',
    paddingVertical: 40,
  },
  backButton: {
    width: width * 0.07, height: 40, justifyContent: "center",
  },
  profileRequestButton: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 10,
  },
  profileRequestText: {
    color: '#3EC8BF',
    fontSize: 15,
  },
  displayNameText: {
    color: '#FFF',
    fontSize: 20,
  },
  messageBubble: {
    gap: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    maxWidth: '80%',
    padding: 8,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 10,
  },
  messageText: {
    fontSize: 15,
  },
  timestamp: {
    fontSize: 10,
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -12,
    right: 10,
    fontFamily: 'Actor-Regular',
    color: '#8e8e8e',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    bottom: 10,
    backgroundColor: '#FFF',
    padding: 10,
    width: width * 0.99,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: '#EEFAF8',
  },
  textInput: {
    backgroundColor: '#F3F6F6',
    color: '#000',
    borderRadius: 15,
    width: width * 0.7,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'ABeeZee-Italic',
    alignSelf: 'center',
  },
  modalMessage: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'ABeeZee-Italic',
    alignSelf: 'center',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  declineButton: {
    backgroundColor: '#D9D9D9',
    padding: 8,
    width: width * 0.28,
    alignItems: 'center',
    borderRadius: 10,
  },
  allowButton: {
    backgroundColor: '#3EC8BF',
    padding: 8,
    width: width * 0.28,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalActionText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'ABeeZee-Italic',
  },
});

export default Chat_Sen;
