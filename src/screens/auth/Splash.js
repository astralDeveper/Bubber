import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { SocketContext } from '../../context/SocketContext';
import axios from 'axios';
import { API } from '../Api';

const Splash = ({ navigation }) => {
  const { setUserInstance, setUserInfo } = useContext(SocketContext);
  const isAuth = async () => {
    const data = await AsyncStorage.getItem('user');
    const parsedData = JSON.parse(data);
    setTimeout(async () => {
      if (data) {
        const token = parsedData.token;
        console.log(token)
        const res = await axios
          .get(API.USER.PROFILE_DATA, {
            headers: {
              Authorization: token,
            },
          })
          .then(res => {
            setUserInfo(res.data.user);
          });
        let user = await JSON.parse(data);
        setUserInstance(user);
        navigation.replace('BottomTabs');
        // console.log(data)
      } else {
        navigation.replace('Welcome');
      }
    }, 2000);
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
