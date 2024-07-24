import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Back_Arrow, Back_W, Messeg, Pen } from '../../assets/Images';
import { Image } from 'react-native';
import axios from 'axios';
import { API } from '../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import { SocketContext } from '../../context/SocketContext';
const Profile = ({ navigation }) => {
  const { userInfo, setUserInfo } = useContext(SocketContext);
  console.log(userInfo)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) {
          const parsedData = JSON.parse(data);
          const token = parsedData.token;

          setDToken(token);
        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error retrieving data', error);
      }
    };

    fetchData();
  }, []);
  const [dToken, setDToken] = useState();

  const [dName, setDName] = useState(userInfo.name);
  const [rName, setRName] = useState(userInfo.realName);
  const [email, setEmail] = useState(userInfo.email);
  const [pvide, setpvide] = useState(null);
  const [imge, setimge] = useState(userInfo.image?.path);
  const [addd, setaddd] = useState(userInfo.address);
  const [pho, setpho] = useState(userInfo.phone);


  const onUpdate = async () => {
    const formData = new FormData();
    if (pvide) {
      formData.append('image', {
        uri: pvide.uri,
        type: pvide.type,
        name: pvide.fileName,
      });
    }
    formData.append('email', email);
    formData.append('realName', rName);
    formData.append('displayName', dName);
    formData.append('address', addd);
    formData.append('phone', pho);

    const res = await axios
      .put(API.USER.UPDATE_DATA, formData, {
        headers: {
          Authorization: dToken,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res?.data);
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          "address": addd,
          "displayName": dName,
          "email": email,
          "phone": pho,
          "realName": rName,
          ...(pvide && {
            "image": {
              "filename": pvide.fileName,
              "mimetype": pvide.type,
              "path": pvide.uri
            }
          })
        }));

        alert('Data Updated Successfully');
        navigation.goBack()
      })
      .catch(error => {
        console.log(error);
      });
  };

  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: true,
  //     maxHeight: 2000,
  //     maxWidth: 2000,
  //   };

  //   launchImageLibrary(options, async response => {
  //     if (response.didCancel) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Canceled The upload',
  //       });
  //     } else if (response.error) {
  //       // alert('Error');
  //       // console.log('Image picker error: ', response.error);
  //     } else {
  //       if (response.assets && response.assets.length > 0) {
  //         console.log(response.assets[0])
  //         const pickedMedia = response.assets[0];

  //         const mediaType = pickedMedia.type; // This will give you the MIME type of the picked media

  //         if (mediaType.startsWith('image/')) {
  //           // It's an image
  //           let imageUri = pickedMedia.uri;
  //           setpvide(imageUri);
  //           console.log('first', imageUri);
  //         } else {
  //           // Unsupported media type
  //           alert('Unsupported media type');
  //         }
  //       } else {
  //         // No assets returned
  //         alert('No media picked');
  //       }
  //     }
  //   });
  // };
  const openImagePicker = () => {
    const options = {
      title: 'Select File',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setpvide(response.assets[0]);
        console.log('response.assets[0]', response.assets[0]);
      }
    });
  };

  // const uploadFile = async () => {
  //   if (!file) {
  //     Alert.alert('No file selected', 'Please select a file to upload.');
  //     return;
  //   }

  // try {
  //   const response = await axios.post('YOUR_API_ENDPOINT', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   console.log('File uploaded successfully:', response.data);
  // } catch (error) {
  //   console.error('Error uploading file:', error);
  // }
  // };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#3EC8BF',
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={{
              margin: 20,
            }}>
            <Back_W />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height * 0.4,
            }}>
            <TouchableOpacity
              onPress={() => {
                openImagePicker();
              }}
              style={{
                marginVertical: 10,
              }}>
              {pvide?.uri ? <Image
                source={{ uri: pvide.uri }}
                style={{
                  height: height * 0.15,
                  width: width * 0.31,
                  borderRadius: 100,
                }}
              /> :
                <Image
                  source={imge ?
                    { uri: imge }
                    : require('../../assets/Images/Icons/Pro.png')
                  }
                  style={{
                    height: height * 0.15,
                    width: width * 0.31,
                    borderRadius: 100,
                  }}
                />
              }
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFF',
                fontSize: 30,
                fontFamily: 'ABeeZee-Italic',
                marginBottom: 10,
              }}>
              {dName}
            </Text>
            <Text
              style={{
                color: '#FFF',
                fontSize: 18,
                fontFamily: 'ABeeZee-Italic',
                marginBottom: 10,
              }}>
              {email}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                padding: 10,
                borderRadius: 100,
              }}>
              <Messeg />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#FFF',
              // height: height,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              padding: 20,
            }}>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Display Name
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder={dName}
                  placeholderTextColor={'#000'}
                  value={dName}
                  onChangeText={text => {
                    setDName(text);
                  }}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Real Name
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder={rName}
                  value={rName}
                  onChangeText={text => {
                    setRName(text);
                  }}
                  placeholderTextColor={'#000'}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Email Address
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder={email}
                  placeholderTextColor={'#000'}
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                  }}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Address
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  value={addd}
                  onChangeText={text => {
                    setaddd(text);
                  }}
                  placeholder={addd}
                  placeholderTextColor={'#000'}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Phone Number
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  value={pho}
                  onChangeText={text => {
                    setpho(text);
                  }}
                  placeholder={pho}
                  placeholderTextColor={'#000'}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                margin: 5,
              }}>
              <Text
                style={{
                  color: '#797C7B',
                }}>
                Interests
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="Edit Your Interests"
                  placeholderTextColor={'#000'}
                  editable={false}
                  style={{
                    // backgroundColor: 'red',
                    width: width * 0.7,
                    color: '#000',
                    fontSize: 18,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Interset');
                  }}>
                  <Pen />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Interset');
                // onCreate()
                onUpdate();
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
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get('window');
export default Profile;
