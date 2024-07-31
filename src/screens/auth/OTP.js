import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Appl, Appl_B, Back_Arrow, Face, Goo } from '../../assets/Images';
import OTPTextInput from 'react-native-otp-textinput'
import { Toast } from 'react-native-toast-notifications';

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState('');

    const submit = () => {
        if (otp.length == 4) navigation.navigate('ResetPassword');
        else Toast.show('Failed to receive or verify OTP. Please try again.')
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
                                Verify OTP
                            </Text>
                        </View>
                        <View style={{ width: 10 }}></View>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingTop: '40%'
                    }}>
                        <OTPTextInput
                            tintColor='black'
                            offTintColor='grey'
                            textInputStyle={style.OTPInput}
                            containerStyle={style.OTPContainer}
                            handleTextChange={(code) => setOtp(code)}
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
                            disabled={otp.length == 4 ? false : true}
                            style={{
                                backgroundColor: otp.length == 4 ? '#33E0CF' : '#F3F6F6',
                                padding: 15,
                                alignItems: 'center',
                                borderRadius: 20,
                                width: width * 0.9,
                                alignSelf: 'center',
                            }}>
                            <Text
                                style={{
                                    color: otp.length == 4 ? '#FFF' : '#797C7B',
                                    fontSize: 25,
                                    fontFamily: 'ABeeZee-Italic',
                                }}>
                                Verify OTP
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const { height, width } = Dimensions.get('window');

export default OTPScreen;

const style = StyleSheet.create({
    OTPContainer: {
        marginHorizontal: 60,
    },
    OTPInput: {
        backgroundColor: '#7a2d41',
        color: 'white',
        fontWeight: '700',
        borderWidth: 1,
        borderRadius: 10,
        borderBottomWidth: 1,
        backgroundColor: '#33E0CF'
    }
});