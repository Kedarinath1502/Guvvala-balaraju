import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const VideoScreen = ({ route }) => {
  const { videoUrl } = route.params;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
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
  video: {
    width: '100%',
    height: '50%',
  },
});

export default VideoScreen;
