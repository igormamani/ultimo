import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PrivScreen = () => {
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
            <Text style={styles.termsText}>Política de proteção privacidade</Text>
          </View>
        </View>
        <Text style={{ fontSize: 15, color: '#076AC6', marginLeft: 20, top: 80 }}>
  Política de Cookies MedConnect
</Text>
        <Text style={styles.additionalText}>
         Política de Privacidade e {'\n'} 
Informações sobre o tratamento{'\n'}
Dados Pessoais pela MedConnect
        </Text>
        <Text style={styles.additionalText1}>
          Política Privacidade
        </Text>
        <Text style={styles.additionalText2}>
          A sua privacidade é importante para nós. É política do MedConnect respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site MedConnect, e outros sites que possuímos e operamos.
{'\n'}
{'\n'}
Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
{'\n'}
{'\n'}
Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
{'\n'}
{'\n'}
Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
{'\n'}
{'\n'}
O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
{'\n'}
{'\n'}
Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
{'\n'}
{'\n'}
O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
{'\n'}
{'\n'}
        </Text>
        <Text style={styles.additionalText2}>
  {'\u2022'} O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
  {'\n\n'}
  Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
  {'\n\n'}
  {'\u2022'} Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
  {'\n\n'}
  {'\u2022'} Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.
</Text>



<Text style={styles.additionalText2}>

Compromisso do Usuário
O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o MedConnect oferece no site e com caráter enunciativo, mas não limitativo:
  {'\n\n'}

  {'\u2022'}A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
  {'\n\n'}
  {'\u2022'} B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, bbebbet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
  {'\n\n'}
  {'\u2022'}C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do MedConnect, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
  {'\n\n'}
  Mais informações
   {'\n\n'}
Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
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
   spaceAfterCard: {
  height: 100, 
},
});

export default PrivScreen;
