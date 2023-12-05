import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from './UserContext'; 



const ContaScreen = () => {

  const { user } = useUser(); 
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `http://indecisos.atwebpages.com/tcc/teste/Perfil_app.php?id_usuario=${user.id}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.userInfo);
          console.log('Informações do perfil do usuário:', data.userInfo); 
          
        } else {
          setError('Erro ao buscar informações do usuário');
        }
      } catch (error) {
        setError('Erro ao fazer a solicitação');
      }
    };

    fetchUserInfo();
  }, [user.id]); 
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Conta</Text>
        
        <View style={styles.separator} />

        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 


        >


            
           <Text style={styles.dadosPessoaisText}>Dados pessoais</Text>
          <View style={styles.inputGroup}>
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : (
              <>
                {userInfo && typeof userInfo === 'object' && (
                  <TextInput
                    style={styles.input}
                    placeholder={userInfo?.email || ''}
                    placeholderTextColor="#888"
                    borderRadius={10}
                    editable={false} 
                  />
                )}

                <View style={styles.inputGroup}>
                  <View style={styles.phoneNumberContainer}>
                    <Text style={styles.phoneNumberText}>+55</Text>
                  </View>
                </View>

               <TextInput
  style={styles.additionalInput}
  placeholder={userInfo?.telefone || ''}
  placeholderTextColor="#888"
  borderRadius={5}
/>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
        <View style={styles.spaceAfterCard} />
      </ScrollView>
      <View style={styles.spaceAfterCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileText: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 10,
    top:40,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch', 
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  dadosPessoaisText: {
    fontSize: 18,
    marginBottom: 10,
    top:60,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
    top:70,
  },

  input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },

   phoneNumberContainer: {
    height: 50,
    width: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  phoneNumberText: {
    fontSize: 16,
  },
   spaceAfterCard: {
  height: 150, 
},

  additionalInput: {
  height: 50,
    width: 230,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    left:115,
    fontSize:16,
  },
});

export default ContaScreen;
