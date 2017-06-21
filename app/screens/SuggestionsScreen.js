import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeCards from 'react-native-swipe-cards';
import { connect } from 'react-redux';
import { Spinner, Button, themeManager } from 'nachos-ui';
import * as ActionCreators from '../actions';
import { MovieCard, LoadingView, MovieModal } from '../components';
import I18n from 'react-native-i18n';
import colors from '../colors';

const { darkRedColor, lightGreenColor, backgroundColor } = colors;

const iconHeart = <Icon name="md-heart" size={40} color="white" />;
const iconClose = <Icon name="md-close" size={40} color="white" />;

const buttonTheme = themeManager.getStyle('Button');

const transparentButtonStyle = {
  ...buttonTheme,
  BUTTON_STATE_PRIMARY: 'transparent',
};

@connect(data => DiscoverScreen.getData, ActionCreators)
export default class DiscoverScreen extends Component {
  componentDidMount() {
    this.props.getMoviesRecommendation();
  }

  state = {
    cardIndex: 0,
    modalVisible: false,
  };

  static navigationOptions = () => ({
    title: I18n.t('discover'),
    headerTitleStyle: {
      fontSize: 20,
    },
    tabBarIcon: ({ tintColor, focused }) =>
      <Icon
        name={`ios-search${focused ? '' : '-outline'}`}
        color={tintColor}
        size={32}
      />,
    tabBarLabel: I18n.t('Suggestions'),
  });

  static getData = ({ moviesRecomm, movies }) => {
    return {
      moviesRecomm,
      movies,
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.moviesRecomm !== this.props.moviesRecomm) {
      nextProps.moviesRecomm.map(movieId => this.props.getMovieFromId(movieId));
    }
  }

  _renderLoadingIndicator = () => {
    return <LoadingView title={I18n.t('loadingMovies') + '...'} />;
  };

  _handleYup = ({ id }) => {
    const movieId = this.props.movies[this.state.cardIndex].id;
    this.setState({ cardIndex: this.state.cardIndex + 1 });
    this.props.likeMovie(String(id));
  };

  _handleNope = ({ id }) => {
    this.props.dislikeMovie(String(id));
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  _handleNoMore = () => {
    this.props.getMoviesRecommendation();
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
            this._openModal(this.props.movies[this.state.cardIndex])}
          style={styles.posterView}
        >
          <SwipeCards
            ref={ref => (this._swiper = ref)}
            cards={this.props.movies}
            renderCard={data => <MovieCard {...data} />}
            handleYup={this._handleYup}
            handleNope={this._handleNope}
            renderNoMoreCards={this._handleNoMore}
          />
        </TouchableOpacity>

        <View style={styles.buttonRow1}>
          <TouchableHighlight
            style={styles.btnHighLightClose}
            onPress={this._clickDislike}
            underlayColor="#ED462C"
          >
            <Text style={styles.txtHighLight}>
              <Icon name="md-close" size={40} color="white" />
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.btnHighLightHeart}
            onPress={this._clickLike}
            underlayColor="#94de45"
          >
            <Text style={styles.txtHighLight}>
              <Icon name="md-heart" size={40} color="white" />
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonView2}>
          <Button
            type="primary"
            theme={transparentButtonStyle}
            onPress={this._clickSkip}
          >
            {I18n.t('idk')}
          </Button>

        </View>

        <MovieModal
          visible={this.state.modalVisible}
          onClose={this._closeModal}
          movie={this.state.movie}
        />

        <StatusBar hidden={false} barStyle="light-content" />
      </View>
    );
  };
  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _openModal = movie => {
    this.setState({ modalVisible: true, movie });
  };

  _closeModal = () => {
    this.setState({ modalVisible: false });
  };

  _clickSkip = () => {
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  _clickLike = () => {
    const { id } = this.props.movies[this.state.cardIndex];
    this.props.likeMovie(String(id));
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  _clickDislike = () => {
    const { id } = this.props.movies[this.state.cardIndex];
    this.props.dislikeMovie(String(id));
    this._swiper._goToNextCard();
    this.setState({ cardIndex: this.state.cardIndex + 1 });
  };

  render() {
    const { movies, moviesRecomm } = this.props;

    if (!movies.length || movies.length < moviesRecomm.length) {
      return this._renderLoadingIndicator();
    }

    return this._renderMainScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  containerLoader: {
    backgroundColor: backgroundColor,
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
  posterView: {
    flex: 0.6,
    paddingRight: 60,
    paddingLeft: 60,
    alignItems: 'center',
  },
  buttonRow1: {
    marginTop: 20,
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: 230,
    justifyContent: 'space-between',
  },
  buttonView1: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonView2: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 200,
  },
  btnHighLightHeart: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: lightGreenColor,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'black',
  },
  btnHighLightClose: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: darkRedColor,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'black',
  },
  txtHighLight: {
    marginTop: 5,
    justifyContent: 'center',
    color: lightGreenColor,
    textAlign: 'center',
  },
});
