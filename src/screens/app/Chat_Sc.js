import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mag } from '../../assets/Images';
import { Chat_Da } from '../Dummy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../Api';
import { SocketContext } from '../../context/SocketContext';
import { timeAgo } from '../../libs/timeAgo';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const Message = ({ navigation }) => {
  const [conData, setConData] = useState();
  const { userInstance, userInfo, setUserInfo } = useContext(SocketContext);
  const [notification, setNotification] = useState(false);
  const [requestsData, setRequestsData] = useState([]);
  const [conersationId, setconersationId] = useState([]);
  console.log(userInfo._id, userInfo.name)
  const Get_cons = async () => {
    try {
      const res = await axios.get(API.USER.GET_CONVERSATIONS, {
        headers: {
          Authorization: userInstance?.token,
        },
      });

      if (res?.data?.conversations) {
        const sortedByLastMessageTimestamp = res.data.conversations.sort(
          (a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          },
        );
        setConData(sortedByLastMessageTimestamp);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      Get_cons();
      noti()
    }, [notification]),
  );
  // if (idsArray.includes(savedId)) {
  //   alert("ID matched!");
  // }
  const [modalVisible, setModalVisible] = useState(false);

  let getLatestMessage = messages => {
    let latestMessage = messages.reduce((latest, message) => {
      return latest.date > message.date ? latest : message;
    });
    return latestMessage;
  };
  // const ProById = async () => {
  //   try {
  //     const id = { id: userInfo._id }
  //     const response = await axios.post(`${API.USER.REQUEST_VIEW}`, id)
  //     setRequestsData(response.data.data);
  //     setNotification(true);
  //   } catch (error) {
  //     console.error(
  //       'Error',
  //       error,
  //     );
  //   }
  // };
  const noti = async () => {
    try {
      const id = { id: userInfo._id }
      const response = await axios.post(`${API.USER.REQUEST_VIEW}`, id)
      setRequestsData(response.data.data);
    } catch (error) {
      console.error(
        'Error',
        error,
      );
    }
  };



  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    // Format the time to "1:00 PM"
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true // To get the time in 12-hour format with AM/PM
    };

    const timeString = date.toLocaleTimeString('en-US', options);
    return (timeString);
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3EC8BF' }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            {/* <TouchableOpacity
              style={{
                backgroundColor: '#000',
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Mag />
            </TouchableOpacity> */}
            <Text
              style={{
                fontSize: 25,
                color: '#FFF',
                fontFamily: 'ABeeZee-Italic',
              }}>
              Chat
            </Text>
            <TouchableOpacity
              onPress={() => setNotification(true)}
              style={{
                backgroundColor: '#8e8e8e',
                padding: 5,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#FFF',
                }}>
                Notification
              </Text>
              <View style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: 'red',
                position: 'absolute',
                right: "-5%",
                top: "-30%",
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  color: 'black', fontSize: 12
                }}>
                  {requestsData.length}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Image
                source={
                  userInfo.image?.path
                    ? { uri: userInfo.image.path }
                    : require('../../assets/Images/Icons/Pro.png')
                }
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingTop: 30,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              height: height * 0.9,
            }}>
            {conData?.map((item, userIndex) =>
              item.participants.map((user, index) => (
                console.log("Hellosdf=====>", user),
                <Fragment key={index}>
                  {user?._id !== userInstance?.user?._id ? (
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
                      <TouchableOpacity
                        onPress={async () => {
                          if (userIndex == 0) {
                            navigation.navigate('Chat_Sen', {
                              userdata: user, isFirst: false, conversationid: item._id
                            });
                          } else setModalVisible(true);
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: width * 0.9,
                          alignSelf: 'center',
                          marginVertical: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: width * 0.71,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <Image
                            source={
                              user?.isprofileshown?.find(id => id === userInstance?.user?._id) ?
                                { uri: user?.image?.path }
                                :
                                require('../../assets/Images/Icons/Sugp.png')}
                            style={{
                              height: 60,
                              width: 60,
                              borderRadius: 100,
                            }}
                          />
                          <View>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode={'tail'}
                              style={{
                                color: userIndex == 0 ? '#000' : '#d3d3d3',
                                fontSize: 20,
                                fontFamily: 'ABeeZee-Italic',
                                width: width * 0.4,
                              }}>
                              {/* {user?.name} */}
                              {
                                user?.isprofileshown?.find(id => id === userInstance?.user?._id)
                                  ? user?.realName
                                  : user?.displayName

                                // null
                                // user?.name 
                              }

                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text style={{ color: 'black' }}>{formatTime(item.lastMessageTimestamp)}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <></>
                  )}
                </Fragment>
              )),
            )}
          </View>
        </View>
      </ScrollView>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                fontFamily: 'ABeeZee-Italic',
                alignSelf: 'center',
                marginVertical: 20,
                textAlign: 'center',
              }}>
              You need to purchase premium first to view your previous chats.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: '#D9D9D9',
                  padding: 8,
                  width: width * 0.3,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontFamily: 'ABeeZee-Italic',
                    width: width * 0.3,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Premium');
                }}
                style={{
                  backgroundColor: '#3EC8BF',
                  padding: 8,
                  width: width * 0.3,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 15,
                    fontFamily: 'ABeeZee-Italic',
                    width: width * 0.3,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  Get Premium
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal transparent={true} visible={notification} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setNotification(false)}
          style={styles.modalBackground}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContainer}>
            <Text style={{
              color: '#000',
              fontSize: 18,
              fontFamily: 'ABeeZee-Italic',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
              Profile Request List
            </Text>
            <FlatList
              contentContainerStyle={{
                gap: 10
              }}
              data={requestsData}
              ListEmptyComponent={<View style={{
                width: "100%",
                height: 200,
                backgroundColor: 'white',
                justifyContent:'center',
                alignItems:'center'
              }}>
                <Text style={{
                  color: '#000',
                  fontSize: 18,
                  fontFamily: 'ABeeZee-Italic',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                  Notification Empty
                </Text>
              </View>}
              renderItem={({ item }) => <RenderItem
                item={item}
                userId={userInfo._id}
                setNotification={setNotification}
                setUserInfo={setUserInfo}
              />}
              keyExtractor={(item, index) => index.toString()}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};


const RenderItem = ({ item, userId, setNotification, setUserInfo }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }}>
    <Text style={styles.modalMessage}>{item.displayName}</Text>
    <TouchableOpacity
      onPress={async () => {
        const res = await axios.post(API.USER.DENY_PROFILE,
          {
            userId: userId,
            requesterId: item._id
          }
        )
        setUserInfo(res.data.user)
        setNotification(false)
      }}
      style={styles.allowButton}
    >
      <Text style={styles.modalActionText}>Deny</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={async () => {
        const res = await axios.post(API.USER.ACCEPT_PROFILE,
          {
            accepterID: userId,
            targetUserId: item._id
          }
        )
        setUserInfo(res.data.user)
        setNotification(false)
      }}
      style={styles.allowButton}
    >
      <Text style={styles.modalActionText}>Allow</Text>
    </TouchableOpacity>
  </View>
)



const styles = StyleSheet.create({
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
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
  allowButton: {
    backgroundColor: '#3EC8BF',
    padding: 8,
    width: width * 0.25,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalMessage: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'ABeeZee-Italic',
    alignSelf: 'center',
    textAlign: 'center',
  },
  modalActionText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'ABeeZee-Italic',
  },
});
export default Message;
