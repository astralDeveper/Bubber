import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { SocketContext } from '../../context/SocketContext';
import axios from 'axios';
import { API } from '../Api';

const Splash = ({ navigation }) => {
  const { setUserInstance, setUserInfo } = useContext(SocketContext);
  const isAuth = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      const parsedData = JSON.parse(data);
      const token = parsedData.token;
      
      setTimeout(async () => {
        try {
          if (token) {
            const res = await axios.get(API.USER.PROFILE_DATA, {
              headers: {
                Authorization: token,
              },
            });
            setUserInfo(res.data.user);
            let user = JSON.parse(data);
            setUserInstance(user);
            navigation.replace('BottomTabs');
          } else {
            navigation.replace('Welcome');
          }
        } catch (error) {
          navigation.replace('Welcome');
        }
      }, 2000);
      
    } catch (error) {
      navigation.replace('Welcome');
    }
  };
  
  useEffect(() => {
    isAuth();
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../assets/Images/PNG/Splash.jpg')}></ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
