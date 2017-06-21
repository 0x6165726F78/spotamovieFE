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
import * as ActionCreators from '~/actions';
import { connect } from 'react-redux';
import { Spinner, Button, themeManager } from 'nachos-ui';
import { MovieCard, LoadingView, MovieModal } from '~/components';
import I18n from 'react-native-i18n';

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
            this.openModal(this.props.movies[this.state.cardIndex])}
          style={styles.posterView}
        >
          <SwipeCards
            ref={ref => (this._swiper = ref)}
            cards={this.props.movies}
            renderCard={data => <MovieCard {...data} />}
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
            {I18n.t('idk')}
          </Button>

        </View>

        <MovieModal
          visible={this.state.modalVisible}
          onClose={this.closeModal}
          movie={this.state.movie}
        />

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
    const { movies, moviesRecomm } = this.props;

    if (!movies.length || movies.length < moviesRecomm.length) {
      return this._renderLoadingIndicator();
    }

    return this._renderMainScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23222E',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
    // backgroundColor: 'pink',
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
    // backgroundColor: 'purple',
    color: 'white',
    marginBottom: 10,
  },
  posterView: {
    flex: 0.6,
    // backgroundColor:'cyan',
    paddingRight: 60,
    paddingLeft: 60,
    alignItems: 'center',
  },
  buttonRow1: {
    marginTop: 20,
    flex: 0.1,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: 230,
    justifyContent: 'space-between',
  },
  buttonView1: {
    // flex: 0.1,
    // backgroundColor:'deeppink',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonView2: {
    flex: 0.1,
    // backgroundColor:'chartreuse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 200,
  },
  btnStyle: {
    // flex: 1,
    margin: 5,
  },
  btnHighLightHeart: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#94de45',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
  },
  btnHighLightClose: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#ED462C',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0)',
  },
  txtHighLight: {
    marginTop: 5,
    justifyContent: 'center',
    color: '#94de45',
    textAlign: 'center',
  },
  modal1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
});
