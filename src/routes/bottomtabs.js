import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Chat_Sc from '../screens/app/Chat_Sc';
import {BottomTabsIcons} from '../screens/Dummy';
import {Sugest} from '../assets/Images';
import Suggestion from '../screens/app/Suggest';
import Message from '../screens/app/Chat_Sc';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'space-around',
        padding: 12,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key} // Added key prop for each TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{alignItems: 'center'}} // Center align the icon and text
          >
            {BottomTabsIcons(isFocused ? '#24786D' : '#797C7B')[index]}
            <Text
              style={{color: isFocused ? '#24786D' : '#797C7B', marginTop: 5}}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Message">
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Suggestion" component={Suggestion} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
