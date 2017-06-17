import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { Spinner } from 'nachos-ui';
import { styles, buttonStyle } from './styles';
import { Actions } from 'react-native-router-flux';
import RecLoader from '../../components/RecLoader';
import MovieCard from '../../components/MovieCard';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
const POSTER = 'https://image.tmdb.org/t/p/w500';

class RecommendedScreen extends Component {
  static navigationOptions = () => ({
    title: I18n.t('reco'),
    headerTitleStyle: {
      fontSize: 20,
    },

    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-happy${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: I18n.t('Last'),
  });

  constructor() {
    super();
    this.state = { modalVisible: false };
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.movieRecomm !== nextProps.movieRecomm) {
      this.props.getMovieFromId(nextProps.movieRecomm);
    }
  }

  componentDidMount() {
    this.props.getMovieRecommendation()
  }

  newRecomm = movie => {
    this.props.getMovieRecommendation()
  }
  handleLogout() {
    console.log('logoutting');
    this.props.logout()
    this.setState({ userLogged: false })
    this.props.navigation.navigate('Login')
  }

  render() {
    const movie = this.props.movie;

    if (!movie) {
      return (
        <RecLoader />
      )
    }

    return (
      <View style={styles.container}>

        <View style={styles.posterView}>
          <TouchableHighlight
            onPress={this.openModal}
          >
            <View style={styles.poster}>
              <Image
                style={styles.posterCard}
                source={{ uri: `${POSTER}/${movie.poster_path}` }}
              />
            </View>
          </TouchableHighlight>
        </View>


        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
        >
          <TouchableHighlight
            onPress={this.closeModal}
            style={styles.modal1}>
            <View style={styles.modal}>
              <MovieCard />
            </View>
          </TouchableHighlight>
        </Modal>


      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movies.find(movie => movie.id === parseInt(state.movieRecomm.movieId, 10)),
    movieRecomm: state.movieRecomm.movieId,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(ActionCreators.logout()),
  getMovieFromId: (movieId) => dispatch(ActionCreators.getMovieFromId(movieId)),
  getMovieRecommendation: () => dispatch(ActionCreators.getMovieRecommendation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedScreen);
