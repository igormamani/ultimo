import React from 'react';
import { Alert } from 'react-native';

const AlertComponent = ({ message }) => {
  const showAlert = () => {
    Alert.alert(
      'Success alert!',
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return showAlert();
};

export default AlertComponent;
