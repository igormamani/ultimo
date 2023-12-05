import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';



const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [step, setStep] = useState(1);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStepIndicators = () => {
    const indicators = [];
    for (let i = 0; i < step; i++) {
      indicators.push(<View key={i} style={styles.stepIndicator} />);
    }
    return (
      <View style={styles.stepIndicatorsContainer}>{indicators}</View>
    );
  };

  const Spacer = ({ width }) => <View style={{ width }} />;

  const Spacer1 = ({ height }) => <View style={{ height }} />;

  const [selectedGender, setSelectedGender] = useState('masculino');

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cpf: '',
    rg: '',
    numerocartao: '',
    nomemae: '',
    data_nascimento: '',
    cidade: '',
    estado: '',
    endereco: '',
    genero: '',
  });

const handleInputChange = (fieldName, value) => {
  if (fieldName === 'data_nascimento') {
    const formattedDate = value
      .replace(/\D/g, '') 
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'); 

    setFormData({ ...formData, [fieldName]: formattedDate });
  } else {
    setFormData({ ...formData, [fieldName]: value });
  }
};
  const handleRegister = async () => {
    const camposObrigatorios = [
      'nome',
      'email',
      'senha',
      'telefone',
      'cpf',
      'rg',
      'numerocartao',
      'nomemae',
      'data_nascimento',
      'cidade',
      'estado',
      'endereco',
      'genero'
    ];
    const campoVazio = camposObrigatorios.find((campo) => !formData[campo]);

    if (campoVazio) {
      Alert.alert('Erro', `O campo ${campoVazio} é obrigatório.`);
      return;
    }

    console.log(
      'Enviando solicitação para o servidor:',
      JSON.stringify(formData)
    );

    try {
      const response = await fetch('http://indecisos.atwebpages.com/tcc/teste/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (data.status === 'success') {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
       
      } else {
        Alert.alert('Erro', data.message);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Cadastre-se</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.separator} />
      <View style={styles.containerAll}>
        <Animatable.Text animation="fadeIn" style={styles.signupText}>
          CRIE SUA CONTA JÁ
        </Animatable.Text>
        {renderStepIndicators()}

        {step === 1 && (
          <Animatable.View animation="fadeIn" style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu nome completo"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('nome', text)}
                value={formData.nome}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('email', text)}
                value={formData.email}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('senha', text)}
                value={formData.senha}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu telefone"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('telefone', text)}
                value={formData.telefone}
                keyboardType="phone-pad"
              />
            </View>
            <Spacer1 height={25} />
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}

        {step === 2 && (
          <Animatable.View animation="fadeIn" style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('cpf', text)}
                value={formData.cpf}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>RG</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu RG"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('rg', text)}
                value={formData.rg}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Número do Cartão do SUS</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o número do seu cartão do SUS"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('numerocartao', text)}
                value={formData.numerocartao}
                keyboardType="numeric"
              />
            </View>
            
             <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gênero</Text>
            <Picker
        style={styles.input}
        selectedValue={formData.genero}
        onValueChange={(itemValue) => handleInputChange('genero', itemValue)}>
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Feminino" value="feminino" />
      </Picker>

          </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome Completo da Mãe</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome completo da sua mãe"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('nomemae', text)}
                value={formData.nomemae}
              />
            </View>


            <Spacer1 height={25} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={prevStep}>
                <Text style={styles.buttonText}>Anterior</Text>
              </TouchableOpacity>
              <Spacer width={20} />
              <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>Próximo</Text>
              </TouchableOpacity>
            </View>
             
          </Animatable.View>
        )}

        {step === 3 && (
          <Animatable.View animation="fadeIn" style={styles.stepContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Data de Nascimento</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua data de nascimento"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) =>
                  handleInputChange('data_nascimento', text)
                }
                value={formData.data_nascimento}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Cidade</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua Cidade"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('cidade', text)}
                value={formData.cidade}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Estado</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu estado"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('estado', text)}
                value={formData.estado}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Endereço</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu endereço"
                placeholderTextColor="#888"
                borderRadius={10}
                onChangeText={(text) => handleInputChange('endereco', text)}
                value={formData.endereco}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setAcceptTerms(!acceptTerms)}
              >
                {acceptTerms ? (
                  <AntDesign name="checkcircle" size={24} color="#468FCD" />
                ) : (
                  <AntDesign name="checkcircleo" size={24} color="#aaa" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                Eu li e concordo com os{' '}
                <Text
                  style={{
                    color: '#468FCD',
                    textDecorationLine: 'underline',
                  }}
                  onPress={toggleModal}
                >
                  termos de uso
                </Text>
                .
              </Text>
            </View>

            <Spacer1 height={20} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={prevStep}>
                <Text style={styles.buttonText}>Anterior</Text>
              </TouchableOpacity>

              <Spacer width={20} />

              <TouchableOpacity
                style={
                  acceptTerms
                    ? styles.button1
                    : [styles.button1, { opacity: 0.5 }]
                }
                onPress={handleRegister}
                disabled={!acceptTerms}
              >
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={toggleModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalHeader}>Termos de Serviço</Text>
                  <Text style={styles.modalText}>
  Para mais informações acesse nosso site.
</Text>

<Pressable style={styles.modalClose} onPress={toggleModal}>
  <Text style={styles.modalCloseText}>Close</Text>
</Pressable>
                </View>
              </View>
            </Modal>
          </Animatable.View>
        )}
        <TouchableOpacity
          style={styles.loginTextContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <Text style={styles.loginLink}>Faça login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.spaceAfterCard} />
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
  containerAll: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  profileText: {
    fontSize: 18,
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 200,
    zIndex: 1,
  },
  headerRight: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: '120%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 20,
  },
  stepIndicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
  },
  stepIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    margin: 5,
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60,
  },
  stepContainer: {
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  button: {
    backgroundColor: '#8dc8ff',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#92DF92',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 10,
  },
  buttonText: {
    color: '#27262a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginTextContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 20,
  marginBottom: 20, 
},
  loginText: {
    fontSize: 19,
    color: '#000',
  },
  loginLink: {
    fontSize: 19,
    color: '#468FCD',
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#434343',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalCloseText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  spaceAfterCard: {
    height:50,
  },
});

export default RegisterScreen;
