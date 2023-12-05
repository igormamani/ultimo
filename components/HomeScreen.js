import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
   Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from 'react';
import { useUser } from './UserContext';



const HomeScreen = () => {
  const [searchText, setSearchText] = useState(''); 
  const [formData, setFormData] = useState({ nome: '' });
  const { user, userInfo, setUserInfo } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    if (user) {
      fetch(`http://indecisos.atwebpages.com/tcc/teste/meow2.php?id_usuario=${user.id}`)
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

  const handleSpecialtyPress = (specialtyName) => {
    navigation.navigate('', { specialty: specialtyName });
    setSearchText(specialtyName); 
  };
   const handleSearchBarPress1 = () => {
    navigation.navigate('ClinicoGeral'); 
  };

   const handleSearchBarPress2 = () => {
    navigation.navigate('Ginecologia'); 
  };

   const handleSearchBarPress3 = () => {
    navigation.navigate('Odontologia'); 
  };

   const handleSearchBarPress4 = () => {
    navigation.navigate('Psicologia'); 
  };

   const handleSearchBarPress5 = () => {
    navigation.navigate('Pediatria'); 
  };

   const handleSearchBarPress6 = () => {
    navigation.navigate('Enfermagem'); 
  };

  const handleSaveButtonPress = () => {
    navigation.navigate('ConsultaScreen');
  }

  const handleConsultarButtonPress = () => {
  console.log('Botão de consulta pressionado');
  navigation.navigate('SaveScreen');
};

const handleCompleteProfileButtonPress = () => {
    
    navigation.navigate('PerfilScreen');
  };

const handleSecondButtonPress = () => {
    
    navigation.navigate('PerfilScreen');
  };

  const handleSearchBarPress = () => {
    
    navigation.navigate('AgendamentoScreen');
  };

  const handleCustomGradientCardPress = () => {
    const url = 'https://indecisos.atwebpages.com/tcc/'; 
    Linking.openURL(url);
  };


  return (
    <ScrollView>
      <ScrollView contentContainerStyle={styles.container}>
       <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/172/172802.png', 
          }}
          style={styles.iconImage}
        />

         <TouchableOpacity onPress={handleSecondButtonPress}>
  <FontAwesomeIcon
    name="user-circle"
    size={50}
    color="#00000"
    style={styles.secondIconImage}
  />
</TouchableOpacity>
      <Text style={styles.containerCardTextm}>Olá,</Text>
           <Text style={styles.containerWelcome}>{formData.primeiroNome}</Text>
       <View style={styles.searchBar}>
          <TouchableOpacity
            style={styles.searchInputContainer}
            onPress={handleSearchBarPress}
          >
            <Text style={styles.searchInput}>
              Encontrar especialista ou clínicas
            </Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/482/482631.png',
            }}
            style={styles.searchIcon}
          />
        </View>
          <View style={styles.ret}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <TouchableOpacity
    style={styles.rectangle}
    onPress={handleSearchBarPress1} 
    >
    <Text style={styles.rectangleText}>Clínico Geral</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.rectangle}
   onPress={handleSearchBarPress2} 
  >
    <Text style={styles.rectangleText}>Ginecologista</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.rectangle}
    onPress={handleSearchBarPress3} 
  >
    <Text style={styles.rectangleText}>Odontologia</Text>
  </TouchableOpacity>
</ScrollView>

 <ScrollView horizontal showsHorizontalScrollIndicator={false}>
<TouchableOpacity
    style={styles.rectangle2}
   onPress={handleSearchBarPress4} 
  >
    <Text style={styles.rectangleText}>Psicologia</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.rectangle2}
    onPress={handleSearchBarPress5} 
  >
    <Text style={styles.rectangleText}>Pediatria</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={styles.rectangle2}
    onPress={handleSearchBarPress6} 
  >
    <Text style={styles.rectangleText}>Enfermagem</Text>
  </TouchableOpacity>
