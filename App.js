import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from './components/UserContext';


import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import PasswordScreen from './components/PasswordScreen';
import HomeScreen from './components/HomeScreen';
import SaveScreen from './components/SaveScreen';
import ConsultaScreen from './components/ConsultaScreen';
import PerfilScreen from './components/PerfilScreen';
import AgendamentoScreen from './components/AgendamentoScreen';
import NameScreen from './components/NameScreen';
import DocScreen from './components/DocScreen';
import EndScreen from './components/EndScreen';
import ConfigScreen from './components/ConfigScreen';
import ContaScreen from './components/ContaScreen';
import PrefScreen from './components/PrefScreen';
import TermScreen from './components/TermScreen';
import PrivScreen from './components/PrivScreen';
import ValidacaoScreen from './components/ValidacaoScreen';
import ClinicoGeralScreen from './components/ClinicoGeralScreen';
import PediatriaScreen from './components/PediatriaScreen';
import GinecologiaScreen from './components/GinecologiaScreen';
import EnfermagemScreen from './components/EnfermagemScreen';
import OdontologiaScreen from './components/OdontologiaScreen';
import PsicologiaScreen from './components/PsicologiaScreen';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <UserProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SaveScreen" component={SaveScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConsultaScreen" component={ConsultaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgendamentoScreen" component={AgendamentoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NameScreen" component={NameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DocScreen" component={DocScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EndScreen" component={EndScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConfigScreen" component={ConfigScreen} options={{ headerShown: false }} /> 
         <Stack.Screen name="Conta" component={ContaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Pref" component={PrefScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Term" component={TermScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Priv" component={PrivScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Validacao" component={ValidacaoScreen} options={{ headerShown: false }} />
           <Stack.Screen name="ClinicoGeral" component={ClinicoGeralScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Pediatria" component={PediatriaScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Ginecologia" component={GinecologiaScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Enfermagem" component={EnfermagemScreen} options={{ headerShown: false }} />
           <Stack.Screen name="Psicologia" component={PsicologiaScreen} options={{ headerShown: false }} />

           <Stack.Screen name="Odontologia" component={OdontologiaScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
       </UserProvider>
    </NavigationContainer>
  );
}
