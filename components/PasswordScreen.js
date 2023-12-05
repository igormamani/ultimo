import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Modal,
} from 'react-native';
import {
  MaterialIcons,
 
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); 

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    const { recoveryKey } = route.params;
    if (!newPassword || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, insira a nova senha e a confirmação de senha.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://indecisos.atwebpages.com/tcc/teste/Atualizar_senha.php', {
        method: 'POST',
        body: JSON.stringify({ recoveryKey, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      Alert.alert('Erro', 'Algo deu errado. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Recuperar senha</Text>
        <View style={styles.headerRight}></View>
        <View style={styles.separator} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha Nova</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua nova senha"
            placeholderTextColor="#888"
            secureTextEntry={true}
            borderRadius={10}
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme a senha"
            placeholderTextColor="#888"
            secureTextEntry={true}
            borderRadius={10}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={handleResetPassword}>
          <Text style={styles.updateButtonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    left: 5,
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
    width: '120%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  contentContainer: {
    width: '100%',
    top: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 16,
    color: '#434343',
    textAlign: 'left',
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#468FCD',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PasswordScreen;
