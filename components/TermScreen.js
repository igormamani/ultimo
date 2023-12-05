import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TermScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.closeButton}>
          <MaterialIcons name="close" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileText}>Termos de Serviço</Text>
        <View style={styles.headerRight}></View>
        <View style={styles.separator} />
        <View style={styles.termsContainer}>
          <View style={styles.rectangle}>
            <Text style={styles.termsText}>Termos e Condições</Text>
          </View>
        </View>
        <Text style={styles.additionalText}>
          TERMOS DE USO E CONDIÇÕES {'\n'}GERAIS PARA USUÁRIOS E {'\n'}PROFISSIONAIS PERFIL {'\n'}BÁSICO
        </Text>
        <Text style={styles.additionalText1}>
          1. TERMOS
        </Text>
        <Text style={styles.additionalText2}>
          Ao acessar ao site MedConnect, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. 
          Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
        </Text>
        <Text style={styles.sectionTitle}>
          2. USO DE LICENÇA
        </Text>
        <Text style={styles.additionalText3}>
          É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site MedConnect, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
          {'\n'}
          {'\n'}
          1. modificar ou copiar os materiais;
          {'\n'}
          {'\n'}
          2. usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);
          {'\n'}
          {'\n'}
          3. tentar descompilar ou fazer engenharia reversa de qualquer software contido no site MedConnect;
          {'\n'}
          {'\n'}
          4. remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou
          {'\n'}
          {'\n'}
          5. transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.
          {'\n'}
          {'\n'}
          Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por MedConnect a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
        </Text>
        <Text style={styles.sectionTitle1}>
          3. ISENÇÃO DE RESPONSABILIDADE
        </Text>
         <Text style={styles.additionalText3}>
         1. Os materiais no site da MedConnect são fornecidos 'como estão'. MedConnect não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
          {'\n'}
          {'\n'}
2. Além disso, o MedConnect não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.
         </Text>
          <Text style={styles.sectionTitle1}>
          4. LIMITAÇÕES
        </Text>
          <Text style={styles.additionalText3}>
      Em nenhum caso o MedConnect ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em MedConnect, mesmo que MedConnect ou um representante autorizado da MedConnect tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
         </Text>
          <Text style={styles.sectionTitle1}>
          5. PRECISÃO DOS MATERIAIS
        </Text>
          <Text style={styles.additionalText3}>
        Os materiais exibidos no site da MedConnect podem incluir erros técnicos, tipográficos ou fotográficos. MedConnect não garante que qualquer material em seu site seja preciso, completo ou atual. MedConnect pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, MedConnect não se compromete a atualizar os materiais.
         </Text>
          <Text style={styles.sectionTitle1}>
         6. LINKS
        </Text>
          <Text style={styles.additionalText3}>
        O MedConnect não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por MedConnect do site. O uso de qualquer site vinculado é por conta e risco do usuário.
         {'\n'}
          {'\n'}
           {'\n'}
           Modificações
            {'\n'}
             {'\n'}
O MedConnect pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço. {'\n'}
 {'\n'}
Lei aplicável
 {'\n'}
  {'\n'}
Estes termos e condições são regidos e interpretados de acordo com as leis do MedConnect e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
         </Text>
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
    paddingBottom: 20, 
  },
  profileText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
    left: 130,
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
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    top: 90,
  },
  termsContainer: {
    width: '100%',
    height: 51,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    paddingLeft: 20,
    top: 70,
  },
  rectangle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  termsText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  additionalText: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    top: 70,
  },
  additionalText1: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 20,
    top: 70,
  },
  additionalText2: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: 20,
    top: 60,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 20,
    top: 65,
  },
  additionalText3: {
    fontSize: 14,
    marginLeft: 20,
    marginTop: 20,
    top: 60,
  },
   sectionTitle1: {
    fontSize: 19,
    fontWeight: '500',
    marginLeft: 20,
    marginTop: 20,
    top: 60,
  },
   spaceAfterCard: {
  height: 100, 
},
});

export default TermScreen;
