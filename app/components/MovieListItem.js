import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '~/config';

export default function MovieListItem({ image, onRemove }) {
  return (
    <View style={styles.poster}>
      <Image
        style={styles.posterCard}
        source={{ uri: `${config.IMG_BASE_URI}/${image}` }}
      />
      <TouchableHighlight
        style={styles.btnStart}
        onPress={onRemove}
        underlayColor="rgba(0,0,0,0)"
      >
        <Text style={styles.btnStartText}>
          <Icon
            name="md-close-circle"
            size={28}
            color="rgba(255,255,255,0.8)"
          />
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    margin: 3,
  },
  posterCard: {
    borderRadius: 5,
    width: 118,
    height: 177,
  },
  btnStart: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 2,
    margin: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 25,
    borderWidth: 0,
    borderColor: 'white',
  },
  btnStartText: {
    color: '#94de45',
    textAlign: 'center',
    fontSize: 18,
  },
});
