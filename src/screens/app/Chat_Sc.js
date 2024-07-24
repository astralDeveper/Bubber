import React, { Fragment, useContext, useEffect, useState } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mag } from '../../assets/Images';
import { Chat_Da } from '../Dummy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API } from '../Api';
import { SocketContext } from '../../context/SocketContext';
import { timeAgo } from '../../libs/timeAgo';

const { height, width } = Dimensions.get('window');

const Message = ({ navigation }) => {
  const [conData, setConData] = useState();
  const { userInstance, userInfo } = useContext(SocketContext);

  const Get_cons = async () => {
    try {
      const res = await axios.get(API.USER.GET_CONVERSATIONS, {
        headers: {
          Authorization: userInstance?.token,
        },
      });
      // console.log("first",res?.data?.conversations[0]?.participants)
      setConData(res?.data?.conversations);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    Get_cons();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  let getLatestMessage = messages => {
    let latestMessage = messages.reduce((latest, message) => {
      return latest.date > message.date ? latest : message;
    });
    return latestMessage;
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
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Image
                source={userInfo.image?.path ?
                  { uri: userInfo.image.path }
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
            <FlatList
              data={conData}
              renderItem={({ item, index }) => (
                <Fragment key={index}>
                  {item?.participants?.map((user, userIndex) => (
                    <Fragment key={userIndex}>
                      {user?._id !== userInstance?.user?._id ? (
                        <View
                          style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
                          <TouchableOpacity
                            onPress={() => {
                              index == 0 &&
                                navigation.navigate('Chat_Sen', {
                                  userdata: user?._id,
                                });
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
                                source={{ uri: user?.image?.path }}
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
                                    color: '#000',
                                    fontSize: 20,
                                    fontFamily: 'ABeeZee-Italic',
                                    width: width * 0.4,
                                  }}>
                                  {user?.name}
                                </Text>
                                {/* <Text
                                  numberOfLines={1}
                                  ellipsizeMode={'tail'}
                                  style={{
                                    color: '#797C7B',
                                    fontSize: 12,
                                    fontFamily: 'ABeeZee-Regular',
                                    width: width * 0.5,
                                  }}>
                                  {getLatestMessage(item?.messages)?.content}
                                </Text> */}
                              </View>
                            </View>
                            <View>
                              {/* <Text
                                style={{
                                  color: '#797C7B',
                                  fontSize: 12,
                                  fontFamily: 'ABeeZee-Regular',
                                  width: width * 0.18,
                                }}>
                                  {timeAgo(getLatestMessage(item?.messages)?.date)}
                              </Text> */}
                            </View>
                          </TouchableOpacity>

                          {/* {index == 0 ? null : (
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(true);
                              }}
                              activeOpacity={1}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                              }}>
                              <LinearGradient
                                colors={[
                                  'rgba(255, 255, 255, 0.9)',
                                  'rgba(255, 255, 255, 0.9)',
                                  'rgba(255, 255, 255, 0.9)',
                                ]}
                                style={{
                                  // flex: 1,
                                  height: height * 0.1,
                                  width: width,
                                }}
                              />
                            </TouchableOpacity>
                          )} */}
                        </View>
                      ) : (
                        <></>
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )}
            // keyExtractor={item => item.id.toString()}
            />
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
    </SafeAreaView>
  );
};

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
});
export default Message;
