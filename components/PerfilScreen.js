import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect} from 'react';
import { useUser } from './UserContext';

const PerfilScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({ nome: '' });
  const { user, userInfo, setUserInfo } = useUser();



  const handleGoBack = () => {
    navigation.goBack();
  };

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

  const handleNavigateToNameScreen = () => {
    navigation.navigate('NameScreen');
  };

  const handleNavigateToDocScreen = () => {
    navigation.navigate('DocScreen');
  };

  const handleNavigateToEndScreen = () => {
    navigation.navigate('EndScreen');
  };

  const handleNavigateToConfigScreen = () => {
    navigation.navigate('ConfigScreen'); 
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.allComponentsContainer}>
          <Text style={styles.profileText}>Seu perfil</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleGoBack}>
              <MaterialIcons name="close" size={35} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={handleNavigateToConfigScreen}>
        <MaterialIcons name="settings" size={35} color="#000" />
      </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/8188/8188349.png',
            }}
            style={styles.image}
          />

          <Text style={styles.imageText}>{formData.nome}</Text>
          <View style={styles.cardConteiner}>
            <View style={styles.card}>
              <FontAwesome name="user" size={28} color="rgba(0, 0, 0, 0.5)" style={styles.userIcon} />
              <Text style={styles.cardTextInfo}>Informação básica</Text>
              <TouchableOpacity onPress={handleNavigateToNameScreen}>
                <AntDesign name="arrowright" size={40} color="#000" style={styles.cardArrow} />
              </TouchableOpacity>
            </View>

            <View style={styles.card3}>
              <FontAwesome name="user" size={28} color="rgba(0, 0, 0, 0.5)" style={styles.userIcon1} />
              <Text style={styles.cardTextInfo3}>Documentos de Identidade{'\n'}e CNS</Text>
              <TouchableOpacity onPress={handleNavigateToDocScreen}>
                <AntDesign name="arrowright" size={40} color="#000" style={styles.cardArrow1} />
              </TouchableOpacity>
            </View>

            <View style={styles.card4}>
              <FontAwesome name="user" size={28} color="rgba(0, 0, 0, 0.5)" style={styles.userIcon} />
              <Text style={styles.cardTextInfo4}>Endereço</Text>
              <TouchableOpacity onPress={handleNavigateToEndScreen}>
                <AntDesign name="arrowright" size={40} color="#000" style={styles.cardArrow} />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
      <View style={styles.spaceAfterCard} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  allComponentsContainer: {
    flex: 1,
    bottom: 55,
  },
  closeButton: {
    position: 'absolute',
    top: 45,
    right: 320,
    zIndex: 1, 
  },
   profileText: {
    fontSize: 20,
    textAlign: 'center',
    top: 75,
  },
  settingsButton: {
    zIndex: 1,
    top: 45,
    left: 320,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    height: 1, 
    width: '120%',  
    marginHorizontal: '-10%',   
    top: 60, 
  },
  image: {
    width: 110,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
    top: 68,
  },
  imageText: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    top: 70,
  },
   card: {
    width: 365,
    height: 88,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    top: 130,
    right: 10,
  },
  card3: {
    width: 365,
    height: 88,
    borderRadius: 10,
    borderWidth: 1, 
    borderColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    top: 130,
    right: 10,
    marginTop: 30,
  },
  card4: {
    width: 365,
    height: 88,
    borderRadius: 10,
    borderWidth: 1,
   borderColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    top: 130,
    right: 10,
    marginTop: 20,
  },
cardConteiner:{
    flex: 1,
    bottom:8,
},
  spaceAfterCard: {
  height: 150, 
},
   cardTextInfo: {
    fontSize: 19,
    color: '000000',
    fontWeight: 'bold',
    bottom: 10,
    right: '15%',
  },
  cardTextInfo3: {
    fontSize: 19,
    color: '000000',
    fontWeight: 'bold',
    bottom: 1,
    right: '3%',
    },

  cardTextInfo4: {
    fontSize: 19,
    color: '000000',
    fontWeight: 'bold',
    bottom: 10,
    left: '-25%',
  },
  userIcon: {
    width: 36,
    height: 36,
    top: '30%',
    right: 150,
  },

  userIcon1: {
    width: 36,
    height: 36,
    top: '50%',
    right: 150,
  },
  
  cardArrow: {
    marginLeft: 10,
    left:150,
    bottom:'70%',
  },
  cardArrow1: {
    marginLeft: 10,
    left:150,
    bottom:'100%',
  },
});

export default PerfilScreen;
