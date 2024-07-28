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
import React, { useContext, useState } from 'react';
import { Appl, Appl_B, Back_Arrow, Face, Goo } from '../../assets/Images';
import { API } from '../Api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketContext } from '../../context/SocketContext';

const Signup = ({ navigation }) => {
  const { setUserInstance, setUserInfo } = useContext(SocketContext);
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [cpass, setCPass] = useState();
  const [token, setToken] = useState();

  const handleSignUp = async () => {
    try {
      if (!name.trim() || !email.trim() || !pass.trim()) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }
      let res = await axios.post(API.USER.SIGNUP, {
        name: name,
        email: email,
        password: pass,
      });
      setUserInstance(res?.data);
      setUserInfo(res?.data?.user)
      await AsyncStorage.setItem('user', JSON.stringify(res?.data));
      Alert.alert('Sign Up successful.');
      navigation?.navigate('Bio');
    } catch (error) {
      console.log(error);
      if (error.response) {
        // Server responded with a status other than 200 range
        const status = error.response.status;
        const message =
          error.response.data.message || error.response.data.message;

        if (status === 400) {
          Alert.alert('Error', 'Bad request! All fields are required.');
        } else if (status === 409) {
          Alert.alert('Error', 'User already exists with this email.');
        } else {
          Alert.alert('Error', message || 'Sign Up failed');
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Sign Up Error: No response received', error.request);
        Alert.alert(
          'Error',
          'No response from server. Please try again later.',
        );
      } else {
        // Something else happened while setting up the request
        console.error('Sign Up Error:', error.message);
        Alert.alert(
          'Error',
          'An error occurred during sign up. Please try again.',
        );
      }
    }
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
            <View style={{ width: 10 }}></View>
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
                Sign in to Bubber
              </Text>
            </View>
            <View style={{ width: 10 }}></View>
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
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3EC8BF',
                width: width * 0.8,
              }}>
              Your name
            </Text>
            <TextInput
              value={name}
              onChangeText={text => {
                setName(text);
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
              marginTop: 30,
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
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#3EC8BF',
                width: width * 0.8,
              }}>
              Confirm Password
            </Text>
            <TextInput
              value={cpass}
              onChangeText={text => {
                setCPass(text);
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
              // position: 'absolute',
              // bottom: 30,
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 40
            }}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Bio")
                pass === cpass ? handleSignUp() : alert('Wrong');
              }}
              disabled={email && pass && name && cpass ? false : true}
              style={{
                backgroundColor:
                  email && pass && name && cpass ? '#33E0CF' : '#F3F6F6',
                padding: 15,
                alignItems: 'center',
                borderRadius: 20,
                width: width * 0.9,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: email && pass && name && cpass ? '#FFF' : '#797C7B',
                  fontSize: 25,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                Create an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get('window');
export default Signup;
