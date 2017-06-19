import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Modal,
} from 'react-native'
import * as ActionCreators from '../../actions'
import { styles, buttonStyle } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
const POSTER = 'https://image.tmdb.org/t/p/w500'
import { connect } from 'react-redux'
import RecLoader from '../../components/RecLoader'
import MovieCard from '../../components/MovieCard'
import config from '../../../config'
const API_URL = 'https://api.themoviedb.org/3/movie/'
import LoadingView from '../../components/LoadingView'

@connect(data => RecommendedScreen.getData, ActionCreators)
export default class RecommendedScreen extends Component {
  state = {
    modalVisible: false,
    loading: true,
    movie: null,
  }

  static getData = ({ movieRecomm }) => ({ movieRecomm })

  static navigationOptions = {
    title: 'RECOMMENDATION',
    headerTitleStyle: {
      fontSize: 20,
    },

    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-happy${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: 'Last',
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.movieRecomm.movieId !== nextProps.movieRecomm.movieId) {
      const movie = await fetch(
        `${API_URL}${nextProps.movieRecomm.movieId}?api_key=${config.api_key}`
      ).then(data => data.json())
      this.setState({ movie, loading: false })
    }
  }

  componentDidMount() {
    this.props.getMovieRecommendation()
    this.interval = setInterval(this.props.getMovieRecommendation, 10000)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  openModal = () => {
    this.setState({ modalVisible: true })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  render() {
    if (this.state.loading) {
      return <LoadingView title="Loading Recommendation..." />
    }

    return (
      <View style={styles.container}>
        <View style={styles.posterView}>
          <TouchableHighlight onPress={this.openModal}>
            <View style={styles.poster}>
              <Image
                style={styles.posterCard}
                source={{
                  uri: `${POSTER}/${this.state.movie.poster_path}`,
                }}
              />
            </View>
          </TouchableHighlight>

          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
          >
            <TouchableHighlight onPress={this.closeModal} style={styles.modal1}>
              <View style={styles.modal}>
                <MovieCard movie={this.state.movie} />
              </View>
            </TouchableHighlight>
          </Modal>
        </View>
      </View>
    )
  }
}
