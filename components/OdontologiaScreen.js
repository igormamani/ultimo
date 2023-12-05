import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useUser } from './UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const OdontologiaScreen = () => {
  const { user } = useUser();
  const [especialidade, setEspecialidade] = useState('Selecione');
  const [dataAgendamento, setDataAgendamento] = useState('Selecione');
  const [hora, setHora] = useState('Selecione');
  const [idUsuario, setIdUsuario] = useState('');
  

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const checkAvailability = async () => {
    if (especialidade === 'Selecione' || dataAgendamento === 'Selecione' || hora === 'Selecione') {
      return false;
    }

    const url = `http://indecisos.atwebpages.com/tcc/teste/Existente_app.php?dataAgendamento=${dataAgendamento}&hora=${hora}&especiabilidade=${especialidade}`;
    const response = await fetch(url, {
      method: 'GET',
    });

    if (response.ok) {
      const consulta = await response.json();

      if (consulta.status === false) {
        return true;
      }
    }

    return false;
  };

      const Spacer = ({ height }) => <View style={{ height }} />;


  const handleSubmit = async () => {
    const isAvailable = await checkAvailability();

    if (isAvailable) {
      const formData = new FormData();
      formData.append('especiabilidade', especialidade);
      formData.append('data_agendamento', dataAgendamento);
      formData.append('hora', hora);
      formData.append('id_usuario', user.id);

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
    especiabilidade: especialidade,
    dataAgendamento,
    hora,
    idUsuario: user.id,
  },
});
        } else {
          console.log('Resposta não OK: Falha ao agendar consulta. Tente novamente.');
          console.log('Resposta do servidor:', await response.text());
          Alert.alert('Falha ao agendar consulta', 'Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao fazer a solicitação:', error);
      }
    } else {
      Alert.alert('Consulta Ocupada', 'A consulta já está agendada para esta data, hora e especialidade.');
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
     <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Odontologia</Text>
        <View style={styles.headerRight}></View>
        <View style={styles.separator} />
    <View style={styles.containerAll}>
      <Text style={styles.header}>Página de Agendamento - Odontologia</Text>
                <Spacer height={30} />

      <View style={styles.form}>
        <Text style={styles.label}>Especialidade:</Text>
        <Picker
          selectedValue={especialidade}
          onValueChange={(itemValue) => setEspecialidade(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="Selecione" />
          <Picker.Item label="Odontologia" value="Odontologia" />
        </Picker>

        <Text style={styles.label}>Data do Agendamento:</Text>
        <Picker
          selectedValue={dataAgendamento}
          onValueChange={(itemValue) => setDataAgendamento(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione" value="Selecione" />
          <Picker.Item label="25/12 - Segunda" value="2023-12-25" />
          <Picker.Item label="27/12 - Quarta" value="2023-12-27" />
          <Picker.Item label="29/12 - Sexta" value="2023-12-29" />
        </Picker>

        <Text style={styles.label}>Hora:</Text>
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

        <TextInput
          type="hidden"
          name="id_usuario"
          value={idUsuario}
          onChangeText={(text) => setIdUsuario(text)}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Agendar</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: '120%', // Set to 100% to extend across the entire screen
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  containerAll: {
    width: '100%',
    top: 80,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#434343',
    textAlign: 'left',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#8dc8ff',
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19,
  },
  submitButtonText: {
    color: '#27262a',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OdontologiaScreen;