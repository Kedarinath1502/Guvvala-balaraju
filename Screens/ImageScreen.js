import React from 'react';
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ImageScreen = ({ route }) => {
  const { imageUrl } = route.params;
  const navigation = useNavigation();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();


  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={windowWidth}
        cropHeight={windowHeight}
        imageWidth={windowWidth}
        imageHeight={windowHeight}
      >
        <Image
          size='contain'
          source={{ uri: imageUrl ? imageUrl : 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI' }}
          style={styles.image}
          resizeMode="contain"
        />
      </ImageZoom>
      <View style={{ position: 'absolute', top: 100, right: 50 }}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Feather
            name='x'
            size={24}
            color='white'
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  image: {
    marginTop: '50%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '50%',
  },
});

export default ImageScreen;
