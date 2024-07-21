import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Back, Cam, Clip, Mag} from '../../assets/Images';
import {Chat_Da} from '../Dummy';

const Chat_Sen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [req, setReq] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 20,
            backgroundColor: '#3EC8BF',
            paddingVertical: 40,
          }}>
          <TouchableOpacity
           onPress={() => {
            navigation.pop()
          }}
            style={{
              width: width * 0.05,
            }}>
            <Back />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={
                req
                  ? require('../../assets/Images/Icons/Ch1.png')
                  : require('../../assets/Images/Icons/Sugp.png')
              }
              style={{
                height: 50,
                width: 50,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                marginLeft: 10,
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 18,
                  color: '#000',
                  fontFamily: 'ABeeZee-Italic',
                }}>
                Jhon Abraham
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#797C7B',
                  fontFamily: 'ABeeZee-Regular',
                }}>
                Active now
              </Text>
            </View>
          </View>
          {req ? (
            <View
              style={{
                width: 10,
              }}></View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                backgroundColor: '#FFF',
                padding: 5,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#3EC8BF',
                  fontSize: 15,
                }}>
                Profile Request
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView>
          <View
            style={{
              // marginTop: 30,
              backgroundColor: '#FFF',
              // height: height * 0.85,
            }}>
            <View
              style={{
                backgroundColor: '#797C7B',
                padding: 5,
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#FFF',
                }}>
                Today
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#20A090',
                padding: 10,
                alignSelf: 'flex-end',
                marginRight: 20,
                marginTop: 20,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 18,
                }}>
                Hello! Jhon abraham
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#20A090',
                // padding: 10,
                alignSelf: 'flex-end',
                marginRight: 40,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                  fontSize: 12,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                09:25 AM
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#F2F7FB',
                padding: 10,
                alignSelf: 'flex-start',
                marginLeft: 20,
                marginTop: 20,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                }}>
                Hello ! Nazrul How are you?
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: '#20A090',
                // padding: 10,
                alignSelf: 'center',
                // marginRight: 40,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                  fontSize: 12,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                09:25 AM
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          position: 'absolute',
          bottom: 10,
          backgroundColor: '#FFF',
          padding: 10,
          width: width * 0.99,
          borderTopWidth: 1,
          paddingVertical: 15,
          borderColor: '#EEFAF8',
        }}>
        <TextInput
          placeholder="Write your message"
          placeholderTextColor={'#797C7B'}
          style={{
            backgroundColor: '#F3F6F6',
            color: '#000',
            // paddingHorizontal: 10,
            borderRadius: 15,
            width: width * 0.7,
          }}
        />
        <TouchableOpacity>
          <Clip />
        </TouchableOpacity>
        <TouchableOpacity>
          <Cam />
        </TouchableOpacity>
      </View>
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
                fontSize: 16,
                fontFamily: 'ABeeZee-Italic',
                alignSelf: 'center',
              }}>
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
              }}>
              Amina Iqbal has sent you a request to view your profile details,
              including your display picture, name, and more.
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
                  width: width * 0.28,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,
                    fontFamily: 'ABeeZee-Italic',
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={() => {
                setModalVisible(false);
                setReq(true)
              }}
                style={{
                  backgroundColor: '#3EC8BF',
                  padding: 8,
                  width: width * 0.28,
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 18,
                    fontFamily: 'ABeeZee-Italic',
                  }}>
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
const {height, width} = Dimensions.get('window');

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
