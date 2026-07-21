import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/Group91.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.header}>Skin</Text>
        <Text style={styles.header}>Firts</Text>
        <Text style={styles.text}>Dermatology Center</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2260FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: 130,
    height: 130,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

  header: {
    fontSize: 48,
    fontWeight: '700',
    color: '#fff',
    fontFamily:'LeagueSpartan-Regular',
  },

  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily:'LeagueSpartan-Bold'
  },
});

export default SplashScreen;