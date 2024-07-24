import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Welec from '../../assets/Images/PNG/Welc.png';
import App_I, {Appl, Face, Goo} from '../../assets/Images';

const Welcome = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <ImageBackground
        source={Welec}
        style={{
          flex: 1,height:height
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 30,
            }}>
            <App_I />
            <View
              style={{
                marginLeft: 20,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 25,
                  fontFamily: 'Actor-Regular',
                }}>
                Bubber
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 13,
                  fontFamily: 'Actor-Regular',
                }}>
                Find Yours
              </Text>
            </View>
          </View>
          <View
            style={{
              width: width * 0.7,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 60,
              }}>
              Connect, Chat Easily & Quickly
            </Text>
          </View>
          <View
            style={{
              width: width * 0.7,
              margin: 20,
            }}>
            <Text
              style={{
                color: '#5F5F5F',
              }}>
              Our chat app is the perfect way to stay connected with friends and
              family.
            </Text>
          </View>
          {/* <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
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
              style={{
                backgroundColor: '#000',
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
                backgroundColor: '#000',
                height: 50,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#5F5F5F',
              }}>
              <Appl />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 20,
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
          </View> */}
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Signup")
          }}
            style={{
              alignSelf: 'center',
              marginVertical: 30,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                fontFamily: 'ABeeZee-Italic',
              }}>
              Sign up with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("Login")
          }}
            style={{
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: '#5F5F5F',
                fontSize: 15,
                fontFamily: 'ABeeZee-Regular',
              }}>
              Existing account?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
const {height, width} = Dimensions.get('window');
export default Welcome;
