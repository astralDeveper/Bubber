import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  Modal,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../Api';
import { Back_Arrow } from '../../assets/Images';
import { SocketContext } from '../../context/SocketContext';

const Interset = ({ navigation, route }) => {
  const [addNew, setAddNew] = useState(false);
  const [dToken, setDToken] = useState(false);
  const [selected, setSelected] = useState('Mix');
  const [newInterest, setNewInterest] = useState('');
  const [interests, setInterests] = useState(route?.params?.data ? route?.params?.data : []);

  const { userInfo } = useContext(SocketContext);

  const getinter = async () => {
    try {

      const data = await axios.put(API.USER.GET_INTERESTS, {
        id: userInfo._id
      })
      setSelected(data.data.genderInterest)
      setInterests(prev => [...prev, ...data.data.interests]);
    } catch (error) {

    }
  };

  const fetchData = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        const parsedData = JSON.parse(data);
        const token = parsedData.token;

        setDToken(token)
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };

  useEffect(() => {
    getinter()
    fetchData();
  }, []);

  const handleAddInterest = interest => {
    let a = interests.find(item => item === interest);
    if (a) {
      let b = interests.filter(item => item !== interest);
      setInterests(b);
    } else {
      setInterests(pre => [...pre, interest]);
    }
  };

  const handleNewInterest = () => {
    setInterests(pre => [...pre, newInterest]);
    setNewInterest('');
    setAddNew(!addNew);
  };

  const flattenArray = (arr) => {
    return arr.reduce((flat, item) => {
      return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
  };

  const onAdd = async () => {
    try {
      const flatArray = flattenArray(interests)
      await axios.put(API.USER.Add_Inter, {
        interests: flatArray,
        genderInterest: selected
      }, {
        headers: {
          Authorization: dToken
        }
      });
      navigation.navigate("BottomTabs");
    } catch (error) {

    }
  };
  
  return (
    <SafeAreaView
      style={styles.mainContainer}>
      <ScrollView>
        <View
          style={styles.flex1}>
          {!route?.params?.data ? <TouchableOpacity
            style={{
              margin: 20,
            }}
            onPress={() => navigation.navigate("BottomTabs")}
          >
            <Back_Arrow />
          </TouchableOpacity> :
            <View style={{
              margin: 20
            }} />
          }
          <View
            style={styles.header}>
            <View style={styles.interestLine}></View>
            <View
              style={styles.headerTextView}>
              <View
                style={styles.headerParacontainer}></View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 22,
                  fontFamily: 'ABeeZee-Italic',
                  position: 'absolute',
                  bottom: 5,
                }}>
                Add Your Interests
              </Text>
            </View>
            <View style={{ width: 10 }}></View>
          </View>
          <View
            style={{
              width: width * 0.8,
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
              Add your interests below to connect with like-minded individuals and meet people based on shared interests. If you wish to remove any interests, please click on the tag.
            </Text>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
              data={interests}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleAddInterest(item);
                    }}
                    style={{
                      alignItems: 'center',
                      borderWidth: 2,
                      padding: 2,
                      paddingHorizontal: 15,
                      borderRadius: 20,
                      margin: 5,
                      // backgroundColor: interests.includes(item.title)
                      //   ? '#33E0CF'
                      //   : 'transparent',
                      backgroundColor: '#33E0CF',
                      borderColor: '#33E0CF',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 20,
                      }}>
                      + {item}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setAddNew(!addNew);
              }}
              style={{
                alignItems: 'center',
                borderWidth: 2,
                padding: 2,
                paddingHorizontal: 15,
                borderRadius: 20,
                margin: 5,
                borderColor: '#33E0CF',
                justifyContent: 'center',
                width: width * 0.2,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 2,
              width: width * 0.9,
              backgroundColor: '#33E0CF',
              alignSelf: 'center',
              marginVertical: 40,
            }}></View>
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontFamily: 'ABeeZee-Regular',
                alignSelf: 'center',
              }}>
              select gender to connect with:
            </Text>
          </View>
          <View style={styles.container}>
            <TouchableOpacity
              style={[
                styles.option,
                ,
                selected === 'boys' && styles.selectedOption,
                {
                  borderWidth: selected === 'boys' ? 0 : 2,
                  borderColor: '#3EC8BF',
                },
              ]}
              onPress={() => setSelected('boys')}>
              <Text
                style={[
                  styles.optionText,
                  selected === 'boys' && styles.selectedText,
                ]}>
                BOYS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selected === 'Mix' && styles.selectedOption,
                {
                  borderWidth: selected === 'Mix' ? 0 : 2,
                  borderColor: '#3EC8BF',
                },
              ]}
              onPress={() => setSelected('Mix')}>
              <Text
                style={[
                  styles.optionText,
                  selected === 'Mix' && styles.selectedText,
                ]}>
                Mix
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selected === 'girls' && styles.selectedOption,
                {
                  borderWidth: selected === 'girls' ? 0 : 2,
                  borderColor: '#3EC8BF',
                },
              ]}
              onPress={() => setSelected('girls')}>
              <Text
                style={[
                  styles.optionText,
                  selected === 'girls' && styles.selectedText,
                ]}>
                GIRLS
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate('BottomTabs');
              onAdd()
            }}
            style={{
              backgroundColor: '#33E0CF',
              padding: 15,
              alignItems: 'center',
              borderRadius: 20,
              width: width * 0.9,
              alignSelf: 'center',
              marginVertical: 20,
              // position: 'absolute',
              // bottom: 50,
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 25,
                fontFamily: 'ABeeZee-Italic',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal transparent={true} visible={addNew} animationType="slide">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setAddNew(!addNew);
          }}
          style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              value={newInterest}
              onChangeText={e => {
                setNewInterest(e);
              }}
              style={{
                backgroundColor: '#8e8e8e',
                borderRadius: 10,
                paddingHorizontal: 20,
                color: '#FFF',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                handleNewInterest(),
                  setAddNew(!addNew)
              }}
              style={{
                backgroundColor: '#FFF',
                borderWidth: 2,
                borderColor: '#33E0CF',
                padding: 10,
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 20,
                width: width * 0.2, alignItems: "center"
              }}>
              <Text style={{
                color: "#000", fontSize: 18
              }}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView >
  );
};
const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  flex1: { flex: 1 },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.02,
  },
  interestLine: { width: 10 },
  headerTextView: { width: width * 0.58, },
  headerParacontainer: {
    backgroundColor: '#33E0CF',
    height: height * 0.02,
    width: width * 0.2,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  modalBackground: {
    position: 'absolute',
    marginTop: height * 0.1,
    alignSelf: 'center',
    width: width * 0.9,
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#8e8e8e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  option: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.9,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  container: {
    flexDirection: 'row',
    // backgroundColor: '#F9E8E8', // light pink background
    borderRadius: 10,
    padding: 5,
    width: width * 0.9,
    alignSelf: 'center',
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
  },
  selectedOption: {
    backgroundColor: '#3EC8BF',

    // pink color for selected option
  },
  optionText: {
    color: '#3EC8BF', // black color for unselected text
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFF', // white color for selected text
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
  },
});
export default Interset;



