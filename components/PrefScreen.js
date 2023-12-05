import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrefScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const openPhoneNotificationSettings = () => {
  try {
    Linking.openSettings();
  } catch (error) {
    console.error('Error opening settings:', error);
  }
};

  

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Preferências</Text>
        <View style={styles.headerRight} />
        <View style={styles.separator} />
        <TouchableOpacity onPress={openPhoneNotificationSettings}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <AntDesign name="arrowright" size={40} color="#000" style={styles.notificationIcon} />
        </TouchableOpacity>
        <View style={styles.separator1} />
        <View style={styles.spaceAfterCard} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    top: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  headerRight: {
    position: 'absolute',
    top: 40,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  sectionTitle: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    top:80,
  },
  notificationIcon: {
    position: 'absolute',
    top: 80,
    right: 20,
  },

  separator1: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 170,
  },
  spaceAfterCard: {
  height: 150, 
},
});

export default PrefScreen;
