import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
import {Appl, Appl_B, Back_Arrow, Face, Goo} from '../../assets/Images';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API} from '../Api';
import {useNavigation} from '@react-navigation/native';
import {SocketContext} from '../../context/SocketContext';
const Login = () => {
  const {setUserInstance} = useContext(SocketContext);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '306651826618-uqp44hv9onmjpk93qeq1i5oo0befsc4m.apps.googleusercontent.com',
    offlineAccess: true,
    hostedDomain: '',
    forceCodeForRefreshToken: true,
    accountName: '',
    iosClientId: '<FROM DEVELOPER CONSOLE>',
    googleServicePlistPath: '',
    openIdRealm: '',
    profileImageSize: 120,
  });
  const onGoogleButtonPress = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();

      const {idToken} = await userInfo;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('22222', userInfo);
      await auth().signInWithCredential(googleCredential);

      navigation.navigate('Bio');
    } catch (error) {
      console.log('first', error);
    }
  });

  // const handleLogin = () => {

  //   if (!email.trim() || !pass.trim()) {
  //     Alert.alert("Error", "All fields are required.");
  //     return;
  //   }

  //   axios.post(API.USER.LOGIN, {
  //     email: email,
  //     password: pass,
  //   })
  //   .then(response => {
  //     if (response?.data?.message === "Login successful.") {
  //       AsyncStorage.setItem("user", JSON.stringify(response?.data))
  //         .then(() => {
  //           navigation.navigate("Bio");
  //           Alert.alert("Success", "Login Successful");

  //         })
  //         .catch(error => {
  //           console.error("AsyncStorage Error:", error);
  //           Alert.alert("Error", "Failed to save user data. Please try again.");
  //         });
  //     } else {
  //       Alert.alert("Success", response?.data?.message || "Login failed");
  //     }
  //   })
  //   .catch(error => {
  //     if (error.response) {
  //       // Server responded with a status other than 200 range
  //       const status = error.response.status;
  //       const message = error.response.data.message || error.response.data.msg;

  //       if (status === 400) {
  //         Alert.alert("Error", "Bad request! All fields are required.");
  //       } else if (status === 404) {
  //         Alert.alert("Error", message || "User not found or incorrect email/password.");
  //       } else {
  //         Alert.alert("Error", message || "Login failed");
  //       }
  //     } else if (error.request) {
  //       // Request was made but no response was received
  //       console.error("Login Error: No response received", error.request);
  //       Alert.alert("Error", "No response from server. Please try again later.");
  //     } else {
  //       // Something else happened while setting up the request
  //       console.error("Login Error:", error.message);
  //       Alert.alert("Error", "An error occurred during login. Please try again.");
  //     }
  //   });
  // };

  const handleLogin = async () => {
    const response = await axios
      .post(API.USER.LOGIN, {
        email: email,
        password: pass,
      })
      .then(response => {
        console.log(response?.data);
        if (response?.data?.message == 'Login successfull.') {
          // alert("Login Successfull")
          setUserInstance(response?.data);
          AsyncStorage.setItem('user', JSON.stringify(response?.data));
          navigation.navigate('BottomTabs');
        }
      })
      .catch(response => {
        if (response?.message == 'Request failed with status code 404') {
          alert('User not found with this email! .');
        }
        // console.log("first",response?.message)
        if (response?.message == 'Request failed with status code 405') {
          alert('Incorrect email or password! .');
        }
      });
  };
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
            height: height,
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
              marginTop: height * 0.08,
            }}>
            <View style={{width: 10}}></View>
            <View
              style={{
                width: width * 0.5,
              }}>
              <View
                style={{
                  backgroundColor: '#33E0CF',
                  height: height * 0.02,
                  width: width * 0.2,
                }}></View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 25,
                  fontFamily: 'ABeeZee-Italic',
                  position: 'absolute',
                  bottom: 5,
                }}>
                Log in to Bubber
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
              Welcome back! Sign in using your social account or email to
              continue us
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#5F5F5F',
              }}>
              <Face />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onGoogleButtonPress();
              }}
              style={{
                backgroundColor: '#FFF',
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#5F5F5F',
              }}>
              <Goo />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#5F5F5F',
              }}>
              <Appl_B />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 30,
            }}>
            <View
              style={{
                height: 2,
                width: width * 0.3,
                backgroundColor: '#5F5F5F',
                borderRadius: 50,
              }}></View>
            <Text
              style={{
                color: '#5F5F5F',
              }}>
              OR
            </Text>
            <View
              style={{
                height: 2,
                width: width * 0.3,
                backgroundColor: '#5F5F5F',
                borderRadius: 50,
              }}></View>
          </View>
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
              Your email
            </Text>
            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
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
              Password
            </Text>
            <TextInput
              value={pass}
              onChangeText={text => {
                setPass(text);
              }}
              secureTextEntry={true}
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
              position: 'absolute',
              bottom: 30,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Bio');
                handleLogin();
              }}
              disabled={email && pass ? false : true}
              style={{
                backgroundColor: email && pass ? '#33E0CF' : '#F3F6F6',
                padding: 15,
                alignItems: 'center',
                borderRadius: 20,
                width: width * 0.9,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: email && pass ? '#FFF' : '#797C7B',
                  fontSize: 25,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                Log in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forgep');
              }}>
              <Text
                style={{
                  color: '#3EC8BF',
                  fontSize: 18,
                  fontFamily: 'ABeeZee-Italic',
                  marginVertical: 20,
                  alignSelf: 'center',
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const {height, width} = Dimensions.get('window');
export default Login;
