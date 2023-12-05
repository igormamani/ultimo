import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useUser } from './UserContext';

const DocScreen = ({ navigation }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    rg: '',
    cpf: '',
    numerocartao: '',
  });
  const [editingMode, setEditingMode] = useState(false);
  const [editedField, setEditedField] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch data from the backend
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

  const handleEdit = (field) => {
    setEditingMode(!editingMode);
    setEditedField(field);
    setModalVisible(true);
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Send data to the backend
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

    setEditingMode(false);
    setEditedField('');
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
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
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              Perfil completo em <Text style={styles.progressPercentage}>100%</Text>
              {' '}
            </Text>
          </View>
          <View style={styles.separator2} />
          <View style={styles.infoContainer}>
            <AntDesign name="idcard" size={30} color="#000" style={styles.infoUserIcon} />
            <Text style={styles.infoText}>Documento de identidade e carterinha</Text>
          </View>
          <View style={styles.infoDescription}>
            <Text style={styles.infoDescriptionText}>
              Você possui carterinha? Adicione aqui as informações e tenha-as sempre à mão!
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardHeaderText}>RG</Text>
                  {editingMode && editedField === 'rg' ? (
                    <TextInput
                      style={styles.cardText}
                      value={formData.rg}
                      onChangeText={(text) => handleInputChange('rg', text)}
                    />
                  ) : (
                    <Text style={styles.cardText}>{formData.rg}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleEdit('rg')}
                >
                  <Text style={styles.selectButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardHeaderText}>CPF</Text>
                  {editingMode && editedField === 'cpf' ? (
                    <TextInput
                      style={styles.cardText}
                      value={formData.cpf}
                      onChangeText={(text) => handleInputChange('cpf', text)}
                    />
                  ) : (
                    <Text style={styles.cardText}>{formData.cpf}</Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleEdit('cpf')}
                >
                  <Text style={styles.selectButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardHeaderText}>CNS</Text>
                  {editingMode && editedField === 'numerocartao' ? (
                    <TextInput
                      style={styles.cardText}
                      value={formData.numerocartao}
                      onChangeText={(text) => handleInputChange('numerocartao', text)} 
                    />
                  ) : (
                    <Text style={styles.cardText}>{formData.numerocartao}</Text> 
                  )}
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => handleEdit('numerocartao')} 
                >
                  <Text style={styles.selectButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
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
});

export default DocScreen;
