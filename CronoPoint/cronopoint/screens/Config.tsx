import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { styles } from './configstyle'
import { useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth } from '../src/firebaseConfig'

export default function Config() {
  const [helpVisible, setHelpVisible] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const navigation = useNavigation<any>()

  const toggleCard = (card: string) => {
    setExpandedCard(expandedCard === card ? null : card)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigation.replace('Login') // 👈 redireciona para a tela de Login
    } catch (error: any) {
      console.error(error)
      Alert.alert('Erro ao sair', error.message)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CronoPoint</Text>
        <TouchableOpacity
          onPress={() => setHelpVisible(true)}
          style={styles.helpIcon}
        >
          <Ionicons name="help-circle-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Configurações</Text>
        <Text style={styles.pageSubtitle}>
          Gerencie suas preferências do aplicativo.
        </Text>

        {/* Menu */}
        <View style={styles.menuCard}>
          {/* Privacidade e Segurança */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => toggleCard('privacidade')}
          >
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Privacidade e segurança</Text>
            <MaterialCommunityIcons
              name={expandedCard === 'privacidade' ? 'chevron-up' : 'chevron-right'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>

          {expandedCard === 'privacidade' && (
            <View style={styles.expandedContent}>
              <TouchableOpacity style={styles.subItem}>
                <MaterialCommunityIcons
                  name="key-outline"
                  size={20}
                  color="#333"
                  style={styles.menuIcon}
                />
                <Text style={styles.subItemText}>Trocar senha</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Sobre o aplicativo */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => toggleCard('sobre')}
          >
            <MaterialCommunityIcons
              name="information-outline"
              size={22}
              color="#333"
              style={styles.menuIcon}
            />
            <Text style={styles.menuText}>Sobre o aplicativo</Text>
            <MaterialCommunityIcons
              name={expandedCard === 'sobre' ? 'chevron-up' : 'chevron-right'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>

          {expandedCard === 'sobre' && (
            <View style={styles.expandedContent}>
              <Text style={styles.subItemText}>
                CronoPoint calcula e organiza seu ponto com base na data e hora de nascimento.
              </Text>
            </View>
          )}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal estilo HISTÓRICO */}
      <Modal visible={helpVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.helpModalCard}>
            <Text style={styles.modalTitle}>Sobre o CronoPoint</Text>
            <Text style={styles.modalText}>
              Este aplicativo calcula e organiza seu ponto com base na data e hora
              de nascimento.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setHelpVisible(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
