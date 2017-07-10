import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import config from '~/config';

export default function MovieCard({ poster_path }) {
  return (
    <Image
      resizeMode="cover"
      style={styles.card}
      source={{ uri: `${config.IMG_BASE_URI}/${poster_path}` }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: 230,
    height: null,
    flex: 1,
    resizeMode: 'cover',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});
