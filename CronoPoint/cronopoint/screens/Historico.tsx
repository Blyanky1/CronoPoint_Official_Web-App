import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { styles } from './Historicostyle'
import { db, auth } from '../src/firebaseConfig'
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
  where
} from 'firebase/firestore'

export default function Historico() {
  const navigation = useNavigation<any>()
  const [helpVisible, setHelpVisible] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editVisible, setEditVisible] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)

  const formatTimestamp = (ts: any) => {
    if (!ts || !ts.seconds) return "—"
    const date = new Date(ts.seconds * 1000)
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, "historico"),
      where("userId", "==", user.uid),
      orderBy("criadoEm", "desc")
    )

    const unsub = onSnapshot(q, snapshot => {
      const list: any[] = []
      snapshot.forEach(docSnap =>
        list.push({ id: docSnap.id, ...docSnap.data() })
      )
      setItems(list)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const handleDelete = (id: string) => {
    Alert.alert("Excluir registro", "Deseja realmente excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "historico", id))
        }
      }
    ])
  }

  const handleEdit = (item: any) => {
    setEditItem({ ...item })
    setEditVisible(true)
  }

  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "historico", editItem.id), {
      nome: editItem.nome,
      dataNascimento: editItem.dataNascimento,
      horaNascimento: editItem.horaNascimento,
      observacao: editItem.observacao,
      pontoAberto: editItem.pontoAberto,
    })

    setEditVisible(false)
    Alert.alert("Sucesso", "Registro atualizado!")
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CronoPoint</Text>
        <TouchableOpacity style={styles.helpIcon} onPress={() => setHelpVisible(true)}>
          <Ionicons name="help-circle-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Histórico</Text>
        <Text style={styles.pageSubtitle}>Toque em um registro para ver mais detalhes.</Text>

        {loading ? (
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Carregando...
          </Text>
        ) : items.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#777", marginTop: 20 }}>
            Nenhum histórico encontrado.
          </Text>
        ) : (
          items.map((item) => {
            const expanded = expandedId === item.id

            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, expanded && styles.expandedCard]}
                onPress={() => setExpandedId(expanded ? null : item.id)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{item.nome}</Text>
                  <Ionicons
                    name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                    size={22}
                    color="#2D4C47"
                  />
                </View>

                <Text style={styles.cardFieldMini}>
                  Nasc.: {item.dataNascimento} — {item.horaNascimento}
                </Text>

                {expanded && (
                  <View style={{ marginTop: 12 }}>
                    <Text style={styles.cardField}>Ponto Aberto: {item.pontoAberto}</Text>
                    {item.observacao ? (
                      <Text style={styles.cardField}>Observação: {item.observacao}</Text>
                    ) : null}
                    <Text style={styles.cardField}>
                      Salvo em: {formatTimestamp(item.criadoEm)}
                    </Text>

                    <View style={styles.actionsExpanded}>
                      <TouchableOpacity onPress={() => handleEdit(item)}>
                        <Ionicons name="pencil-outline" size={26} color="#1D574F" style={styles.actionIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Ionicons name="trash-outline" size={26} color="#C25454" style={styles.actionIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )
          })
        )}

        <TouchableOpacity
          style={styles.calcButton}
          onPress={() => navigation.navigate("Calculate")}
        >
          <Text style={styles.calcButtonText}>Calcular novo ponto</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de ajuda */}
      <Modal visible={helpVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.helpModalCard}>
            <Ionicons name="information-circle-outline" size={40} color="#fff" />
            <Text style={styles.modalTitle}>Como funciona?</Text>
            <Text style={styles.modalText}>
              Toque em um registro para expandir e visualizar detalhes, editar ou excluir.
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setHelpVisible(false)}>
              <Text style={styles.modalButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de edição */}
      <Modal visible={editVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.editModalCard}>
            <Text style={styles.modalTitle}>Editar Registro</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Nome"
              value={editItem?.nome}
              onChangeText={(t) => setEditItem({ ...editItem, nome: t })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Data nascimento"
              value={editItem?.dataNascimento}
              onChangeText={(t) => setEditItem({ ...editItem, dataNascimento: t })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Hora nascimento"
              value={editItem?.horaNascimento}
              onChangeText={(t) => setEditItem({ ...editItem, horaNascimento: t })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Ponto aberto"
              value={editItem?.pontoAberto}
              onChangeText={(t) => setEditItem({ ...editItem, pontoAberto: t })}
            />
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              multiline
              placeholder="Observação"
              value={editItem?.observacao}
              onChangeText={(t) => setEditItem({ ...editItem, observacao: t })}
            />

            <View style={styles.editButtonsRow}>
              <TouchableOpacity
                style={[styles.modalSaveButton, { backgroundColor: "#C25454" }]}
                onPress={() => setEditVisible(false)}
              >
                <Ionicons name="close-outline" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSaveButton, { backgroundColor: "#4CAF50" }]}
                onPress={handleSaveEdit}
              >
                <Ionicons name="checkmark-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
