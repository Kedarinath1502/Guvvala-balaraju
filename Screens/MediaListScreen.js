import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';

const MediaListScreen = ({ route }) => {
  const { files } = route.params;
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <ScrollView>
        {files.map((file) => (
          <View style={{ marginTop: 16 }}>
            {file.mediaType === 'video' ?
              <TouchableOpacity onPress={() => {
                navigation.navigate('VideoScreen', { videoUrl: file.url });
              }}>
                <Video
                  source={{ uri: file.url }}
                  style={{ width: 400, height: 300, marginTop: 16 }} 
                  useNativeControls={true}
                  resizeMode='contain'
                  isLooping={false}
                />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => {
                navigation.navigate('ImageScreen', { imageUrl: file.url });
              }}>
                <Image source={{ uri: file.url ? file.url : 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI' }} style={styles.postImage} />
              </TouchableOpacity>

            }
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  postImage: {
    width: 375,
    height: 300,
    top: 20,
  },
});

export default MediaListScreen;
