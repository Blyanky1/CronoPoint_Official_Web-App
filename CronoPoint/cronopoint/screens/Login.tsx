import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../src/firebaseConfig'
import { Ionicons } from '@expo/vector-icons'
import { RootStackParamList } from '../src/navigation/types' // ✅ importa os tipos

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>() // ✅ tipagem segura
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Preencha todos os campos.')
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), senha)
      navigation.replace('Tabs') // ✅ sem erro de tipo
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro ao entrar', 'Email ou senha incorretos.')
    }
  }

  const handleSignup = () => {
    navigation.navigate('Cadastro') // ✅ sem erro de tipo
  }

  const handleForgotPassword = () => {
    navigation.navigate('EsqueciSenha') // ✅ sem erro de tipo
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C948B" />

      <View style={styles.topWrapper}>
        <View style={styles.topBox} />
        <View style={styles.circleOverlay}>
          <Image source={require('../assets/logo2.png')} style={styles.logoImage} />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Informe seu email e senha</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
          <TextInput
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checked]} />
            <Text style={styles.rememberText}>Lembre-se de mim</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupLink}> Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfcfcb0' },
  topWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBox: {
    backgroundColor: '#3C948B',
    width: '100%',
    height: 180,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  circleOverlay: {
    position: 'absolute',
    top: 60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3C948B',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
  },
  formContainer: { marginTop: 60, paddingHorizontal: 30 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    color: '#000000ff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#C8E6C9',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#2E7D32' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  forgotText: { fontSize: 14, color: '#388E3C', textDecorationLine: 'underline' },
  rememberContainer: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 3,
    marginRight: 6,
  },
  checked: { backgroundColor: '#388E3C' },
  rememberText: { fontSize: 14, color: '#2E7D32' },
  button: {
    backgroundColor: '#1D574F',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 16, color: '#000000ff' },
  signupLink: { fontSize: 16, color: '#388E3C', fontWeight: 'bold' },
})
