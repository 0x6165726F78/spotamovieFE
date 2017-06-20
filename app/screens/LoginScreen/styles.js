import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#23222E',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLoader: {
    backgroundColor: '#23222E',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  scene: {
    flex: 1,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  containerWelcome: {
    marginTop: 80,
  },
  welcome: {
    color: 'white',
    fontFamily: 'Raleway-Black',
    fontSize: 80,
    textAlign: 'center',
  },
  containerSubheading: {
    paddingTop: 30,
    paddingRight: 70,
    paddingLeft: 70,
    flex: 0.45,
  },
  subheading: {
    color: 'white',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  containerInstructions: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  instructions: {
    color: 'grey',
    fontFamily: 'Raleway-Medium',
    fontSize: 12,
    textAlign: 'center',
  },
  startContainer: {
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  start: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#62C654',
    borderRadius: 30,
    borderWidth: 1,
    // width: 250
  },
  startText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButtonContainer: {
    flexDirection: 'row',
  },
  spotifyIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
