// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// 🔹 Importando telas
import Splash from './screens/Splash'
import Login from './screens/Login'
import Cadastro from './screens/Cadastro'
import Calculate from './screens/Calculate'
import Historico from './screens/Historico'
import Config from './screens/Config'
import { theme } from './screens/configstyle'
import EsqueciSenha from './screens/EsqueciSenha'


// 🔹 Tipos de rotas
export type RootStackParamList = {
  Splash: undefined
  Login: undefined
  Cadastro: undefined
  Tabs: undefined
  Calculate: undefined
  Historico: undefined
  Config: undefined
  EsqueciSenha: undefined // 👈 Adicione esta linha
}

// 🔹 Criando navegadores
const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

// 🔹 Aba inferior (Tabs)
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
          height: 70,
          borderTopWidth: 0,
          elevation: 0,
          position: 'absolute',
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'add'

          if (route.name === 'Historico') iconName = 'time-outline'
          if (route.name === 'Config') iconName = 'settings-outline'
          if (route.name === 'Calculate') iconName = 'add'

          return (
            <View
              style={[
                styles.iconBase,
                focused && styles.activeCircle,
              ]}
            >
              <Ionicons
                name={iconName}
                size={route.name === 'Calculate' ? 36 : 30}
                color="#fff"
              />
            </View>
          )
        },
      })}
    >
      <Tab.Screen name="Historico" component={Historico} />
      <Tab.Screen name="Calculate" component={Calculate} />
      <Tab.Screen name="Config" component={Config} />
    </Tab.Navigator>
  )
}

// 🔹 Navegação principal
export default function App() {
  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
          {/* Splash primeiro */}
          <Stack.Screen name="Splash" component={Splash} />

          {/* Login / Cadastro */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />

          {/* App principal */}
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Calculate" component={Calculate} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="Config" component={Config} />
          <Stack.Screen name="EsqueciSenha" component={EsqueciSenha} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  iconBase: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  activeCircle: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    top: -15,
  },
})
