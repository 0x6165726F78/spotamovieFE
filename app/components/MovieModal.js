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

function MovieCard({
  movie: {
    overview,
    backdropPath,
    title,
    releaseDate,
    voteAverage,
    poster_path,
  },
}) {
  return (
    <View style={styles.container}>
      <View style={styles.marginRow} />
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <Image
            style={styles.backdrop}
            source={{
              uri: `${config.IMG_BASE_URI}/${backdropPath}`,
            }}
          />
        </View>

        <View style={styles.middleRow}>
          <View style={[styles.box, styles.box3]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{releaseDate}</Text>
            <Text style={styles.voteAverage}>
              <Icon name="md-pulse" size={16} color="goldenrod" />{' '}
              {voteAverage}/10
            </Text>
          </View>

          <Image
            style={styles.thumbnail}
            source={{
              uri: `${config.IMG_BASE_URI}/${poster_path}`,
            }}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.box, styles.box2]}>
            <Text style={styles.description}>Description</Text>
            <Text />
            <Text style={styles.overview}>{overview.substring(0, 312)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.marginRow} />
    </View>
  );
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
