import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Appl,
  Appl_B,
  Back_Arrow,
  Down_A,
  Edit,
  Face,
  Female,
  Goo,
  Male,
  Up_A,
} from '../../assets/Images';
import {Image} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import { API } from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Bio = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const handleSelectGender = gender => {
    setSelectedGender(gender);
    setModalVisible(false);
  };
  const handlePress = () => {
    Keyboard.dismiss();
    // setModalVisible(true);
  };
  const [pivid, setpivid] = useState('');
  const[dName,setDName]=useState()
  const[rName,setRName]=useState()
  const[age,setAge]=useState()
  const[dtoken,setDToken]=useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) {
          const parsedData = JSON.parse(data);
          const token = parsedData.token;
        
          setDToken(token)
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error("Error retrieving data", error);
      }
    };

    fetchData();
  }, []);

  // console.log("data", dtoken);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'Canceled The upload',
        });
      } else if (response.error) {
        // alert('Error');
        // console.log('Image picker error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const pickedMedia = response.assets[0];
          const mediaType = pickedMedia.type; // This will give you the MIME type of the picked media

          if (mediaType.startsWith('image/')) {
            // It's an image
            // let imageUri = pickedMedia.uri;
            let source={
              uri:response.assets[0]?.uri,
              type:response.assets[0]?.type,
              name:response.assets[0]?.fileName
            }
            setpivid(source);
            // console.log('first', response.assets[0]?.uri);
          } else {
            // Unsupported media type
            alert('Unsupported media type');
          }
        } else {
          // No assets returned
          alert('No media picked');
        }
      }
    });
  };
  const onCreate = async () => {
    const formData = new FormData();
    formData.append('image', pivid); // Assuming pivid is a file or Blob
    formData.append('displayName', dName);
    formData.append('realName', rName);
    formData.append('gender', selectedGender);
    formData.append('language', 'english');
    formData.append('age', age);
  
    try {
      const response = await axios.post(API.USER.C_PROFILE, formData, {
        headers: {
          Authorization: dtoken,
          'Content-Type': 'multipart/form-data' // Important for FormData
        }
      });
      console.log("Res", response?.data);
      if (response?.data?.message === "Profile Created Successfully") {
        alert("Profile Created Successfully")
        navigation.navigate("Interset")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            height: height * 1.1,
          }}>
          <TouchableOpacity
            style={{
              margin: 20,
            }}
            onPress={() => {
              navigation.pop();
            }}>
            <Back_Arrow />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: height * 0.02,
            }}>
            <View style={{width: 10}}></View>
            <View
              style={{
                width: width * 0.58,
              }}>
              <View
                style={{
                  backgroundColor: '#33E0CF',
                  height: height * 0.02,
                  width: width * 0.2,
                  alignSelf: 'flex-end',
                  marginRight: 20,
                }}></View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 22,
                  fontFamily: 'ABeeZee-Italic',
                  position: 'absolute',
                  bottom: 5,
                }}>
                Create your Bio Data
              </Text>
            </View>
            <View style={{width: 10}}></View>
          </View>
          <View
            style={{
              width: width * 0.9,
              marginVertical: 20,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#797C7B',
                fontSize: 15,
                textAlign: 'center',
              }}>
              Your information will not be visible to anyone unless you
              authorize it!!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              openImagePicker();
            }}
            style={{
              width: width * 0.3,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Image
              source={
                pivid
                  ? {uri: pivid?.uri}
                  : 
                  require('../../assets/Images/Icons/Propic.png')
              }
              style={{
                height: height * 0.14,
                width: width * 0.3,
                borderRadius: 100,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                bottom: 5,
              }}>
              <Edit />
            </View>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3EC8BF',
                width: width * 0.8,
              }}>
              Display Name
            </Text>
            <TextInput
              placeholder="Jhon Abrahm"
              placeholderTextColor={'#000'}
              value={dName}
              onChangeText={(text)=>{setDName(text)}}
              style={{
                borderBottomWidth: 1,
                borderColor: '#5F5F5F',
                color: '#000',
                width: width * 0.8,
                padding: 5,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3EC8BF',
                width: width * 0.8,
              }}>
              Real Name
            </Text>
            <TextInput
            value={rName}
            onChangeText={(text)=>{setRName(text)}}
              placeholder="James Willson"
              placeholderTextColor={'#000'}
              style={{
                borderBottomWidth: 1,
                borderColor: '#5F5F5F',
                color: '#000',
                width: width * 0.8,
                padding: 5,
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3EC8BF',
                width: width * 0.8,
              }}>
              Age
            </Text>
            <TextInput
            value={age}
            onChangeText={(text)=>{setAge(text)}}
              placeholder="21"
              placeholderTextColor={'#000'}
              keyboardType="number-pad"
              style={{
                borderBottomWidth: 1,
                borderColor: '#5F5F5F',
                color: '#000',
                width: width * 0.8,
                padding: 5,
              }}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                handlePress();
              }}
              style={{
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: modalVisible ? '#8e8e8e' : '#FFF',
                width: width * 0.9,
                alignSelf: 'center',
                borderTopLeftRadius: modalVisible ? 10 : 0,
                borderTopRightRadius: modalVisible ? 10 : 0,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#3EC8BF',
                  width: width * 0.8,
                }}>
                Gender
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: width * 0.8,
                  borderBottomWidth: 1,
                  borderColor: '#5F5F5F',
                }}>
                <TextInput
                  editable={false}
                  placeholder="Select Gender"
                  placeholderTextColor={'#000'}
                  value={selectedGender}
                  pointerEvents="none"
                  style={{
                    color: '#000',
                    width: width * 0.7,
                    padding: 5,
                  }}
                />
                {modalVisible ? <Up_A /> : <Down_A />}
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Interset');
                onCreate()
              }}
              style={{
                backgroundColor: '#33E0CF',
                padding: 15,
                alignItems: 'center',
                borderRadius: 20,
                width: width * 0.9,
                alignSelf: 'center',
                marginVertical: 40,
              }}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 25,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                Next
              </Text>
            </TouchableOpacity>
            {modalVisible && (
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelectGender('Male')}>
                    <Male />
                    <Text style={styles.optionText}>Male</Text>
                    <View style={{width: 10}}></View>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 2,
                      width: width * 0.8,
                      backgroundColor: 'rgba(0,0,0,0.4)',
                      alignSelf: 'center',
                      borderRadius: 100,
                    }}></View>
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelectGender('Female')}>
                    <Female />
                    <Text style={styles.optionText}>Female</Text>
                    <View style={{width: 10}}></View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  modalBackground: {
    // flex: 1,
    // justifyContent: 'center',
    position: 'absolute',
    marginTop: height * 0.1,
    alignSelf: 'center',
    width: width * 0.9,
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#8e8e8e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  option: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
});
export default Bio;
