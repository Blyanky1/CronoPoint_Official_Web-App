import React, { useEffect } from 'react'
import {
  View,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type RootStackParamList = {
  Splash: undefined
  Login: undefined
  Cadastro: undefined
  Calculate: undefined
  Tabs: undefined
}

type SplashNavigation = NativeStackNavigationProp<RootStackParamList, 'Splash'>

const Splash: React.FC = () => {
  const navigation = useNavigation<SplashNavigation>()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login')
    }, 3500)
    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4E9A9A" barStyle="light-content" />

      <View style={styles.centerContent}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <Text style={styles.appName}>ChronoPoint</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />
      </View>

      <View style={styles.footer}>
        <Image source={require('../assets/citec.png')} style={styles.footerLogo} />
        <Text style={styles.footerText}>Copyright © - 2025</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4E9A9A',
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    width: 220,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  footer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  footerText: {
    fontSize: 12,
    color: '#4E9A9A',
  },
})

export default Splash
