import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';
import {SocketContext} from '../../context/SocketContext';

const Splash = ({navigation}) => {
  const {setUserInstance} = useContext(SocketContext);
  const isAuth = async () => {
    const data = await AsyncStorage.getItem('user');
    setTimeout(async () => {
      if (data) {
        let user = await JSON.parse(data);
        setUserInstance(user);
        navigation.replace('BottomTabs');
        // console.log(data)
      } else {
        navigation.replace('Welcome');
      }
    }, 3000);
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
