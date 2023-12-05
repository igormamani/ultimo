import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  MaterialIcons,
} from '@expo/vector-icons';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [numerocartao, setNumeroCartao] = useState('');
  const [message, setMessage] = useState('');
  const [recoveryKey, setRecoveryKey] = useState(null);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(
    false
  );

  const handleRecoverPassword = async () => {
    if (!email || !cpf || !numerocartao) {
      setMessage('Por favor, insira um email, CPF e CNS válidos.');
      return;
    }

    try {
      const response = await fetch(
        'http://indecisos.atwebpages.com/tcc/teste/Recuperar_senha.php',
        {
          method: 'POST',
          body: JSON.stringify({ email, cpf, numerocartao }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setRecoveryKey(data.recoveryKey);

        setMessage('Deseja recuperar sua senha?');

        setIsConfirmationModalVisible(true);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);

      setMessage('Algo deu errado. Por favor, tente novamente mais tarde.');
    }
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
  };

  const confirmResetPassword = () => {
    closeConfirmationModal();

    navigation.navigate('Password', { recoveryKey });
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
        <Text style={styles.title}>Recuperação de Senha</Text>
        <Text style={styles.description}>
          Digite seu e-mail, CPF e CNS para recuperar sua senha.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#888"
            borderRadius={10}
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CPF"
            placeholderTextColor="#888"
            borderRadius={10}
            onChangeText={(text) => setCpf(text)}
            value={cpf}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CNS</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu CNS"
            placeholderTextColor="#888"
            borderRadius={10}
            onChangeText={(text) => setNumeroCartao(text)}
            value={numerocartao}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleRecoverPassword}
        >
          <Text style={styles.submitButtonText}>Recuperar Senha</Text>
        </TouchableOpacity>
        <Text style={styles.message}>{message}</Text>
         <Text style={styles.backToLogin}>
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Lembrou sua senha? Faça Login aqui 
          </Text>
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isConfirmationModalVisible}
          onRequestClose={closeConfirmationModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Recuperar Senha</Text>
              <Text style={styles.modalMessage}>
                Deseja recuperar sua senha?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={confirmResetPassword}
                >
                  <Text style={styles.modalButtonText}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={closeConfirmationModal}
                >
                  <Text style={styles.modalButtonText}>Não</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
  description: {
    fontSize: 16,
    color: '#444',
    marginTop: 10,
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
  submitButton: {
    backgroundColor: '#468FCD',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 17,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: 'blue',
    textAlign: 'center',
    marginBottom: 10,
  },
  backToLogin: {
    fontSize: 16,
    color: '#434343',
    marginTop: 20,
    textAlign: 'center',
  },
  loginLink: {
    color: '#468FCD',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
});

export default ForgotPasswordScreen;