</ScrollView>
     </View>

              
        <View style={[styles.containerCard, { height: 428 }]}></View>
        <Text style={styles.containerCardText}>Suas consultas</Text>
        <Text style={styles.additionalText}>
          Acesse rapidamente as suas consultas agendadas.
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImageContainer}>
            <Image
              source={{
                uri:
                  'https://png.pngtree.com/png-vector/20201225/ourlarge/pngtree-online-medical-health-consultation-doctor-vector-illustration-pattern-element-png-image_2608104.jpg',
              }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Suas consultas</Text>
            <Text style={styles.cardText1}>
              Acesse essa página para mais informações da sua consulta.
            </Text>
             <TouchableHighlight
      style={styles.button}
      underlayColor="transparent"
      onPress={handleSaveButtonPress} 
    >
      <Text style={styles.buttonText}>Consultas agendadas</Text>
    </TouchableHighlight>
          </View>
        </View>

        {/* Segundo Card */}
        <View style={[styles.containerCard, { height: 428 }]}>
          <Text style={styles.containerCardText1}>Revisões médicas recomendadas</Text>
          <View style={styles.card2}>
            <View style={styles.cardImageContainer2}>
              <Image
                source={require('../assets/doc.png')}
                style={styles.cardImage2}
              />
              <Text style={styles.cardText2}>
                Em 2023, não se esqueça de cuidar da sua saúde
              </Text>
              <Text style={styles.cardText3}>
                O diagnóstico precoce pode aumentar as chances de sucesso nos
                tratamentos
              </Text>
              <TouchableHighlight
                style={styles.button2}
                underlayColor="transparent"
              onPress={handleConsultarButtonPress}>
                <Text style={styles.buttonText2}>Ver recomendações</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[styles.containerCard, { height: 428 }]}>
            <Text style={styles.containerCardText2}>Seu perfil</Text>
            <View style={styles.card3}>
              <View style={styles.cardImageContainer3}>
                <Image
                  source={require('../assets/login.png')}
                  style={styles.cardImage3}
                />
                <Text style={styles.cardText4}>Complete seu perfil</Text>
                <Text style={styles.cardText5}>As suas informações médicas estarão sempre
disponíveis quando precisar</Text>
               <TouchableHighlight
          style={styles.button3}
          underlayColor="transparent"
          onPress={handleCompleteProfileButtonPress}
        >
          <Text style={styles.buttonText3}>Completar Perfil</Text>
        </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

        

        <View style={styles.spaceAfterCard} />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 200,
  },
  ret:{
    bottom:15,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#0061BA',
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 11,
    shadowColor: '#0061BA',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    elevation: 5,
    marginBottom: 20,
    bottom:20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    top:2,
  },
  searchIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    marginRight: 10,
    left:'90%',
  },

  iconImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 40,
    left: 10,
  },

  secondIconImage: {
    position: 'absolute',
    bottom: 100,
    right: 10,
  },

  rectangle: {
    width: 183,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle2: {
    width: 183,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangleText: {
    fontSize: 18,
    color: '#3A3A3A',
  },
  containerCard: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    
  },
  containerCardText: {
    fontSize: 20,
    position: 'absolute',
    fontWeight: 'bold',
    top: 400,
    left: 20,
  },
  additionalText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    top: 430,
    left: 20,
  },
  card: {
    width: 350,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(0, 97, 186, 0.5)',
    position: 'absolute',
    top: 460,
    left:18,
    marginTop: 10,

  },
  cardImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 90,
    height: 90,
  },
  cardText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  cardText1: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    textAlignVertical: 'center',
  
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
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  card2: {
    width: 350,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(0, 97, 186, 0.5)',
    bottom:15,
    right:16,
  },
  cardImageContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    top:10,
  },
  cardImage2: {
    width: 80,
    height: 80,
  },
  cardText2: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  cardText3: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button2: {
    width: 330,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'center',
  },
  buttonText2: {
    fontSize: 16,
    color: 'black',
  },
  containerCardText1: {
    fontSize: 20,
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 460,
    left: 12,
  },
  card3: {
    width: 350,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 2,
    alignSelf: 'center',
    borderColor: 'rgba(0, 97, 186, 0.5)',
    right: 33,
    top: 60,
  },
  cardImageContainer3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardImage3: {
    width: 140,
    height: 100,
  },
  cardText4: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 10,
  },
  cardText5: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button3: {
    width: 330,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    alignSelf: 'center',
  },
  buttonText3: {
    fontSize: 16,
    color: 'black',
  },
  containerCardText2: {
    fontSize: 20,
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 390,
    left: -8,
  },
 customGradientCard: {
    width: 365,
    height: 207,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    top:190,
    left:1,
    
  },
  customGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
   containerCardText4: {
    fontSize: 20,
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 220,
    left: 10,
  },
  customGradientText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    position: 'absolute',
    top: 20, 
    left: 20, 
  },

  customGradientSubText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'left',
    position: 'absolute',
    top: 68, 
    left: 20, 
  },

  customGradientButton: {
    position: 'absolute',
    bottom: 20, 
    left: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText4: {
    fontSize: 15,
    color: '#FFFFFF',
    marginRight: 8, // Espaço entre o texto e o ícone
  },

  spaceAfterCard: {
  height: 230, // Defina a altura desejada
},

containerCardTextm:{
    top:130,
    fontSize: 28,
    position: 'absolute',
    left: 15,
},

containerWelcome:{
    top:130,
    fontSize: 28,
    position: 'absolute',
    fontWeight: 'bold',
    color: '#2d5b83',
    left: 60,
}
});

export default HomeScreen;