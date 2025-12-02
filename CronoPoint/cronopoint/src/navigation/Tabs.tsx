import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Splash from '../../screens/Splash'
import Login from '../../screens/Login'
import Cadastro from '../../screens/Cadastro'
import Calculate from '../../screens/Calculate'
import Historico from '../../screens/Historico'
import Config from '../../screens/Config'
import EsqueciSenha from '../../screens/EsqueciSenha'

export type RootStackParamList = {
  Splash: undefined
  Tabs: undefined
  EsqueciSenha: undefined
}

export type TabParamList = {
  Login: undefined
  Cadastro: undefined
  Calculate: undefined
  Historico: undefined
  Config: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<TabParamList>()

const BottomTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Cadastro" component={Cadastro} />
    <Tab.Screen name="Calculate" component={Calculate} />
    <Tab.Screen name="Historico" component={Historico} />
    <Tab.Screen name="Config" component={Config} />
  </Tab.Navigator>
)

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Tabs" component={BottomTabs} />
    <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} /> {/* 👈 Stack pai */}
  </Stack.Navigator>
)

export default AppNavigator
