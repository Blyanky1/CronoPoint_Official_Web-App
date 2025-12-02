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

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },

  calcButton: {
    backgroundColor: '#4B9D92',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 10,
  },
  calcButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  // ✔ RESULTADO CENTRALIZADO
  resultContainer: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  imageWrapper: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resultImage: {
    width: 200,
    height: 200,
  },

  resultValue: {
    position: 'absolute',
    fontSize: 32,
    fontWeight: '800',
    color: '#2D4C47',
  },

  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B9D92',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D4C47',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#4B9D92',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  saveModalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '85%',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 15,
    color: '#333',
  },
  modalObs: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4B9D92',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})
