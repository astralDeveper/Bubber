import React from 'react';
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import Route from './src/routes';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-svg';


export const ToastMessage = (message: string) => {
  const toast = useToast();
  toast.hideAll()
  toast.show(message);
};




function App(): React.JSX.Element {
  return (
    <ToastProvider
      placement="top"
      duration={5000}
      animationType='slide-in'
      animationDuration={250}
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="#3EC8BF"
      textStyle={{ fontSize: 15 }}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}
      style={{
        borderRadius: 10,
        borderLeftWidth:12,
        borderLeftColor:'grey'
      }}
    >
      < Route />
    </ToastProvider>
  );
}


const styles = StyleSheet.create({
  toast: {
    width: 300,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: 'red',
  },
  warning: {
    backgroundColor: 'orange',
  },
  normal: {
    backgroundColor: 'gray',
  },
  custom_toast: {
    backgroundColor: 'blue',
  },
  text1: {
    color: 'white',
    fontWeight: 'bold',
  },
  text2: {
    color: 'lightgrey',
  },
});



export default App;
