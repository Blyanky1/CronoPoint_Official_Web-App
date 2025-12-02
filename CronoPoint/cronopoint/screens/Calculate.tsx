import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { styles } from './Calculatestyle'
import { db, auth } from '../src/firebaseConfig'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Calculate() {
  const [data, setData] = useState<Date | null>(null)
  const [hora, setHora] = useState<Date | null>(null)
  const [resultado, setResultado] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [saveVisible, setSaveVisible] = useState(false)

  const [nome, setNome] = useState('')
  const [observacao, setObservacao] = useState('')

  const formatDate = (d: Date) => {
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const yyyy = d.getFullYear()
    return `${dd}/${mm}/${yyyy}`
  }

  const formatTime = (d: Date) => {
    const hh = String(d.getHours()).padStart(2, '0')
    const mm = String(d.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }

  const handleCalcular = () => {
    if (!data || !hora) {
      Alert.alert('Atenção', 'Preencha a data e a hora do nascimento.')
      return
    }

    const year = data.getFullYear()
    let binomioAno = year - 1923
    if (binomioAno > 60) binomioAno -= 60

    const diferencasAnos: Record<number, number> = {
      2000: 11, 2001: 42, 2002: 17, 2003: 49, 2004: 20, 2005: 50, 2006: 21,
      2007: 51, 2008: 23, 2009: 54, 2010: 25, 2011: 55, 2012: 27, 2013: 57,
      2014: 28, 2015: 58, 2016: 29, 2017: 0, 2018: 31, 2019: 1, 2020: 32,
    }

    const diffAno = diferencasAnos[year] ?? 49
    const monthOffsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    const totalDays = diffAno + monthOffsets[data.getMonth()] + data.getDate()
    let binomioDia = totalDays > 60 ? totalDays - 60 : totalDays

    const hour = hora.getHours()
    let pontoAberto = ''

    if (hour >= 23 || hour < 1) pontoAberto = 'ID2'
    else if (hour < 3) pontoAberto = 'E36'
    else if (hour < 5) pontoAberto = 'B60'
    else if (hour < 7) pontoAberto = 'F8'
    else if (hour < 9) pontoAberto = 'VB34'
    else if (hour < 11) pontoAberto = 'BP1'
    else if (hour < 13) pontoAberto = 'C7'
    else if (hour < 15) pontoAberto = 'CS8'
    else if (hour < 17) pontoAberto = 'VB41'
    else if (hour < 19) pontoAberto = 'R3'
    else if (hour < 21) pontoAberto = 'ID5'
    else pontoAberto = 'BP9'

    setResultado(pontoAberto)
  }

  // 🔹 Salvar no Firestore
  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Insira um nome para salvar o registro.')
      return
    }

    if (!resultado) {
      Alert.alert('Atenção', 'Calcule o ponto antes de salvar.')
      return
    }

    // FECHA O POP-UP IMEDIATAMENTE
    setSaveVisible(false)

    try {
      const user = auth.currentUser
      await addDoc(collection(db, 'historico'), {
        userId: user ? user.uid : 'anonimo',
        nome: nome.trim(),
        dataNascimento: data ? formatDate(data) : '',
        horaNascimento: hora ? formatTime(hora) : '',
        pontoAberto: resultado,
        observacao: observacao.trim(),
        criadoEm: serverTimestamp(),
      })

      Alert.alert('Sucesso', 'Resultado salvo com sucesso!')
      setNome('')
      setObservacao('')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      Alert.alert('Erro', 'Não foi possível salvar o resultado.')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CronoPoint</Text>
        <TouchableOpacity onPress={() => setHelpVisible(true)} style={styles.helpIcon}>
          <Ionicons name="help-circle-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Calcular Ponto Aberto</Text>

        <Text style={styles.pageSubtitle}>
          Informe a data e hora de nascimento para descobrir o ponto aberto.
        </Text>

        {/* DATA */}
        <TouchableOpacity style={styles.inputContainer} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={22} color="#888" />
          <Text style={[styles.input, !data && { color: '#888' }]}>
            {data ? formatDate(data) : 'Data de Nascimento'}
          </Text>
        </TouchableOpacity>

        {/* HORA */}
        <TouchableOpacity style={styles.inputContainer} onPress={() => setShowTimePicker(true)}>
          <Ionicons name="time-outline" size={22} color="#888" />
          <Text style={[styles.input, !hora && { color: '#888' }]}>
            {hora ? formatTime(hora) : 'Hora de Nascimento'}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO CALCULAR */}
        <TouchableOpacity style={styles.calcButton} onPress={handleCalcular}>
          <Text style={styles.calcButtonText}>Calcular</Text>
        </TouchableOpacity>

        {/* RESULTADO */}
        {resultado !== '' && (
          <View style={styles.resultContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../assets/crono_circle.png')}
                style={styles.resultImage}
                resizeMode="contain"
              />
              <Text style={styles.resultValue}>{resultado}</Text>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={() => setSaveVisible(true)}>
              <Ionicons name="save-outline" size={22} color="#fff" />
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display="spinner"
          onChange={(_, selected) => {
            setShowDatePicker(false)
            if (selected) setData(selected)
          }}
        />
      )}

      {/* TIME PICKER */}
      {showTimePicker && (
        <DateTimePicker
          value={hora || new Date()}
          mode="time"
          display="spinner"
          onChange={(_, selected) => {
            setShowTimePicker(false)
            if (selected) setHora(selected)
          }}
        />
      )}

      {/* POP-UP AJUDA */}
      <Modal visible={helpVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Sobre o CronoPoint</Text>
            <Text style={styles.modalText}>
              O cálculo é baseado na data e hora de nascimento e determina o ponto aberto.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setHelpVisible(false)}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* POP-UP SALVAR */}
      <Modal visible={saveVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.saveModalCard}>
            <Text style={styles.modalTitle}>Salvar Resultado</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Nome"
              placeholderTextColor="#999"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.modalInput}
              value={data ? formatDate(data) : ''}
              editable={false}
            />

            <TextInput
              style={styles.modalInput}
              value={hora ? formatTime(hora) : ''}
              editable={false}
            />

            <TextInput
              style={[styles.modalInput, styles.modalObs]}
              placeholder="Observação"
              placeholderTextColor="#999"
              value={observacao}
              onChangeText={setObservacao}
              multiline
            />

            <View style={styles.saveBottomContainer}>
              <TouchableOpacity
                style={[styles.modalSaveButton, { backgroundColor: '#777' }]}
                onPress={() => setSaveVisible(false)}
              >
                <Ionicons name="close-outline" size={22} color="#fff" />
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalSaveButton} onPress={handleSalvar}>
                <Ionicons name="checkmark-outline" size={22} color="#fff" />
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
