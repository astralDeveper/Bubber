import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, ImageBackground} from 'react-native';

const Splash = ({navigation}) => {

  const isAuth =  async() => {
    const data = await AsyncStorage.getItem('user');
      setTimeout(() => {
        if (data) {
          navigation.replace('BottomTabs')
          // console.log(data)
        }else{
          navigation.replace('Welcome')
        }
      }, 3000);
  };
  useEffect(() => {
      isAuth()
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={require('../../assets/Images/PNG/Splash.jpg')}>
  
   
    </ImageBackground>
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
