import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SegmentedControlIOS,
  ScrollView,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ActionCreators from '~/actions';
import { MovieListItem, MovieModal } from '~/components';
import { purgeStoreAsync } from '~/lib/reduxPersistWrapper';
import store from '~/state';
import I18n from 'react-native-i18n';
const SignOutBtn = connect(null, ActionCreators)(({ logout, onPress }) =>
  <TouchableOpacity
    style={{ marginRight: 8 }}
    onPress={() => {
      logout();
      purgeStoreAsync(store);
      onPress();
    }}
  >
    <Octicons name="sign-out" size={28} color="white" />
  </TouchableOpacity>
);

@connect(data => LikedListScreen.getDataProps, ActionCreators)
export default class LikedListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: I18n.t('likedMovies'),
    headerTitleStyle: {
      fontSize: 20,
    },
    headerRight: <SignOutBtn onPress={() => navigation.navigate('Login')} />,
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-heart${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: I18n.t('Liked'),
  });

  filteredMovies = [];

  static getDataProps = (
    { moviesCached, moviesLiked, moviesDisliked, likedListScreen },
    state
  ) => {
    const filteredMovies = Object.values(moviesCached).filter(val => {
      if (likedListScreen.value === 'Liked') {
        return moviesLiked.includes(String(val.id));
      }

      if (likedListScreen.value === 'Disliked') {
        return moviesDisliked.includes(String(val.id));
      }
    });

    return {
      likedListScreen,
      filteredMovies,
      moviesCached,
      moviesLiked,
      moviesDisliked,
    };
  };

  state = {
    modalVisible: false,
    cardIndex: 0,
    value: 'Liked',
    values: [I18n.t('Liked'), I18n.t('Disliked')],
    selectedIndex: 0,
    fetchedLiked: false,
    fetchedDisliked: false,
    filteredMovies: [],
    movie: null,
  };

  _onChange = event => {
    if (this.state.value === 'Liked') {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => this.props.moviesDisliked.includes(val.id.toString()));
    }
    if (this.state.value === 'Disliked') {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => this.props.moviesLiked.includes(val.id.toString()));
    }

    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
      filteredMovies: this.state.filteredMovies,
    });
  };

  _onValueChange = value => {
    this.props.onValueChange(value);
  };

  _handleRemove = movieId => {
    if (this.props.likedListScreen.value === 'Liked') {
      this.props.unLikeMovie(movieId);
    } else if (this.props.likedListScreen.value === 'Disliked') {
      this.props.unDislikeMovie(movieId);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.fetchedLiked &&
      this.props.moviesLiked !== nextProps.moviesLiked
    ) {
      nextProps.moviesLiked.map(movieId => {
        this.props.getMovieFromId(movieId, true);
      });
      this.setState({ fetchedLiked: true });
    }

    if (
      !this.state.fetchedDisliked &&
      this.props.moviesDisliked !== nextProps.moviesDisliked
    ) {
      nextProps.moviesDisliked.map(movieId => {
        this.props.getMovieFromId(movieId, true);
      });
      this.setState({ fetchedDisliked: true });
    }

    if (
      this.props.moviesLiked !== nextProps.moviesLiked ||
      this.props.moviesDisliked !== nextProps.moviesDisliked
    ) {
      this.state.filteredMovies = Object.values(
        this.props.moviesCached
      ).filter(val => {
        if (this.state.value === 'Liked')
          return this.props.moviesLiked.includes(val.id.toString());
        else {
          return this.props.moviesDisliked.includes(val.id.toString());
        }
      });
    }

    this.setState({ filteredMovies: this.state.filteredMovies });
  }

  componentDidMount() {
    this.props.getMoviesLiked();
    this.props.getMoviesDisliked();
  }

  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _openModal = movie => {
    this.setState({ modalVisible: true, movie });
  };

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
                onPress={() => this._openModal(movie)}
              >
                <MovieListItem
                  title={movie.title}
                  image={movie.poster_path}
                  onRemove={() => this._handleRemove(movie.id)}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        <MovieModal
          visible={this.state.modalVisible}
          onClose={this._closeModal}
          movie={this.state.movie}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
