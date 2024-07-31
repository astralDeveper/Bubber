import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Appl, Appl_B, Back_Arrow, Face, Goo } from '../../assets/Images';
import { emailValidation } from '../../core/helpers/validations';

const Forgep = ({ navigation }) => {
  const [email, setEmail] = useState();
  const submit = () => {
    const validate = emailValidation(email);
    if (validate) navigation.navigate('Bio');
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
                Forget Password
              </Text>
            </View>
            <View style={{ width: 10 }}></View>
          </View>



          <View
            style={{
              alignItems: 'center', marginTop: 50
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
              position: 'absolute',
              bottom: 30,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={submit}
              disabled={email ? false : true}
              style={{
                backgroundColor: email ? '#33E0CF' : '#F3F6F6',
                padding: 15,
                alignItems: 'center',
                borderRadius: 20,
                width: width * 0.9,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: email ? '#FFF' : '#797C7B',
                  fontSize: 25,
                  fontFamily: 'ABeeZee-Italic',
                }}>
                Forget Password
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { height, width } = Dimensions.get('window');
export default Forgep;



{/* <View
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
            </View> */}