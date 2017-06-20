import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';
import * as ActionCreators from '../../actions';
import { connect } from 'react-redux';
import { styles } from './styles';
import { Spinner, Button, themeManager } from 'nachos-ui';
import { ButtonsGroup, Card, NoMoreCard } from './components';
import LoadingView from '../../components/LoadingView';
import MovieCard from '../../components/MovieCard';

const iconHeart = <Icon name="md-heart" size={40} color="white" />;
const iconClose = <Icon name="md-close" size={40} color="white" />;

const buttonTheme = themeManager.getStyle('Button');
const transparentButtonStyle = {
  ...buttonTheme,
  BUTTON_STATE_PRIMARY: 'transparent',
};

btnStyle = { margin: 5 };

// getMovieRecommendation
@connect(data => DiscoverScreen.getData, ActionCreators)
export default class DiscoverScreen extends Component {
  componentDidMount() {
    this.props.getMovieRecommendation();
  }

  state = {
    cardIndex: 0,
    modalVisible: false,
  };

  static navigationOptions = {
    title: 'DISCOVER',
    headerTitleStyle: {
      fontSize: 20,
    },
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-search${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: 'Suggestions',
  };

  static getData = ({ movieRecomm, movies }) => {
    return {
      movieRecomm,
      movies,
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieRecomm !== this.props.movieRecomm) {
      nextProps.movieRecomm.map(movieId => this.props.getMovieFromId(movieId));
    }
  }

  _renderLoadingIndicator = () => {
    return <LoadingView title="Loading Movies..." />;
  };

  handleYup = ({ id }) => {
    // console.log('like', id)
    // this.props.likeMovie(id)
    // this.setState({ cardIndex: this.state.cardIndex + 1 })
    const movieId = this.props.movies[this.state.cardIndex].id;
    this.setState({ cardIndex: this.state.cardIndex + 1 });
    this.props.likeMovie(String(id));
  };

  handleNope = ({ id }) => {
    console.log('dislike', id);
    this.props.dislikeMovie(String(id));
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  handleNoMore = () => {
    this.props.getMovieRecommendation();
    this.setState({ cardIndex: 0 });
    this.props.resetMovies();
  };

  _renderMainScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          {this.props.movies[this.state.cardIndex]
            ? <Text style={styles.title}>
                {this.props.movies[this.state.cardIndex].title}
              </Text>
            : null}
        </View>
        <TouchableOpacity
          onPress={() =>
            this.openModal(this.props.movies[this.state.cardIndex])}
          style={styles.posterView}
        >
          <SwipeCards
            ref={ref => (this._swiper = ref)}
            cards={this.props.movies}
            renderCard={data => <Card {...data} />}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
            renderNoMoreCards={this.handleNoMore}
          />
        </TouchableOpacity>

        <View style={styles.buttonRow1}>
          <TouchableHighlight
            style={styles.btnHighLightClose}
            onPress={this.clickDislike}
            underlayColor="#ED462C"
          >
            <Text style={styles.txtHighLight}>{iconClose}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnHighLightHeart}
            onPress={this.clickLike}
            underlayColor="#94de45"
          >
            <Text style={styles.txtHighLight}>{iconHeart}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonView2}>
          <Button
            type="primary"
            theme={transparentButtonStyle}
            onPress={this.clickSkip}
            // iconName='md-close'
          >
            I don't know
          </Button>

        </View>

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

        <StatusBar hidden={false} barStyle="light-content" />
      </View>
    );
  };
  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  openModal = movie => {
    this.setState({ modalVisible: true, movie });
  };

  closeModal = () => {
    this.setState({ modalVisible: false });
  };

  clickSkip = () => {
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  clickLike = () => {
    const { id } = this.props.movies[this.state.cardIndex];
    console.log('like', id);
    this.props.likeMovie(String(id));
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  clickDislike = () => {
    const { id } = this.props.movies[this.state.cardIndex];
    console.log('dislike', id);
    this.props.dislikeMovie(String(id));
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  render() {
    const { movies, movieRecomm } = this.props;

    if (!movies.length || movies.length < movieRecomm.length) {
      return this._renderLoadingIndicator();
    }

    return this._renderMainScreen();
  }
}
