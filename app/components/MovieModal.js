import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '~/config';
import I18n from 'react-native-i18n';

class MovieCard extends Component {
  render() {
    const overview = this.props.movie.overview;
    const lengthOv = 312;
    let trimmedOv = overview.length > lengthOv
      ? overview.substring(0, lengthOv) + '...'
      : overview;
    return (
      <View style={styles.container}>
        <View style={styles.marginRow} />
        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <Image
              style={styles.backdrop}
              source={{
                uri: `${config.IMG_BASE_URI}/${this.props.movie.backdropPath}`,
              }}
            />
          </View>

          <View style={styles.middleRow}>
            <View style={[styles.box, styles.box3]}>
              <Text style={styles.title}>{this.props.movie.title}</Text>
              <Text style={styles.date}>{this.props.movie.releaseDate}</Text>
              <Text style={styles.voteAverage}>
                <Icon name="md-pulse" size={16} color="goldenrod" />{' '}
                {this.props.movie.voteAverage}/10
              </Text>
            </View>

            <Image
              style={styles.thumbnail}
              source={{
                uri: `${config.IMG_BASE_URI}/${this.props.movie.poster_path}`,
              }}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.box, styles.box2]}>
              <Text style={styles.description}>{I18n.t('description')}</Text>
              <Text />
              <Text style={styles.overview}>{trimmedOv}</Text>
            </View>
          </View>
        </View>

        <View style={styles.marginRow} />
      </View>
    );
  }
}

export default class MovieModal extends Component {
  render() {
    const { onClose, movie, visible } = this.props;
    return (
      <Modal animationType="fade" transparent visible={visible}>
        <TouchableHighlight
          onPress={onClose}
          style={styles.modalOuterContainer}
        >
          <View style={styles.modalInnerContainer}>
            <MovieCard movie={movie} />
          </View>
        </TouchableHighlight>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalOuterContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  modalInnerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
  },

  cardContainer: {
    flex: 3,
    justifyContent: 'space-between',
    shadowColor: 'silver',
    shadowRadius: 4,
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  backdrop: {
    flex: 1,
  },

  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 100,
    paddingTop: 10,
    color: 'goldenrod',
  },

  date: {
    fontFamily: 'Raleway',
    fontSize: 12,
    marginHorizontal: 100,
    color: 'grey',
  },

  voteAverage: {
    fontFamily: 'Raleway',
    fontSize: 12,
    marginHorizontal: 100,
    color: 'goldenrod',
  },

  description: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
  },

  overview: {
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
  },

  thumbnail: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    left: 10,
    width: 70,
    height: 100,
    borderColor: 'silver',
  },

  middleRow: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  marginRow: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    flex: 1,
  },
  box2: {
    backgroundColor: '#f0fff0',
    padding: 10,
  },
  box3: {
    backgroundColor: '#254441',
  },
});
