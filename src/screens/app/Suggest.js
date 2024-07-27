// onPress={() => {
//   // setSelectedChatID(index);
//   handleItemPress(index)
//   //  await   AsyncStorage.setItem("ID",item?.user?._id)

//   // if (retrevedData == item?.user?._id) {
//   // navigation.navigate('Chat_Sen', { userdata: item?.user?._id });
//   // } else {
//   //   setModalVisible(true);
//   // }
// }}

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../Api';

const { height, width } = Dimensions.get('window');

const Suggestion = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dToken, setDToken] = useState();
  const [uData, setUData] = useState();
  const [selectedChatID, setSelectedChatID] = useState(null);
  const [pendingChatID, setpendingChatID] = useState(null);
  const [chatUserData, setChatUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        const chatID = await AsyncStorage.getItem('ChatID');
        setSelectedChatID(chatID)
        if (data) {
          const parsedData = JSON.parse(data);
          const token = parsedData.token;
          setDToken(token);
          getSuggestions(token);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error retrieving data', error);
      }
    };

    fetchData();
  }, []);

  const getSuggestions = async token => {
    try {
      const res = await axios.get(API.USER.SUGGES, {
        headers: {
          Authorization: token,
        },
      });
      setUData(res?.data?.suggestions);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleItemPress = async (index, item) => {
    const id = await AsyncStorage.getItem('ChatID')
    if (id == null || id != item.user._id) {
      setpendingChatID(item.user._id);
      setChatUserData(item.user)
      setModalVisible(true);
    } else if (id == item.user._id) {
      setSelectedChatID(item.user._id);
      navigation.navigate('Chat_Sen', { userdata: item?.user });
    };
  };

  const handleModalConfirm = async () => {
    setModalVisible(false);
    setpendingChatID(null);
    navigation.navigate('Chat_Sen', { userdata: chatUserData, first: true });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setpendingChatID(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              {/* <Back /> */}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Suggestion</Text>
            <TouchableOpacity style={styles.placeholder} />
          </View>
          <View>
            <Text style={styles.description}>
              People that match with your interests.
            </Text>
            <Text style={styles.note}>
              Note: You can chat with one person at a time, you will have to buy
              our subscription plan to rechat with the same person.
            </Text>
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={uData}
              renderItem={({ item, index }) => {
                console.log("type========>", item?.user?.type)
                const isDisabled =
                  selectedChatID != item.user._id ? true : false;
                return (isDisabled &&
                  <View>
                    {item?.user?.type === "super-admin" ? null : <View style={styles.listItem}>
                      <View style={styles.userInfo}>
                        <Image
                          source={require('../../assets/Images/Icons/Sugp.png')}
                          style={styles.userImage}
                        />
                        <Text
                          style={styles.userName}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item?.user?.name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          handleItemPress(index, item);
                        }}
                        // disabled={isDisabled}
                        style={styles.chatButton}>
                        <Text style={styles.chatButtonText}>Chat</Text>
                      </TouchableOpacity>
                    </View>}
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(false)
          }}
          style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              If you start chatting with another person, your current chat will
              end. To chat with 5 to 10 people simultaneously, please purchase a
              subscription.
            </Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={handleModalConfirm}
                style={[styles.modalButton, styles.startChatButton]}>
                <Text style={styles.modalButtonText}>Start Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Premium');
                }}
                style={[styles.modalButton, styles.getPremiumButton]}>
                <Text style={styles.modalButtonText}>Get Premium</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
  },
  backButton: {
    width: width * 0.05,
  },
  headerTitle: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'ABeeZee-Italic',
  },
  placeholder: {
    width: 10,
  },
  description: {
    color: '#000',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    width: width * 0.9,
  },
  note: {
    color: '#E2B100',
    marginTop: 20,
    marginLeft: 20,
    fontSize: 15,
    width: width * 0.9,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    width: width * 0.9,
    alignSelf: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 50,
    width: 50,
  },
  userName: {
    color: '#000',
    fontSize: 18,
    marginLeft: 20,
    width: width * 0.4,
  },
  chatButton: {
    backgroundColor: '#3EC8BF',
    padding: 5,
    width: width * 0.2,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledChatButton: {
    backgroundColor: '#d3d3d3',
  },
  chatButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'ABeeZee-Italic',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'ABeeZee-Italic',
    alignSelf: 'center',
    marginVertical: 20,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 8,
    width: width * 0.3,
    alignItems: 'center',
    borderRadius: 10,
  },
  startChatButton: {
    backgroundColor: '#D9D9D9',
  },
  getPremiumButton: {
    backgroundColor: '#3EC8BF',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'ABeeZee-Italic',
    width: width * 0.3,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Suggestion;
