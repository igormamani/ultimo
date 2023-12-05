import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, FontAwesome, AntDesign,Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from 'react';
import { useUser } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ConfigScreen = () => {
  const navigation = useNavigation();
  const { user, userInfo, setUserInfo } = useUser();

  const handleLogout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('isAuthenticated'),
        AsyncStorage.removeItem('userToken'),
      ]);

      
    setUserInfo(null);

      console.log("Cleaning up data completed!");
      
     
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao efetuar logout:', error);
    }
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateToConta = () => {
    navigation.navigate('Conta');
  };

  const handleNavigateToTerm = () => {
    navigation.navigate('Term');
  }
  
  const handleNavigateToPref = () => {
    navigation.navigate('Pref');
  };

  const handleNavigateToPoli = () => {
    navigation.navigate('Priv');
  };


  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.profileText}>Configurações</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
          onPress={handleNavigateToConta}
        >
          <View style={styles.iconBelowSeparator}>
            <FontAwesome name="user" size={30} color="rgba(0, 0, 0, 0.5)" />
          </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator}>Conta</Text>
            <AntDesign name="arrowright" size={40} color="#000" style={styles.arrowIcon1} />
          </View>
        </TouchableOpacity>
        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
          onPress={handleNavigateToTerm}
        >
          <View style={styles.iconBelowSeparator}>
            <AntDesign name="filetext1" size={30} color="rgba(0, 0, 0, 0.5)" />
          </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator1}>Termos e Condições</Text>
            <AntDesign name="arrowright" size={40} color="#000" style={styles.arrowIcon1} />
          </View>
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
          onPress={handleNavigateToPref}
        >
          <View style={styles.iconBelowSeparator}>
            <Feather name="target" size={30} color="rgba(0, 0, 0, 0.5)" />
          </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator2}>Preferências</Text>
            <AntDesign name="arrowright" size={40} color="#000" style={styles.arrowIcon1} />
          </View>
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
          onPress={handleNavigateToPoli}
        >
          <View style={styles.iconBelowSeparator}>
            <FontAwesome name="lock" size={30} color="rgba(0, 0, 0, 0.5)" />
          </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator3}>Politica de Privacidade</Text>
            <AntDesign name="arrowright" size={40} color="#000" style={styles.arrowIcon1} />
          </View>
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
           onPress={handleLogout}
        >
          <View style={styles.iconBelowSeparator}>
            <AntDesign name="logout" size={30} color="rgba(0, 0, 0, 0.5)" />
          </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator4}>Sair</Text>
            <AntDesign name="arrowright" size={40} color="#000" style={styles.arrowIcon1} />
          </View>
        </TouchableOpacity>

        <View style={styles.smallSeparator} />

        <TouchableOpacity
          style={styles.iconWithTextBelowSeparator}
        >
          <View style={styles.iconBelowSeparator}>
   <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/330/330430.png',
        }}
      />        
        </View>
          <View style={styles.textArrowContainer}>
            <Text style={styles.textBelowSeparator5}>Idioma</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.spaceAfterCard} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  tinyLogo: {
    width: 30,
    height: 30,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 1,
    width: '100%',
    marginVertical: 20,
  },
  smallSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  iconWithTextBelowSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBelowSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBelowSeparator: {
    fontSize: 19,
    right: '520%',
  },
  textBelowSeparator1: {
    fontSize: 19,
    position: 'absolute',
    right: '280%',
  },
  textBelowSeparator2: {
    fontSize: 19,
    right: '370%',
  },
  textBelowSeparator3: {
    fontSize: 19,
    position: 'absolute',
    right: '240%',
  },
  textBelowSeparator4: {
    fontSize: 19,
    right: '540%',
  },
  textBelowSeparator5: {
    fontSize: 19,
    right: 240,
  },
  textArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  arrowIcon1: {
    marginLeft: 5,
  },
  spaceAfterCard: {
    height: 150,
  },
  profileText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 330,
    zIndex: 1,
  },
});

export default ConfigScreen;
