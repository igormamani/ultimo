import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { MaterialIcons, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import ClinicoGeral from './ClinicoGeralScreen'; 
import Pediatria from './PediatriaScreen'; 
import Ginecologia from './GinecologiaScreen'; 
import Enfermagem from './EnfermagemScreen';
import Odontologia from './OdontologiaScreen';
import Psicologia from './PsicologiaScreen';
import { useUser } from './UserContext';

const AgendamentoScreen = () => {
  const { user } = useUser();
  const [especiabilidade, setEspeciabilidade] = useState('Selecione');
  const [dataAgendamento, setDataAgendamento] = useState('Selecione');
  const [hora, setHora] = useState('Selecione');
  const [idUsuario, setIdUsuario] = useState('');
  const [consultaExistente, setConsultaExistente] = useState(null); 
  const [showSecondSearchBar, setShowSecondSearchBar] = useState(false);

  

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const handleEspecialidadeChange = (itemValue) => {
      setEspeciabilidade(itemValue);
    };

    const response = await fetch(
      `http://indecisos.atwebpages.com/tcc/teste/Existente_app.php?dataAgendamento=${dataAgendamento}&hora=${hora}&especiabilidade=${especiabilidade}`
    );

    if (response.ok) {
      const consulta = await response.json();

      if (!consulta.status) {
        const formData = new FormData();
        formData.append('especiabilidade', especiabilidade);
        formData.append('data_agendamento', dataAgendamento);
        formData.append('hora', hora);
        formData.append('id_usuario', idUsuario);
        console.log('Botão de agendamento clicado');
        console.log('Dados do formulário:', {
          especiabilidade,
          dataAgendamento,
          hora,
          idUsuario,
        });

        try {
          const response = await fetch(
            'http://indecisos.atwebpages.com/tcc/teste/Agendamento_app.php',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            }
          );

          if (response.ok) {
            console.log('Resposta OK: Agendamento realizado com sucesso!');
            console.log('Resposta do servidor:', await response.text());
            navigation.navigate('Validacao', {
              agendamentoData: {
                especiabilidade,
                dataAgendamento,
                hora,
                idUsuario: user.id, 
              },
            });
          } else {
            console.log('Resposta não OK: Falha ao agendar consulta. Tente novamente.');
            console.log('Resposta do servidor:', await response.text());
            alert('Falha ao agendar consulta. Tente novamente.');
          }
        } catch (error) {
          console.error('Erro ao fazer a solicitação:', error);
        }
      } else {
        switch (especiabilidade) {
          case 'Clínico-geral':
            navigation.navigate('ClinicoGeral');
            break;
          case 'Pediatria':
            navigation.navigate('Pediatria');
            break;
          case 'Ginecologia':
            navigation.navigate('Ginecologia');
            break;
          case 'Enfermagem':
            navigation.navigate('Enfermagem');
            break;
          case 'Odontologia':
            navigation.navigate('Odontologia');
            break;
          case 'Psicologia':
            navigation.navigate('Psicologia');
            break;
          default:
            alert('Especialidade não reconhecida. Selecione uma especialidade válida.');
            break;
        }
      }
    } else {
      console.log('Erro ao verificar a consulta existente:', response.statusText);
      alert('Erro ao verificar a consulta existente. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.localContainer}>
        <Text style={styles.localText}>NO LOCAL</Text>
      </View>

       <View style={styles.agendeTextContainer}>
        <Text style={styles.agendeText}>Agende sua consulta</Text>
      </View>

      <View style={styles.novoComponente}>
        <Picker
           selectedValue={especiabilidade}
          onValueChange={(itemValue) => {
            setEspeciabilidade(itemValue);
            setShowSecondSearchBar(itemValue !== 'Selecione');
          }}
        >

          <Picker.Item label="Selecione" value="Selecione" />

          <Picker.Item label="Clínico Geral" value="Clínico-geral" />

          <Picker.Item label="Pediatria" value="Pediatria" />

          <Picker.Item label="Ginecologia" value="Ginecologia" />

          <Picker.Item label="Enfermagem" value="Enfermagem" />

          <Picker.Item label="Odontologia" value="Odontologia" />

          <Picker.Item label="Psicologia" value="Psicologia" />
        </Picker>
      </View>

      {showSecondSearchBar && (
  <View style={styles.novoComponente}>
    <Picker
      selectedValue={dataAgendamento}
      onValueChange={(itemValue) => setDataAgendamento(itemValue)}
    >
      <Picker.Item label="Selecione" value="Selecione" />
      <Picker.Item label="25/12 - Segunda" value="2023-12-25" />
      <Picker.Item label="27/12 - Quarta" value="2023-12-27" />
      <Picker.Item label="29/12 - Sexta" value="2023-12-29" />
    </Picker>
  </View>
)}

{showSecondSearchBar && dataAgendamento && (
  <View style={styles.novoComponente}>
    <Picker
      selectedValue={hora}
      onValueChange={(itemValue) => setHora(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Selecione" value="Selecione" />
      <Picker.Item label="15:00" value="15:00" />
      <Picker.Item label="15:30" value="15:30" />
      <Picker.Item label="16:00" value="16:00" />
      <Picker.Item label="16:30" value="16:30" />
      <Picker.Item label="17:00" value="17:00" />
    </Picker>
  </View>
)}



      {showSecondSearchBar && dataAgendamento && hora && (
  <TouchableOpacity style={styles.confirmarButton} onPress={handleSubmit}>
    <Text style={styles.confirmarButtonText}>Confirmar</Text>
  </TouchableOpacity>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1,
  },
  agendeTextContainer: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
  },
  agendeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  localContainer: {
    width: 113,
    height: 30,
    backgroundColor: '#A5C1DB',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
    left: 4,
  },
  localText: {
    color: 'white',
  },
  novoComponente: {
    width: 356,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
    top: 80,
  },
  confirmarButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#8dc8ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  confirmarButtonText: {
    color: '#27262a',
    fontSize: 18,
  },
});

export default AgendamentoScreen;
