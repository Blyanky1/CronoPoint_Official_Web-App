import { StyleSheet, Platform, StatusBar } from 'react-native'

export const theme = {
  colors: {
    primary: '#4B9D92',
    secondary: '#6CC3B8',
    background: '#fff',
    surface: '#F6F8F7',
    text: '#2D4C47',
    placeholder: '#A0B2AD',
    danger: '#C25454',
  },
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
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
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    flexGrow: 1,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 5,
  },
  pageSubtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },

  menuCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '600',
  },

  expandedContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
  },
  subItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  subItemText: {
    fontSize: 15,
    color: theme.colors.text,
    marginLeft: 8,
  },

  logoutButton: {
    backgroundColor: theme.colors.danger,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  helpModalCard: {
    width: '85%',
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },

  modalText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  modalButtonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
})
