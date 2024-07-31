import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { X } from '../../assets/Images';
import { Image } from 'react-native';
import { Toast } from 'react-native-toast-notifications';

const Premium = ({ navigation }) => {
  const [packageName, setPackageName] = useState('');

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
          }}>
          <TouchableOpacity
            style={{
              margin: 20,
            }}
            onPress={() => {
              navigation.pop();
            }}>
            <X />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#33E0CF',
                fontSize: 30,
                fontWeight: '800',
                alignSelf: 'center',
                marginVertical: 20,
              }}>
              Get Premium
            </Text>
          </View>
          <Image
            source={require('../../assets/Images/PNG/Pre.png')}
            style={{
              alignSelf: 'center',
              marginVertical: 20,
            }}
          />
          <View>
            <Text
              style={{
                color: '#000',
                width: width * 0.7,
                alignSelf: 'center',
                textAlign: 'justify',
              }}>
              Unlock the ability to chat with up to 5 to 10 people at once by
              upgrading to premium!
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: packageName == 'Monthly' ? '#33E0CF' : '#F3F4F7',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.8,
                borderRadius: 20,
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: '#3EC8BF',
                marginVertical: 20,
              }}
              onPress={() => setPackageName('Monthly')}
            >
              <Text
                style={{
                  color: packageName == 'Monthly' ? '#EFFF' : '#4C4C4C',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Monthly
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 30,
                  fontWeight: '800',
                }}>
                Rs.199
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: packageName == 'Annual' ? '#33E0CF' : '#F3F4F7',
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width * 0.8,
                borderRadius: 20,
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: '#3EC8BF',
                marginBottom: 20,
              }}
              onPress={() => setPackageName('Annual')}
            >
              <Text
                style={{
                  color: packageName == 'Annual' ? '#EFFF' : '#4C4C4C',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Annual
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 30,
                  fontWeight: '800',
                }}>
                Rs.999
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (packageName !== '') {
                Toast.show('You are premium member now');
                navigation.pop()
              }else navigation.pop()
            }}
            style={{
              backgroundColor: '#33E0CF',
              padding: 15,
              alignItems: 'center',
              borderRadius: 100,
              width: width * 0.8,
              alignSelf: 'center',
              // marginVertical: 40,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'ABeeZee-Italic',
              }}>
              Subscribe
            </Text>
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: '#33E0CF',
                width: width * 0.9,
                alignSelf: 'center',
                textAlign: 'justify',
                fontSize: 10,
                marginTop: 10,
              }}>
              By placing this order, you agree to the Terms of Service and Privacy
              Policy. Subscription automatically renews unless auto-renew is
              turned off at least 24-hours before the end of the current period.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get('window');
export default Premium;
