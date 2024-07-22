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
} from 'react-native';
import { Back, Clip, Send } from '../../assets/Images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext, SocketInstance } from '../../context/SocketContext';
import axios from 'axios';
import { BASE_URL } from '../Api';

const Chat_Sen = ({ navigation, route }) => {
  const { socketInstance, userInstance } = useContext(SocketContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [req, setReq] = useState(false);
  const { userdata } = route.params;
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [udata, setuData] = useState();
  const [uToken, setUToken] = useState();
  const [socket, setSocket] = useState(null);
  const [conversation, setConversation] = useState(null);

  console.log('chat ', userInstance);

  const getConversation = async () => {
    try {
      let rawUser = await AsyncStorage.getItem('user');
      let user = await JSON.parse(rawUser);
      let res = await axios.get(
        `${BASE_URL}/auth/get-conversation/${userdata}`,
        { headers: { Authorization: user.token } },
      );
      setConversation(res?.data?.conversation);
    } catch (error) {
      console.error(error);
    }
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current && conversation) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [conversation]);

  useEffect(() => {
    const handleNewMessage = (data) => {
      console.log('New message received:', data);
      setConversation((prev) => ({
        ...prev,
        messages: [...prev?.messages, data],
      }));
    };

    const handleDeliveredMessage = (data) => {
      setConversation((prev) => ({
        ...prev,
        messages: [...prev?.messages, data],
      }));
    };

    SocketInstance?.on('new-message', handleNewMessage);
    SocketInstance?.on('message-delivered', handleDeliveredMessage);

    return () => {
      SocketInstance?.off('new-message', handleNewMessage);
      SocketInstance?.off('message-delivered', handleDeliveredMessage);
    };
  }, []);

  useEffect(() => {
    if (!conversation) {
      getConversation();
    }
  }, []);

  const sendMessage = () => {
    try {
      if (!socketInstance) {
        return;
      }

      socketInstance.emit('send-message', {
        from: userInstance?.user?._id,
        to: userdata,
        message,
      });
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: '#3EC8BF',
            paddingVertical: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={{
              width: width * 0.05,
            }}
          >
            <Back />
          </TouchableOpacity>
          {req ? (
            <View style={{ width: 10 }}></View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                backgroundColor: '#FFF',
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: '#3EC8BF', fontSize: 15 }}>
                Profile Request
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView ref={scrollViewRef}>
          {conversation?.messages.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#FFF',
                gap: 5,
                paddingHorizontal: 20,
                marginVertical: 10,
                maxWidth: '80%',
                padding: 8,
                backgroundColor:
                  item?.sender === userInstance?.user?._id
                    ? '#20A090'
                    : '#F2F7FB',
                alignSelf:
                  item?.sender === userInstance?.user?._id
                    ? 'flex-end'
                    : 'flex-start',
                paddingLeft: 10,
                borderTopRightRadius:
                  item?.sender === userInstance?.user?._id ? 0 : 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius:
                  item?.sender === userInstance?.user?._id ? 10 : 0,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color:
                    item?.sender === userInstance?.user?._id ? '#FFF' : '#000',
                }}
              >
                {item?.content}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  bottom: -12,
                  right: 10,
                  fontFamily: 'Actor-Regular',
                }}
              >
                10:57 AM
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
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
        }}
      >
        <TextInput
          placeholder="Write your message"
          placeholderTextColor={'#797C7B'}
          value={message}
          onChangeText={setMessage}
          style={{
            backgroundColor: '#F3F6F6',
            color: '#000',
            borderRadius: 15,
            width: width * 0.7,
          }}
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
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.modalBackground}
        >
          <View style={styles.modalContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 16,
                fontFamily: 'ABeeZee-Italic',
                alignSelf: 'center',
              }}
            >
              Profile Request Received
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontFamily: 'ABeeZee-Italic',
                alignSelf: 'center',
                marginVertical: 20,
                textAlign: 'center',
              }}
            >
              Amina Iqbal has sent you a request to view your profile details,
              including your display picture, name, and more.
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: '#D9D9D9',
                  padding: 8,
                  width: width * 0.28,
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: 'ABeeZee-Italic',
                  }}
                >
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setReq(true);
                }}
                style={{
                  backgroundColor: '#3EC8BF',
                  padding: 8,
                  width: width * 0.28,
                  alignItems: 'center',
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 18,
                    fontFamily: 'ABeeZee-Italic',
                  }}
                >
                  Allow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
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
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
}); 
export default Chat_Sen;
