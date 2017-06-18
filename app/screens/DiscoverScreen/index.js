import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import SwipeCards from 'react-native-swipe-cards'
import * as ActionCreators from '../../actions'
import { connect } from 'react-redux'
import { styles } from './styles'
import { Spinner, Button, themeManager } from 'nachos-ui'
import { ButtonsGroup, Card, NoMoreCard } from './components'

const iconHeart = <Icon name="md-heart" size={40} color="white" />
const iconClose = <Icon name="md-close" size={40} color="white" />

const buttonTheme = themeManager.getStyle('Button')
const transparentButtonStyle = {
  ...buttonTheme,
  BUTTON_STATE_PRIMARY: 'transparent',
}

btnStyle = { margin: 5 }

@connect(data => DiscoverScreen.getData, ActionCreators)
export default class DiscoverScreen extends Component {
  state = {
    cardIndex: 0,
  }

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
    tabBarLabel: 'Discover',
  }
  static getData = ({ movies, moviesSurvey }) => ({ movies, moviesSurvey })

  componentDidMount() {
    this.props.getMoviesSurvey()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.moviesSurvey !== nextProps.moviesSurvey) {
      nextProps.moviesSurvey.map(movieId => {
        this.props.getMovieFromId(movieId)
      })
    }
  }

  _renderLoadingIndicator = () => {
    return (
      <View style={styles.containerLoader}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            LOADING SURVEY...
          </Text>
          <Spinner color="#94de45" />
        </View>
        <StatusBar barStyle="light-content" />
      </View>
    )
  }

  handleYup = ({ id }) => {
    // console.log('like', id)
    // this.props.likeMovie(id)
    // this.setState({ cardIndex: this.state.cardIndex + 1 })
    const movieId = this.props.movies[this.state.cardIndex].id
    this.setState({ cardIndex: this.state.cardIndex + 1 })
    this.props.likeMovie(movieId)
  }

  handleNope = ({ id }) => {
    console.log('dislike', id)
    this.props.dislikeMovie(id)
    this.setState({ cardIndex: this.state.cardIndex + 1 })
  }

  handleNoMore = () => {
    this.props.getMoviesSurvey()
    this.setState({ cardIndex: 0 })
    this.props.resetMovies()
  }

  clickLike = () => {
    const { id } = this.props.movies[this.state.cardIndex]
    console.log('like', id)
    this.props.likeMovie(id)
    this._swiper._goToNextCard()
    this.setState({ cardIndex: this.state.cardIndex + 1 })
  }

  clickDislike = () => {
    const { id } = this.props.movies[this.state.cardIndex]
    console.log('dislike', id)
    this.props.dislikeMovie(id)
    this._swiper._goToNextCard()
    this.setState({ cardIndex: this.state.cardIndex + 1 })
  }

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
        <View style={styles.posterView}>
          <SwipeCards
            ref={ref => (this._swiper = ref)}
            cards={this.props.movies}
            renderCard={data => <Card {...data} />}
            handleYup={this.handleYup}
            handleNope={this.handleNope}
            renderNoMoreCards={this.handleNoMore}
          />
        </View>

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
      </View>
    )
  }

  render() {
    const { movies, moviesSurvey } = this.props

    if (!movies.length || movies.length < moviesSurvey.length) {
      return this._renderLoadingIndicator()
    }

    return this._renderMainScreen()
  }
}
