import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Back, Clip, Send } from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../../context/SocketContext'; // Ensure correct import
import axios from 'axios';
import { API, BASE_URL } from '../Api';
import { io } from 'socket.io-client';
import { useFocusEffect } from '@react-navigation/native';
import { Toast } from 'react-native-toast-notifications';

const { height, width } = Dimensions.get('window');

const Chat_Sen = ({ navigation, route }) => {

  const { socketInstance, userInstance, userInfo, setUserInfo } = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [req, setReq] = useState(true);
  const [request, setRequest] = useState(true);
  const { userdata } = route.params;
  const [message, setMessage] = useState('');
  const [thatImage, setThatImage] = useState();
  const [name, setName] = useState(userdata.displayName);
  const [conversation, setConversation] = useState(null);
  const scrollViewRef = useRef(null);
  const [precipitant, setPrecipitant] = useState();
  const [loading, setLoading] = useState(false);
  const [conversationID, setConversationID] = useState();


  const [isFirst, setisFirst] = useState(route.params.first);

  const otherDetail = async () => {
    try {
      const included = userInfo.isprofileshown.includes(userdata._id);
      if (included) {
        setLoading(true)
        const res = await axios.post(API.USER.OTHER_PROFILE, {
          id: userdata._id
        })
        if (res.data.user.isprofileshown.includes(userInfo._id)) setRequest(false)
        setThatImage(res.data.user.image.path)
        setName(res.data.user.realName)
        setReq(false)
      } else {
        const res = await axios.post(API.USER.OTHER_PROFILE, {
          id: userdata._id
        })
        if (res.data.user.isprofileshown.includes(userInfo._id)) setRequest(false)
        else setRequest(true)
        setPrecipitant(res.data.user)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("ERROR====>", error)
    }
  }
  const chatHandler = async () => {
    try {
      setLoading(true)
      const res = await axios.post(API.USER.OTHER_PROFILE, {
        id: userdata._id
      })
      setPrecipitant(res.data.user)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("ERROR====>", error)
    }
  }

  useEffect(() => {
    chatHandler()
  }, [modalVisible])


  useFocusEffect(
    useCallback(() => {
      otherDetail()
    }, []),
  );


  const sendProfileViewRequest = async () => {
    try {
      const IDS = {
        userId: userInfo._id,
        targetUserId: userdata._id
      }
      if (!userdata || !userdata._id) {
        throw new Error('User data is missing or does not contain _id');
      }
      await axios.post(API.USER.REQUEST_PROFILE, IDS);
    } catch (error) {
      setLoading(false)
      console.error('Error occurred:', error);
    }
  };
  const grantProfileViewRequest = async () => {
    try {
      setLoading(true)
      const IDS = {
        userId: userInfo._id,
        requesterId: userdata._id
      }
      if (!userdata || !userdata._id) {
        throw new Error('User data is missing or does not contain _id');
      }
      await axios.post(API.USER.GRANT_PROFILE, IDS);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error occurred:', error);
    }
  };

  useEffect(() => {
    socketInstance.on('profile-view-request', (data) => {
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

  const getConversation = async () => {
    try {
      setLoading(true)
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
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching conversation:', error);
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    if (scrollViewRef.current && conversation) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [conversation]);

  const chatID = () => {
    if (userInfo._id > userdata._id) {
      return userInfo._id + userdata._id;
    } else {
      return userdata._id + userInfo._id;
    }
  }


  const sendMessage = () => {
    if (userInfo.activeConversation != 'false' && userInfo.activeConversation == chatID()) {
      if (message.length > 0 && socketInstance && userInstance?.user?._id) {
        if (precipitant.activeConversation != chatID()) {
          Toast.hideAll()
          Toast.show('If the recipient wants to communicate, Recipient will reply to you.')
        }
        socketInstance.emit('send-message', {
          from: userInstance.user._id,
          to: userdata._id,
          message,
        });
        setMessage('');
      } else {
        console.error('Socket instance or user ID is missing');
      }
    } else setModalVisible(true)
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // To get the time in 12-hour format with AM/PM
    };

    const timeString = date.toLocaleTimeString('en-US', options);
    return (timeString);
  };

  return (
    <>
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
              {loading ?
                <ActivityIndicator size={'small'} color={'#eff'} />
                :
                <Image
                  source={req ? require('../../assets/Images/Icons/Sugp.png') : thatImage
                    ? { uri: thatImage } : require('../../assets/Images/Icons/Pro.png')}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 100,
                  }}
                />
              }
              <Text style={styles.displayNameText}>{request ? name : userdata?.displayName}</Text>
            </View>
            {loading ?
              <ActivityIndicator size={'small'} color={'#eff'} />
              : request && (
                <TouchableOpacity onPress={() => {
                  // setModalVisible(true)
                  sendProfileViewRequest()

                }} style={styles.profileRequestButton}>
                  <Text style={styles.profileRequestText}>Profile Request</Text>
                </TouchableOpacity>
              )}

          </View>

          <ScrollView ref={scrollViewRef}>
            <>
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
                  <Text style={styles.timestamp}>{formatTime(item.date)}</Text>
                </View>
              ))}
            </>
          </ScrollView>
          {
            loading ?
              <View style={{
                marginVertical: 10,
                marginBottom: 20,
              }}>
                <ActivityIndicator size={'small'} color={'#3EC8BF'} />
              </View> :
              <View style={styles.inputContainer}>
                <TextInput
                  multiline
                  placeholder="Write your message"
                  placeholderTextColor={'#797C7B'}
                  value={message}
                  onChangeText={setMessage}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={grantProfileViewRequest}>
                  <Clip />
                </TouchableOpacity>
                <TouchableOpacity onPress={sendMessage}>
                  <Send />
                </TouchableOpacity>
              </View>}
          <Modal transparent={true} visible={modalVisible} animationType="slide">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
              style={styles.modalBackground}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Do you want to talk with {userdata?.displayName ? userdata?.displayName : userdata?.name} ?</Text>
                {/* <Text style={styles.modalMessage}>
                Amina Iqbal has sent you a request to view your profile details, including your display picture, name, and more.
                </Text> */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.declineButton}
                  >
                    <Text style={styles.modalActionText}>Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      try {
                        let generatedID;
                        if (userInfo._id > userdata._id) {
                          generatedID = userInfo._id + userdata._id;
                        } else {
                          generatedID = userdata._id + userInfo._id;
                        }
                        const res = await axios.put(API.USER.START_CONVERSATION, {
                          userId: userInfo._id,
                          targetId: generatedID
                        });
                        await AsyncStorage.setItem('ChatID', userdata._id)
                        setUserInfo(res.data.user)
                        setModalVisible(false)
                        setisFirst(false)
                        setConversationID(generatedID)
                        Toast.show('If this person is already chatting with someone else and wants to chat with you, you will both be chatting with each other.')
                        //userInfo?.activeConversation == 'false' ?
                        // <Message onPress={sendMessage} /> :
                        // userInfo?.activeConversation != precipitant?.activeConversation ?
                        // <Message onPress={sendMessage} /> : 
                      } catch (error) {

                      }
                    }
                    }
                    style={styles.allowButton}
                  >
                    <Text style={styles.modalActionText}>Allow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </SafeAreaView >
      {loading &&
        <View style={{
          height: "100%",
          width: "100%",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.1)',
          position: 'absolute'
        }}>
          <ActivityIndicator size={Platform.OS == 'ios' ? 'large' : width * .2} color={'#3EC8BF'} />
        </View>}
    </>
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
    marginBottom: 20,
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

const Message = ({ onPress }) => (
  <TouchableOpacity
    onPress={() => onPress && onPress()}
    activeOpacity={0.8}
    style={{
      alignSelf: 'center',
      padding: 10,
      borderRadius: 20,
      marginVertical: 10,
      backgroundColor: 'rgba(0,0,0,0.2)'
    }}>
    <Text style={{
      color: 'black'
    }}>This person already chat with other person.</Text>
  </TouchableOpacity>
)


{/* <Modal transparent={true} visible={modalVisible} animationType="slide">
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
                    grantProfileViewRequest()
                  }}
                  style={styles.allowButton}
                >
                  <Text style={styles.modalActionText}>Allow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}