import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
} from 'react-native'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../src/firebaseConfig'
import { useNavigation } from '@react-navigation/native'

export default function EsqueciSenha() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Digite seu email para redefinir a senha.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      Alert.alert(
        'Sucesso',
        'Um email de redefinição de senha foi enviado. Verifique sua caixa de entrada ou os seus Spams.'
      )
      navigation.navigate('Login')
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro ao enviar email', error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C948B" />

      {/* TOPO COM QUADRADO E CÍRCULO SOBREPOSTO */}
      <View style={styles.topWrapper}>
        <View style={styles.topBox} />
        <View style={styles.circleOverlay}>
          <Image source={require('../assets/logo2.png')} style={styles.logoImage} />
        </View>
      </View>

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Esqueci minha senha</Text>
        <Text style={styles.subtitle}>
          Digite seu email para receber o link de redefinição.
        </Text>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
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
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: '#2E7D32' },
  button: {
    width: '100%',
    backgroundColor: '#1D574F',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  backText: { color: '#388E3C', fontSize: 15, fontWeight: '500', textAlign: 'center' },
})
