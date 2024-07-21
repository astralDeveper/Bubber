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
  Modal,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Back, Mag} from '../../assets/Images';
import {Chat_Da, Sugg} from '../Dummy';

const {height, width} = Dimensions.get('window');

const Suggestion = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              margin: 20,
            }}>
            <TouchableOpacity
              style={{
                width: width * 0.05,
              }}>
              {/* <Back /> */}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 25,
                color: '#000',
                fontFamily: 'ABeeZee-Italic',
              }}>
              Suggestion
            </Text>
            <TouchableOpacity
              style={{
                width: 10,
              }}></TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                color: '#000',
                marginTop: 20,
                marginLeft: 20,
                fontSize: 18,
                width: width * 0.9,
              }}>
              People that matching with your interests.
            </Text>
            <Text
              style={{
                color: '#E2B100',
                marginTop: 20,
                marginLeft: 20,
                fontSize: 15,
                width: width * 0.9,
              }}>
              Note: You can chat with one person at a time, you will have to buy
              our subscription plan to rechat with the same person.
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <FlatList
              data={Sugg}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 8,
                      width: width * 0.9,
                      alignSelf: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.pic}
                        style={{
                          height: 50,
                          width: 50,
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          color: '#000',
                          fontSize: 18,
                          marginLeft: 20,
                          width: width * 0.4,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        index == 0
                          ? navigation.navigate('Chat_Sen')
                          : setModalVisible(true);
                      }}
                      style={{
                        backgroundColor: '#3EC8BF',
                        padding: 5,
                        width: width * 0.2,
                        borderRadius: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#FFF',
                          fontSize: 20,
                          fontFamily: 'ABeeZee-Italic',
                        }}>
                        Chat
                      </Text>
                    </TouchableOpacity>
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
              If you start chatting with another person, your current chat will
              end. To chat with 5 to 10 people simultaneously, please purchase a
              subscription.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('Chat_Sen');
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
                    width: width * 0.3,alignSelf:"center",textAlign:"center"
                  }}>
                  start chat
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
                    width: width * 0.3,alignSelf:"center",textAlign:"center"
                  }}>
                  get premium
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
export default Suggestion;
