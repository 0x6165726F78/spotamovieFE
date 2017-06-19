import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SegmentedControlIOS,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ActionCreators from '../../actions'
import { connect } from 'react-redux'
import MovieItem from './components/MovieItem'

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
    cardIndex: 0,
    value: 'Liked',
    values: ['Liked', 'Disliked'],
    selectedIndex: 0,
    fetchedLiked: false,
    fetchedDisliked: false,
    filteredMovies: [],
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

  render() {
    console.log(this.props)
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
              <MovieItem
                key={movie.id}
                title={movie.title}
                image={movie.poster_path}
                onRemove={() => this.handleRemove(movie.id)}
              />
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
