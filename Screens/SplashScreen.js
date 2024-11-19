import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Welcome'); 
    }, 2000);

    return () => clearTimeout(timeout); 
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/render_image.jpeg')} 
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;