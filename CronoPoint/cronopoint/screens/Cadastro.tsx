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
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { auth, db } from '../src/firebaseConfig'
import { useNavigation } from '@react-navigation/native'

export default function Cadastro() {
  const navigation = useNavigation<any>()

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [aceitouTermos, setAceitouTermos] = useState(false)
  const [mostrarTermos, setMostrarTermos] = useState(false)

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !aceitouTermos) {
      Alert.alert('Erro', 'Preencha todos os campos e aceite os termos de uso.')
      return
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.')
      return
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.')
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha)
      const user = userCredential.user

      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
        criadoEm: new Date().toISOString(),
      })

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
      navigation.navigate('Login')
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro ao cadastrar', error.message)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C948B" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* TOPO COM QUADRADO E CÍRCULO SOBREPOSTO */}
          <View style={styles.topWrapper}>
            <View style={styles.topBox} />
            <View style={styles.circleOverlay}>
              <Image source={require('../assets/logo2.png')} style={styles.logoImage} />
            </View>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Preencha seus dados abaixo</Text>

            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Nome"
                placeholderTextColor="#999"
                style={styles.input}
                value={nome}
                onChangeText={setNome}
              />
            </View>

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

            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
              />
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                placeholder="Confirmar senha"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </View>

            <Text style={styles.warningText}>
              * Sua senha precisa ter no mínimo 6 caracteres.
            </Text>

            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setMostrarTermos(true)}
            >
              <View style={[styles.checkbox, aceitouTermos && styles.checked]} />
              <Text style={styles.checkboxText}>Eu aceito os Termos de uso dos meus dados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Termos de Uso */}
      <Modal visible={mostrarTermos} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Termos de uso dos dados</Text>
            <Text style={styles.modalText}>
              Ao se cadastrar, você autoriza o uso dos seus dados para fins de análise e exibição
              em dashboards internos. Todas as informações serão tratadas conforme a Lei Geral de
              Proteção de Dados (LGPD), garantindo privacidade, segurança e transparência. Nenhum
              dado será compartilhado com terceiros sem consentimento. O uso é restrito à melhoria
              da experiência do usuário e à geração de relatórios estatísticos para fins acadêmicos
              e operacionais.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setAceitouTermos(true)
                  setMostrarTermos(false)
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#C25454' }]}
                onPress={() => setMostrarTermos(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  warningText: {
    width: '100%',
    color: '#C25454',
    fontSize: 12,
    marginTop: 4,
    marginBottom: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#388E3C',
    borderRadius: 3,
    marginRight: 8,
  },
  checked: { backgroundColor: '#388E3C' },
  checkboxText: { fontSize: 14, color: '#2E7D32' },
  button: {
    width: '100%',
    backgroundColor: '#1D574F',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 25,
  },
   buttonText: { 
    color: '#FFF', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
  backText: { 
    color: '#388E3C', 
    fontSize: 15, 
    fontWeight: '500', 
    textAlign: 'center' 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D574F',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'justify',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#1D574F',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
})
