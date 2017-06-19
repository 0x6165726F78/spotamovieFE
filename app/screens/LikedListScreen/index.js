import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SegmentedControlIOS,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ActionCreators from '../../actions'
import { connect } from 'react-redux'
import MovieItem from './components/MovieItem'
import MovieCard from '../../components/MovieCard'
import { styles } from './styles'

@connect(data => LikedListScreen.getData, ActionCreators)
export default class LikedListScreen extends Component {
  static navigationOptions = {
    title: 'MOVIES LIKED',
    headerTitleStyle: {
      fontSize: 20,
    },

    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-heart${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: 'Liked',
  }

  filteredMovies = []

  static getData = (
    { moviesCached, moviesLiked, moviesDisliked, likedListScreen },
    state
  ) => {
    const filteredMovies = Object.values(moviesCached).filter(val => {
      if (likedListScreen.value === 'Liked') {
        return moviesLiked.includes(String(val.id))
      }

      if (likedListScreen.value === 'Disliked') {
        return moviesDisliked.includes(String(val.id))
      }
    })

    return {
      likedListScreen,
      filteredMovies,
      moviesCached,
      moviesLiked,
      moviesDisliked,
    }
  }

  state = {
    modalVisible: false,
    cardIndex: 0,
    value: 'Liked',
    values: ['Liked', 'Disliked'],
    selectedIndex: 0,
    fetchedLiked: false,
    fetchedDisliked: false,
    filteredMovies: [],
    movie: null,
  }

  _onChange = event => {
    if (this.state.value === 'Liked') {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => this.props.moviesDisliked.includes(val.id.toString()))
    }
    if (this.state.value === 'Disliked') {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => this.props.moviesLiked.includes(val.id.toString()))
    }

    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
      filteredMovies: this.state.filteredMovies,
    })
  }

  _onValueChange = value => {
    this.props.onValueChange(value)

    // this.setState({
    //   value: value,
    // })
  }

  handleRemove = movieId => {
    if (this.props.likedListScreen.value === 'Liked') {
      this.props.unLikeMovie(movieId)
    } else if (this.props.likedListScreen.value === 'Disliked') {
      this.props.unDislikeMovie(movieId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.fetchedLiked &&
      this.props.moviesLiked !== nextProps.moviesLiked
    ) {
      nextProps.moviesLiked.map(movieId => {
        this.props.getMovieFromId(movieId, true)
      })
      this.setState({ fetchedLiked: true })
    }

    if (
      !this.state.fetchedDisliked &&
      this.props.moviesDisliked !== nextProps.moviesDisliked
    ) {
      nextProps.moviesDisliked.map(movieId => {
        this.props.getMovieFromId(movieId, true)
      })
      this.setState({ fetchedDisliked: true })
    }

    if (
      this.props.moviesLiked !== nextProps.moviesLiked ||
      this.props.moviesDisliked !== nextProps.moviesDisliked
    ) {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => {
        if (this.state.value === 'Liked')
          return this.props.moviesLiked.includes(val.id.toString())
        else {
          return this.props.moviesDisliked.includes(val.id.toString())
        }
      })
    }

    this.setState({ filteredMovies: this.state.filteredMovies })
  }

  componentDidMount() {
    this.props.getMoviesLiked()
    this.props.getMoviesDisliked()
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  openModal = movie => {
    this.setState({ modalVisible: true, movie })
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#23222E',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <View
          style={{
            marginLeft: 12,
            marginRight: 12,
            marginBottom: 12,
            marginTop: 12,
          }}
        >
          <SegmentedControlIOS
            tintColor="lightgrey"
            values={this.state.values}
            selectedIndex={this.state.selectedIndex}
            onChange={this._onChange}
            onValueChange={this._onValueChange}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            {this.props.filteredMovies.map(movie =>
              <TouchableOpacity
                key={movie.id}
                onPress={() => this.openModal(movie)}
              >
                <MovieItem
                  title={movie.title}
                  image={movie.poster_path}
                  onRemove={() => this.handleRemove(movie.id)}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

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
    )
  }
}
