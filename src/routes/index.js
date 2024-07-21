import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Welcome from '../screens/auth/Welcome'
import Splash from '../screens/auth/Splash'
import Login from '../screens/auth/Login'
import Signup from '../screens/auth/Signup'
import Bio from '../screens/app/Bio'
import Interset from '../screens/app/Interest'
import BottomTabs from './bottomtabs'
import Chat_Sen from '../screens/app/Chat_Sen'
import Profile from '../screens/app/Profile'
import Premium from '../screens/app/Premium'
import Forgep from '../screens/app/Forgep'

const Stack=createNativeStackNavigator()


const Route = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Splash'>
        
    <Stack.Screen
        name='Splash'
        component={Splash}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Login'
        component={Login}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Signup'
        component={Signup}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Bio'
        component={Bio}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='Interset'
        component={Interset}
        options={{headerShown:false}}
        />
          <Stack.Screen
        name='BottomTabs'
        component={BottomTabs}
        options={{headerShown:false}}
        />
          <Stack.Screen
        name='Chat_Sen'
        component={Chat_Sen}
        options={{headerShown:false}}
        />
          <Stack.Screen
        name='Profile'
        component={Profile}
        options={{headerShown:false}}
        />
          <Stack.Screen
        name='Premium'
        component={Premium}
        options={{headerShown:false}}
        />
          <Stack.Screen
        name='Forgep'
        component={Forgep}
        options={{headerShown:false}}
        />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default Route