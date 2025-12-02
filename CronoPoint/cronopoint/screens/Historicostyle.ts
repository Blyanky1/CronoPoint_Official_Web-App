import { StyleSheet, Platform, StatusBar } from 'react-native'

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4B9D92',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  helpIcon: {
    position: 'absolute',
    right: 20,
    top: 16,
  },

  scrollContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flexGrow: 1,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D4C47',
    textAlign: 'center',
    marginBottom: 5,
  },
  pageSubtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#F6F8F7',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'column',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  expandedCard: {
    paddingBottom: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  cardName: {
    color: '#2D4C47',
    fontWeight: '700',
    fontSize: 17,
  },

  cardFieldMini: {
    color: '#555',
    marginTop: 4,
  },

  cardField: {
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
  },

  actionsExpanded: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },

  actionIcon: {
    marginHorizontal: 10,
  },

  calcButton: {
    backgroundColor: '#4B9D92',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 14,
    marginTop: 20,
  },

  calcButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  helpModalCard: {
    width: '80%',
    backgroundColor: '#4B9D92',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },

  modalText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },

  modalButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 15,
  },

  modalButtonText: {
    color: '#4B9D92',
    fontWeight: '700',
  },

  editModalCard: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },

  modalInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
  },

  modalSaveButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
  },

  editButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})
