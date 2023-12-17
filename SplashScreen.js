import React, { useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Use setTimeout to navigate to the login page after 5 seconds
    const timeout = setTimeout(() => {
      navigation.replace('Welcome'); // Navigate to the login page
    }, 2000);

    return () => clearTimeout(timeout); // Clear the timeout if the component unmounts
  }, [navigation]);

  return (

    <SafeAreaView style={styles.container}>
      <Image
        source={require('./assets/render_image.jpeg')} // Replace with your splash screen image
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