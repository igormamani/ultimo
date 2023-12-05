import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomCard = ({ title, description }) => {
   const handleCli = () => {
    navigation.navigate('AgendamentoScreen'); 
  };
   const navigation = useNavigation();
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <TouchableOpacity style={styles.readMoreButton} onPress={handleCli}
          >
          <Text style={styles.readMoreButtonText}>Encontrar especialista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SaveScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Recomendações</Text>
        <View style={styles.headerRight}></View>
        <View style={styles.separator} />
        <View style={styles.containerT}>
          <Text style={styles.salvoText}>Recomendações</Text>
          <TouchableOpacity
            style={styles.specialtiesButton}
            onPress={() => {

            }}
          >
            <Text style={styles.specialtiesButtonText}>Especialidades</Text>
          </TouchableOpacity>
        </View>
        <CustomCard
          title="Visite um Clínico geral"
          description="A Organização Mundial de Saúde (OMS) recomenda revisões anuais para a detecção e tratamento precoce de problemas de saúde."
        />
        <CustomCard
          title="Visite um dentista"
          description="A limpeza periódica dos dentes previne doenças gengivais e reduz as chances de um ataque cardíaco."
        />

         <Text style={styles.additionalText}>
          Pacientes do sexo feminino, também recomendamos:
        </Text>
        <View style={styles.spaceAfterText} /> 

        <CustomCard
          title="Ginecologista"
          description="Consultas regulares com um ginecologista são essenciais para a saúde da mulher. Marque sua consulta hoje mesmo."
        />
 <CustomCard
          title="Urologista"
          description="Exames de rotina ajudam a detectar e a tratar problemas de saúde ainda no início, como câncer de próstata e incontinência urinária."
        />
         <Text style={styles.additionalTextAfterLastCard}>
          Independente da sua identidade de gênero, consulte um ginecologista caso você tenha útero, colo uterino ou seios. Caso tenha próstata, consulte um urologista.
        </Text>
        <View style={styles.spaceAfterCard} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  spaceAfterText: {
    height: 20, 
  },
  salvoText: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'left',
    top: 40,
    left: 12,
  },
  specialtiesButton: {
    width: '40%', // Alterado para 40% da largura
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
  specialtiesButtonText: {
    fontSize: 16,
    color: '#0061BA',
    fontWeight: 'bold',
  },
  containerT: {
    right: 10,
    top: 20,
  },
  card: {
    maxWidth: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(0, 97, 186, 0.5)',
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    top: '5%',
    marginBottom: 15,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  cardDescription: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 16,
  },
  readMoreButton: {
    backgroundColor: '#8dc8ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  readMoreButtonText: {
    fontSize: 16,
    color: '#27262a',
    fontWeight: 'bold',
  },
  profileText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    left: 120,
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
    width: '120%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  spaceAfterCard: {
    height: 120,
  },
  additionalText: {
    fontSize: 16,
    color: '#27262a',
    fontWeight: 'bold',
    marginLeft: 30,
    position: 'absolute',
    top: '55%',
     zIndex: 1,
  },
   additionalTextAfterLastCard: {
    fontSize: 16,
    color: 'rgba(39, 38, 42, 0.6)', 
    fontWeight: 'bold',
    alignItems:'center',
    marginLeft: 30,
    position: 'absolute',
    top: '95%',
    zIndex: 1,
  },
});

export default SaveScreen;
