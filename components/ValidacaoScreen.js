import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Foundation,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';

const ValidacaoScreen = ({ route }) => {
 const { agendamentoData } = route.params;
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [response, setResponse] = useState('');

  
 

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const Spacer = ({ height }) => <View style={{ height }} />;

 useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await fetch(
          `http://indecisos.atwebpages.com/tcc/teste/Validacao_app.php?id_usuario=${user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUserInfo(userData.userInfo);
        } else {
          console.error('Erro ao buscar informações do usuário');
        }
      } catch (error) {
        console.error(
          'Erro ao fazer a solicitação de informações do usuário:',
          error
        );
      }
    };

    fetchUserInfo();
  }, [user.id]);


const handleConfirmarAgendamento = async () => {
  try {
    if (!userInfo) {
      console.error('Erro: userInfo é nulo');
      return;
    }
    console.log('Enviando solicitação para confirmar agendamento...');
    console.log(
      'Dados enviados ao servidor:',
      JSON.stringify({ ...agendamentoData, idUsuario: user.id })
    );

    const response = await fetch(
      'http://indecisos.atwebpages.com/tcc/teste/Validacao_app.php',
      {
        method: 'POST',
          body: JSON.stringify({
            ...agendamentoData,
            idUsuario: user.id,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
    );

    if (response.ok) {
      console.log('Resposta OK: Agendamento realizado com sucesso!');
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);

      try {
        const userInfoResponse = JSON.parse(responseText);
        console.log('Resposta de userInfo:', userInfoResponse);
        if (userInfoResponse && userInfoResponse.userInfo) {
          setUserInfo(userInfoResponse.userInfo);
        } else {
          console.error(
            'Resposta do servidor não contém informações do usuário esperadas.'
          );
        }
      } catch (parseError) {
        console.error(
          'Erro ao fazer o parsing da resposta JSON:',
          parseError
        );
      }

      setResponse('Agendamento realizado com sucesso!');

      navigation.navigate('HomeScreen');
    } else {
      console.log(
        'Resposta não OK: Erro ao agendar consulta. Tente novamente.'
      );
      const responseText = await response.text();
      console.log('Resposta do servidor:', responseText);
      setResponse('Erro ao agendar consulta. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
    setResponse('Erro ao agendar consulta. Tente novamente.');
  }
};

 const doctorMap = {
  'Clínico-geral': 'Dra. Carolina Rodrigues',
  'Enfermagem': 'Dra. Carla',
  'Ginecologia': 'Dr. Daniel',
  'Odontologia': 'Dr. Diogo',
  'Pediatria': 'Dr. Ismael',
  'Psicologia': 'Dr. Antônio',
};

const doctorImageMap = {
    'Clínico-geral': require('../assets/medico1.png'),
    'Enfermagem': require('../assets/medica2.png'),
    'Odontologia': require('../assets/medico6.png'),
    'Ginecologia': require('../assets/medico2.png'),
    'Pediatria': require('../assets/medica3.png'),
    'Psicologia': require('../assets/medico3.png'),
  };



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
            <MaterialIcons name="close" size={35} color="#000" />
          </TouchableOpacity>
          <Text style={styles.profileText}>Validação de Agendamento</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.separator} />

    
        <View style={styles.grayComponent}>
  <Image
  source={doctorImageMap[agendamentoData.especiabilidade]}
  style={styles.image}
/>
<Text style={styles.doctorName}>{doctorMap[agendamentoData.especiabilidade]}</Text>
            <Text style={styles.additionalText}>{agendamentoData.especiabilidade}</Text>
          <View style={styles.calendarContainer}>
    <FontAwesome
      name="calendar"
      size={20}
      color="rgba(0, 0, 0, 0.7)"
      style={styles.calendarIcon}
    />
    <Text style={styles.calendarText}>
      {agendamentoData.dataAgendamento}, {agendamentoData.hora}{'\n'}
      Fuso horário: Brasília
    </Text>
  </View>
          <Spacer height={20} />
          <View style={styles.locationContainer}>
            <Ionicons
              name="location-sharp"
              size={20}
              color="rgba(0, 0, 0, 0.7)"
              style={styles.icon}
            />
            <Text style={styles.text}>Av. da Felicidade, 142 - Vila Alegria, Sao Paulo</Text>
          </View>
          <Spacer height={20} />
          <View style={styles.shieldContainer}>
            <Foundation
              name="shield"
              size={20}
              color="#02b3a0"
              style={styles.shieldIcon}
            />
            <Text style={styles.shieldText}>Agendamento pela CNS</Text>
          </View>
        </View>
        <View style={styles.containerAll}>
          <Text style={styles.outsideText}>Validação de Agendamento</Text>
          <Text style={styles.additionalTextBelow}>Informações pessoais</Text>

         <View style={styles.infoContainer}>
  <View style={styles.rectangleContainer}>
    <Text style={styles.infoText}>Nome Completo</Text>
    <View style={styles.rectangle}>
      <Text style={styles.rectangleText}>{userInfo?.nome || 'N/A'}</Text>
    </View>
  </View>

  <View style={styles.rectangleContainer}>
    <Text style={styles.infoText}>Telefone</Text>
    <View style={styles.rectangle}>
      <Text style={styles.rectangleText}>{userInfo?.telefone || 'N/A'}</Text>
    </View>
  </View>

  <View style={styles.rectangleContainer}>
    <Text style={styles.infoText}>RG</Text>
    <View style={styles.rectangle}>
      <Text style={styles.rectangleText1}>{userInfo?.rg || 'N/A'}</Text>
    </View>
  </View>

  <View style={styles.rectangleContainer}>
    <Text style={styles.infoText}>CPF</Text>
    <View style={styles.rectangle}>
      <Text style={styles.rectangleText1}>{userInfo?.cpf || 'N/A'}</Text>
    </View>
  </View>

  <View style={styles.rectangleContainer}>
    <Text style={styles.infoText}>CNS</Text>
    <View style={styles.rectangle}>
      <Text style={styles.rectangleText2}>{userInfo?.numerocartao || 'N/A'}</Text>
    </View>
  </View>
</View>
        </View>
         <TouchableOpacity 
      style={styles.confirmarButton} 
      onPress={handleConfirmarAgendamento}
    >
      <Text style={styles.confirmarButtonText}>Confirmar Agendamento</Text>
    </TouchableOpacity>
    <View style={styles.spaceAfterCard} />
        <Text style={styles.response}>{response}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  containerAll: {
    bottom: 10,
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
    left: 10,
    zIndex: 1,
  },
  headerRight: {
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginTop: 20,
  },
  grayComponent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f8f9fb',
    position: 'relative',
    height: 210,
  },
  image: {
    width: 45,
    height: 45,
    marginLeft: 15,
    marginTop: 10,
  },
doctorName: {
  fontSize: 16,
  marginLeft: 70, 
  bottom:40,
  fontWeight: 'bold', 
  color: '#27262a', 
},
  additionalText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'rgba(0, 0, 0, 0.5)',
    bottom: 40,
    left: 60,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 5,
    bottom: 20,
  },
  calendarIcon: {
    opacity: 0.7,
  },
  calendarText: {
    fontSize: 16,
    marginLeft: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    marginTop: 5,
    bottom: 25,
  },
  icon: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  shieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 25,
    marginTop: 5,
    bottom: 30,
  },
  shieldIcon: {
    marginRight: 5,
  },
  shieldText: {
    fontSize: 15,
    color: '#02b3a0',
  },
  outsideText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 20,
  },
  additionalTextBelow: {
    fontSize: 18,
    marginLeft: 25,
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 10,
  },
  rectangleContainer: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  rectangle: {
    width: '90%',
    height: 50,
    backgroundColor: '#eeeff3',
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
  },
  rectangleText: {
    color: '#47484c',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
  },
  rectangleText1: {
    color: '#47484c',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
  },
  rectangleText2: {
    color: '#47484c',
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
  },
  confirmarButton: {
  width: '90%',
  height: 50,
  backgroundColor: '#8dc8ff',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  marginVertical: 20, 
},
  confirmarButtonText: {
    color: '#27262a',
    fontSize: 18,
  },
  spaceAfterCard: {
    height: 50,
  },
  response: {
    marginTop: 10,
    textAlign: 'center',
  },
  
});

export default ValidacaoScreen;