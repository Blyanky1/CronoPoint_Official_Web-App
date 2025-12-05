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

  // 1) BINÔMIO DO ANO
  const year = data.getFullYear()
  let binomioAno = year - 1923
  if (binomioAno > 60) binomioAno -= 60

  // 2) DIFERENÇAS DOS ANOS
  const diferencasAnos: Record<number, number> = {
    1900: 9, 1901: 15, 1902: 20, 1903: 25, 1904: 30, 1905: 36, 1906: 41, 1907: 46,
    1908: 51, 1909: 57, 1910: 2, 1911: 7, 1912: 12, 1913: 18, 1914: 23, 1915: 28,
    1916: 33, 1917: 39, 1918: 44, 1919: 49, 1920: 54, 1921: 60, 1922: 5, 1923: 10,
    1924: 15, 1925: 21, 1926: 26, 1927: 31, 1928: 36, 1929: 42, 1930: 47, 1931: 52,
    1932: 57, 1933: 3, 1934: 8, 1935: 13, 1936: 18, 1937: 24, 1938: 29, 1939: 34,
    1940: 39, 1941: 45, 1942: 50, 1943: 55, 1944: 60, 1945: 6, 1946: 11, 1947: 16,
    1948: 21, 1949: 27, 1950: 32, 1951: 37, 1952: 42, 1953: 48, 1954: 53, 1955: 58,
    1956: 63, 1957: 9, 1958: 14, 1959: 19, 1960: 24, 1961: 30, 1962: 35, 1963: 40,
    1964: 45, 1965: 51, 1966: 56, 1967: 61, 1968: 66, 1969: 12, 1970: 17, 1971: 22,
    1972: 27, 1973: 33, 1974: 38, 1975: 43, 1976: 48, 1977: 54, 1978: 59, 1979: 4,
    1980: 9, 1981: 15, 1982: 20, 1983: 25, 1984: 30, 1985: 36, 1986: 41, 1987: 46,
    1988: 51, 1989: 57, 1990: 2, 1991: 7, 1992: 12, 1993: 18, 1994: 23, 1995: 28,
    1996: 33, 1997: 39, 1998: 44, 1999: 49, 2000: 54, 2001: 60, 2002: 5, 2003: 10,
    2004: 15, 2005: 21, 2006: 26, 2007: 31, 2008: 36, 2009: 42, 2010: 47, 2011: 52,
    2012: 57, 2013: 3, 2014: 8, 2015: 13, 2016: 18, 2017: 24, 2018: 29, 2019: 34,
    2020: 39, 2021: 45, 2022: 50, 2023: 55, 2024: 60, 2025: 6, 2026: 11, 2027: 16,
    2028: 21, 2029: 27, 2030: 32, 2031: 37
  }

  const diffAno = diferencasAnos[year] ?? 49

  // 3) OFFSET DE MESES
  const monthOffsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

  // 🔥 4) ANO BISSEXTO — REGRA DA IMAGEM
  const isLeap =
    (year % 4 === 0 && year % 100 !== 0) ||
    (year % 400 === 0)

  const ajusteBissexto =
    isLeap && data.getMonth() >= 2 ? 1 : 0

  const totalDays =
    diffAno +
    monthOffsets[data.getMonth()] +
    data.getDate() +
    ajusteBissexto

  // 5) BINÔMIO DO DIA
  let binomioDia = totalDays > 60 ? totalDays - 60 : totalDays

  // 6) TRONCO T1..T10
  const troncoIndex = binomioDia % 10 === 0 ? 10 : (binomioDia % 10)
  const tronco = `T${troncoIndex}`

  // 7) TABELA COMPLETA DE PONTOS
  const tabelaPontos: Record<string, string[]> = {
    T1:  ['ID2','C3','E43','C55','IG5','BP1','B54','P10','TR2','R3','VB44','F4'],
    T2:  ['E36','BP3','TR10','P8','IG1','R10','B66','CS8','VB41','F1','ID5','C8'],
    T3:  ['IG3','CS7','B60','P11','VB34','R2','TR3','F3','ID1','C4','E44','BP9'],
    T4:  ['TR1','R7','B67','F8','VB43','CS7','ID3','C9','E41','BP2','IG11','P9'],
    T5:  ['VB38','R1','ID8','F2','TR6','C7','E45','BP5','TR2','TR5','B65','CS9'],
    T6:  ['ID2','C3','E43','C55','IG5','BP1','B54','P10','TR2','R3','VB44','F4'],
    T7:  ['E36','BP3','TR10','P8','IG1','R10','B66','CS8','VB41','F1','ID5','C8'],
    T8:  ['IG3','CS7','B60','P11','VB34','R2','TR3','F3','ID1','C4','E44','BP9'],
    T9:  ['TR1','R7','B67','F8','VB43','CS7','ID3','C9','E41','BP2','IG11','P9'],
    T10: ['VB38','R1','ID8','F2','TR6','C7','E45','BP5','TR2','TR5','B65','CS9']
  }

  // 8) INTERVALOS DE HORAS
  const intervalos = [
    { min: 23, max: 24 },
    { min: 1,  max: 3  },
    { min: 3,  max: 5  },
    { min: 5,  max: 7  },
    { min: 7,  max: 9  },
    { min: 9,  max: 11 },
    { min: 11, max: 13 },
    { min: 13, max: 15 },
    { min: 15, max: 17 },
    { min: 17, max: 19 },
    { min: 19, max: 21 },
    { min: 21, max: 23 }
  ]

  function getIntervalIndex(hour: number) {
    if (hour === 0) hour = 24
    return intervalos.findIndex(i => hour >= i.min && hour < i.max)
  }

  const hour = hora.getHours()
  const linha = getIntervalIndex(hour)

  if (linha < 0) {
    setResultado("Erro no horário")
    return
  }

  // 9) RESULTADO FINAL
  const pontoAberto = tabelaPontos[tronco][linha]
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
