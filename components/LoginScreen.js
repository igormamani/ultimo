// FRONTEND LOGINSCREEN
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });



  const [logoTop, setLogoTop] = useState(10);
  const goToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = async () => {
    console.log('Botão de login clicado');
    console.log('formData:', formData);

    const camposObrigatorios = ['email', 'senha'];
    const campoVazio = camposObrigatorios.find((campo) => !formData[campo]);

    if (campoVazio) {
      Alert.alert('Erro', `O campo ${campoVazio} é obrigatório.`);
      return;
    }

    try {
      const response = await fetch('http://indecisos.atwebpages.com/tcc/teste/Login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (data.status === 'success') {
        setUser(data.user);
        Alert.alert('Sucesso', 'Login bem-sucedido');
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingTop: logoTop }, 
      ]}
      keyboardShouldPersistTaps="handled" 
    >
      <Image
        source = {require('../assets/iconhd.png')}
        style={styles.logo}
      />
      <Text style={styles.centerText}>MedConnect</Text>
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              value={formData.email}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              placeholder="Digite sua senha"
              onChangeText={(text) => setFormData({ ...formData, senha: text })}
              value={formData.senha}
              secureTextEntry={true}
            />
          </View>
          <Text style={styles.forgotPassword} onPress={goToForgotPassword}>
            Esqueceu sua senha?
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
         <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem uma conta? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Register')}>
          Cadastre-se
        </Text>
      </View>
      </View>

     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
   centerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2d5b83',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginTop: 10,
    top:'20%',
  },

  logo: {
    width: 200,
    height: 200,
     top:'20%',
  },
  contentContainer: {
    width: '100%',
    top:150,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 10,
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
  loginButton: {
    backgroundColor: '#8dc8ff',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
  },
  loginButtonText: {
    color: '#27262a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 2,
    color: '#4386fd',
    fontSize: 16,
    textAlign: 'left',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 24,
  },
  signupText: {
    fontSize: 19,
    color: '#434343',
  },
  signupLink: {
    fontSize: 19,
    color: '#4386fd',
    fontWeight: 'bold',
  },
  
});
