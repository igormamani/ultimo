import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TouchableHighlight,
} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext';
import AlertComponent from './AlertComponent';


const ConsultaScreen = () => {
  const { user } = useUser();
  const [consultas, setConsultas] = useState([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [consultaToDelete, setConsultaToDelete] = useState(null);
  const [isToastVisible, setToastVisible] = useState(false);


  const toggleMenu = (consultaId) => {
    setMenuVisible(!isMenuVisible);
    setConsultaToDelete(consultaId);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://indecisos.atwebpages.com/tcc/teste/Consulta_app.php?id_usuario=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        setConsultas(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar consultas:', error);
      });
  }, [user.id, consultaToDelete]);

function reloadConsultas() {
  fetch(`http://indecisos.atwebpages.com/tcc/teste/Consulta_app.php?id_usuario=${user.id}`)
    .then((response) => response.json())
    .then((data) => {
      setConsultas(data);
      console.log("Consultas reloaded");
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    })
    .catch((error) => {
      console.error('Erro ao buscar consultas:', error);
    });
}



  const handleDeleteConsulta = (consultaId) => {
    setConsultaToDelete(consultaId);
    setIsDeleteModalVisible(true);
  };

  const confirmDeleteConsulta = () => {
    if (consultaToDelete) {
      fetch(`http://indecisos.atwebpages.com/tcc/view/apagar.php?id=${consultaToDelete}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            reloadConsultas();
            setConsultas((prevConsultas) => prevConsultas.filter((consulta) => consulta.id !== consultaToDelete));
          } else {
            console.error('Erro ao excluir consulta');
          }

          setConsultaToDelete(null);
          setMenuVisible(false);
        })
        .catch((error) => {
          console.error('Erro ao excluir consulta:', error);
          setConsultaToDelete(null);
          setMenuVisible(false);
        });
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Consultas</Text>
        <View style={styles.separator} />
        <View style={styles.containerT}>
          <Text style={styles.salvoText}>Consultas</Text>
          <TouchableOpacity style={styles.specialtiesButton} onPress={() => {}}>
            <Text style={styles.specialtiesButtonText}>Especialidades</Text>
          </TouchableOpacity>
        </View>

        {consultas.length > 0 ? (
          <View style={styles.cardContainer}>
            {consultas.map((consulta, index) => (
              <View key={index} style={styles.card1}>
                <TouchableOpacity onPress={() => toggleMenu(consulta.id)}>
                  <Entypo name="dots-three-horizontal" size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.cardContent1}>
                  <Text style={styles.cardTitle}>Consulta Médica</Text>
                  <Text style={styles.cardInfo}>
                  <Text>Hora: {consulta.hora}</Text>{"\n"}
                   <Text>Especialidade:{` ${consulta.especialidade}`}</Text>{"\n"}
                    <Text>Médico: {` ${consulta.medico}`}</Text>{"\n"}
                    <Text>Data: {consulta.data_agendamento}</Text>{"\n"}
                    <Text>Dia da Semana: {consulta.diaSemana}</Text>{"\n"}      
                    <Text>Local: Av. da Felicidade, 142 - Vila Alegria, Sao Paulo</Text>{"\n"}
                  </Text>
                </View>
              </View>
            ))}
            <Modal visible={isMenuVisible} transparent animationType="fade">
              <TouchableWithoutFeedback onPress={() => closeMenu()}>
                <View style={styles.modalContainer}>
                  <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={confirmDeleteConsulta}>
                      <Text>Excluir consulta</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        ) : (
          <View style={styles.card}>
            <Image
               source = {require('../assets/cora.png')}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Agende a próxima consulta</Text>
              <Text style={styles.cardText1}>
                Prevenção é essencial para uma{"\n"}boa saúde. Cuide-se e agende uma{"\n"}consulta com os melhores especialistas
              </Text>
              <TouchableHighlight
  style={styles.button}
  underlayColor="transparent"
  onPress={() => navigation.navigate('AgendamentoScreen')} 
>
  <Text style={styles.buttonText}>Agende sua consulta</Text>
</TouchableHighlight>

            </View>
          </View>
        )}
        {isToastVisible && <AlertComponent message="Consultas recarregadas com sucesso!" />}

      </View>
            <View style={styles.spaceAfterCard} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
    top: 70,
  },
  salvoText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'left',
    top: 40,
    left: 8,
  },
  specialtiesButton: {
    width: 120,
    height: 30,
    backgroundColor: 'rgba(0, 97, 186, 0.12)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0061BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    top: 30,
    left: 5,
  },
  profileText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    top: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  spaceAfterCard: {
    height: 70,
  },
  separator: {
    width: '120%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  specialtiesButtonText: {
    fontSize: 16,
    color: '#0061BA',
    fontWeight: 'bold',
  },
  containerT: {
    right: 10,
    top:20,
  },
  card: {
    width: 350,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(0, 97, 186, 0.5)',
    
    marginTop: 5,
    top: 70,
    
  },
  cardImage: {
    width: 100,
    height: 100,
    marginTop: 5,
    left: 240,
    top: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
  cardText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    position:'relative',
    marginTop: 10,
    bottom: '60%',
    right:'16%',
  },
  cardText1: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left',
    bottom: '40%',
    right: '8%',
  },
  button: {
    width: 330,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    bottom: 40,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  card1: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0061BA',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'left',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    bottom: 60,
    left: 70,
  },
  
});

export default ConsultaScreen;
