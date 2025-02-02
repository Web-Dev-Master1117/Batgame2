import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 310,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  top: {
    flex: 1,
    paddingTop: 10,
  },
  topUsername: {
    flex: 1,
    paddingTop: 100,
  },
  bottom: {
    flex: 2,
    marginTop: 110,
  },
  formSubmit: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    padding: 4,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 250,
    alignSelf: 'flex-start',
    fontSize: 14,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  label: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'chalkduster',
  },
  image: {
    marginTop: 20,
    marginBottom: 15,
    width: 80,
    height: 45,
  },
});
