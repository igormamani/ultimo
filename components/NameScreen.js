import React, { useEffect, useState } from 'react';
import { View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo   } from '@expo/vector-icons';
import { useUser } from './UserContext'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Alert } from 'react-native';


const NameScreen = ({ navigation }) => {
  
  const { user, userInfo, setUserInfo } = useUser();
  const [modalVisibleGender, setModalVisibleGender] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    senha: '',
    telefone: '',
    cpf: '',
    rg: '',
    numerocartao: '',
    nomemae: '',
    genero: 'masculino',
    data_nascimento: '',
    cidade: '',
    estado: '',
    endereco: '',
  });
  const [editingMode, setEditingMode] = useState(false);
  const [editedField, setEditedField] = useState('');
  
  

 

  useEffect(() => {
    if (user) {
      fetch(`http://indecisos.atwebpages.com/tcc/teste/meow.php?id_usuario=${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.userInfo) {
            setFormData(data.userInfo);
            console.log('Informações do GET:', data.userInfo);
          } else {
            console.error('Dados do usuário não encontrados');
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error);
        });
    }
  }, [user]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSelectGender = () => {
    setModalVisibleGender(true);
  };

  const handleSelectDate = () => {
    setShowDatePicker(true);
  };

  const handleCloseModal = () => {
    setModalVisibleGender(false);
    setShowDatePicker(false);
  };

  const handleGenderSelection = (selectedGender) => {
    setFormData({
      ...formData,
      genero: selectedGender,
    });
    handleCloseModal();
  };

  const handleEdit = (field) => {
    setEditingMode(!editingMode);
    setEditedField(field);
  };
const formatInputDateBrazilian = (inputDate) => {
  const date = new Date(inputDate);
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {

  const formattedDate = formatInputDateBrazilian(formData.data_nascimento);
  
    fetch('http://indecisos.atwebpages.com/tcc/teste/meow.php', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, id: user.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUserInfo(formData);
          setEditingMode(false);
          setEditedField('');
          console.log('Dados atualizados com sucesso');
          Alert.alert('Sucesso', 'Os dados foram salvos com sucesso!');
        } else {
          console.error('Erro na atualização dos dados:', data.message);
          Alert.alert('Erro', `Erro na atualização dos dados: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        Alert.alert('Erro', `Erro na requisição: ${error.message}`);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
        <MaterialIcons name="close" size={35} color="#000" />
      </TouchableOpacity>
      <Text style={styles.profileText}>Seu Perfil</Text>
      <View style={styles.headerRight}>
       <TouchableOpacity onPress={handleFormSubmit} style={styles.saveButton}>
  <Text style={styles.saveText}>
    Salvar
  </Text>
</TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>
          Perfil completo em{' '}
          <Text style={styles.progressPercentage}>100%</Text>
          {' '}
        </Text>
      </View>
      <View style={styles.separator2} />
      <View style={styles.infoContainer}>
        <MaterialIcons name="person" size={30} color="#000" style={styles.infoUserIcon} />
        <Text style={styles.infoText}>Informação básica</Text>
      </View>
      <View style={styles.infoDescription}>
        <Text style={styles.infoDescriptionText}>
          Adicione as suas informações básicas para que possamos personalizar sua experiência
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardHeaderText}>Nome</Text>
              {editingMode && editedField === 'nome' ? (
                <TextInput
                  style={styles.cardText}
                  value={formData.nome}
                  onChangeText={(text) => handleInputChange('nome', text)}
                />
              ) : (
                <Text style={styles.cardText}>{formData.nome}</Text>
              )}
            </View>
            <TouchableOpacity
  style={styles.selectButton}
  onPress={() => handleEdit('nome')}
>
  <Text style={styles.selectButtonText}>
    Editar
  </Text>
</TouchableOpacity>
          </View>
        </View>
        
         <View style={styles.card}>
  <View style={styles.cardContent}>
    <View style={styles.cardLeft}>
      <Text style={styles.cardHeaderText}>Gênero</Text>
      {editingMode && editedField === 'genero' ? (
        <TouchableOpacity onPress={handleSelectGender}>
          <Text style={styles.cardText}>{formData.genero}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.cardText}>{formData.genero}</Text>
      )}
    </View>
    <TouchableOpacity
      style={styles.selectButton}
      onPress={() => handleSelectGender()} 
    >
      <Text style={styles.selectButtonText}>
        Selecionar
      </Text>
    </TouchableOpacity>
  </View>
</View>

      <View style={styles.card}>
  <View style={styles.cardContent}>
    <View style={styles.cardLeft}>
      <Text style={styles.cardHeaderText}>Data de Nascimento</Text>
      {editingMode && editedField === 'data_nascimento' ? (
         <TextInput
          type="date"
          name="data_nascimento"
          value={formData.data_nascimento}
          onChangeText={(text) => handleInputChange('data_nascimento', text)}
        />
      ) : (
        <Text style={styles.cardText}>
         {(formData.data_nascimento)}
        </Text>
      )}
    </View>
    <TouchableOpacity
      style={styles.selectButton}
      onPress={() => handleEdit('data_nascimento')}
    >
      <Text style={styles.selectButtonText}>Editar</Text>
    </TouchableOpacity>
  </View>
</View>


        <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisibleGender}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeModalButton}>
              <MaterialIcons name="close" size={30} color="#00000" />
            </TouchableOpacity>

            <Text style={styles.modalText}>Gênero</Text>

            <Text style={styles.modalSubtitle}>Escolha uma das opções</Text>

            <TouchableOpacity onPress={() => handleGenderSelection('masculino')}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Masculino</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.separatorLine}></View>

            <TouchableOpacity onPress={() => handleGenderSelection('feminino')}>
              <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Feminino</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      
      </View>
      
    </View>
            <View style={styles.spaceAfterCard} />

    </ScrollView>
    </KeyboardAvoidingView>
     
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    left: 160,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
headerRight: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 10,
  marginTop: 20, 
},
saveButton: {
  marginLeft: 'auto', 
},
  saveText: {
    fontSize: 18,
    color: '#0061BA',
    top: 9,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  progressTextContainer: {
    top: 60,
    paddingLeft: 10,
  },
  progressText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    flexDirection: 'row',
  },
  progressPercentage: {
    color: '#0061BA',
  },
  separator2: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 165,
  },
 infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    top: 170,
  },
  infoUserIcon: {
    marginRight: 10,
    bottom: 72,
  },
  infoText: {
    fontSize: 18,
    color: '#000',
    bottom: 70,
  },
  infoDescription: {
    paddingLeft: 10,
    top: 110,
  },
  infoDescriptionText: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    bottom: 10,
    paddingLeft: 5,
  },
cardContainer: {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 110, // Ajuste esta propriedade para mover os cards mais para baixo
},
  card: {
    width: 360,
    borderRadius: 10,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    flexDirection: 'column',
  },
  cardHeaderText: {
    fontSize: 14,
    color: '#0061BA',
    left: 10,
    bottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    left: 10,
  },
  selectButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
   spaceAfterCard: {
    height:190,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#0061BA',
  },

   modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    height: '40%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalSubtitle: {
  fontSize: 16, 
  marginBottom: 10,
  color: '#333', 
},
 optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: 10,
  },
  calendario: {
    position: 'absolute',
    top: '40%',
    right: '65%', 
  },
   closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default NameScreen;