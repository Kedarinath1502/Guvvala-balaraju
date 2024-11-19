import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import Icon1 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from './firebase';
import { doc, getDocs, collection, where, query, updateDoc, getDoc, orderBy } from 'firebase/firestore';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const Videos = ({ route }) => {
  const navigation = useNavigation();
  const { newPost } = route.params || {}; 
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUserID, setCurrentUserId] = useState(null);

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };
  useEffect(() => {
    
    const postsCollection = collection(db, 'videos');

    
    const queryssss = query(postsCollection, orderBy('createdAt', 'desc'));
    getDocs(queryssss)
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((doc) => {
          
          posts.push({
            id: doc.id, 
            ...doc.data(), 
          });
        });
        setVideos(posts);
        
        console.log('videos:', posts);

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, [refresh, newPost]);


  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      
      const userId = user.uid;
      setCurrentUserId(userId);
      console.log(userId);

      
      const usersCollection = collection(db, 'users');

      
      const querys = where('userId', '==', userId);

      
      getDocs(query(usersCollection, querys)) 
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              if (userData.role === 'Admin') {
                setIsAdmin(true)
                console.log('User Data:', userData.role);
              } else {
                setIsAdmin(false);
                console.log('User Data:',);

              }

            });
          } else {
            
            console.log('No matching user documents found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      
      console.log('User is not authenticated');
    }
  }, []);
  const renderGalleryItem = ({ item }) => {
    const handleDelete = async (galleryId, fileIndex) => {
      try {
        const documentRef = doc(db, 'videos', galleryId);
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
          const updatedFiles = [...docSnapshot.data().files];
          updatedFiles.splice(fileIndex, 1);
          setRefresh(updatedFiles);
          await updateDoc(documentRef, { files: updatedFiles });
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    };

    return (
      <View style={styles.galleryItem}>
        <Text style={styles.categoryLabel}>{item.category}</Text>
        <FlatList
          data={item.files}
          horizontal
          keyExtractor={(video) => video.url}
          renderItem={({ item: video, index: fileIndex }) => (
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                style={styles.videoItem}
                onPress={() => {
                  navigation.navigate('VideoScreen', { videoUrl: video.url });
                }}
              >
                <Video
                  source={{ uri: video.url }}
                  style={styles.thumbnail}
                  useNativeControls={true}
                  resizeMode='cover'
                  isLooping={false}
                />
              </TouchableOpacity>
              {isAdmin && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    handleDelete(item.id, fileIndex);
                  }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <View style={styles.videoContainer}>
        <FlatList
          data={videos}
          keyExtractor={(gallery) => gallery.id}
          renderItem={renderGalleryItem}
        />
      </View>

      {/* Footer */}
      {/* ... (your existing footer code) */}
      {isAdmin ? (
        <TouchableOpacity style={styles.createPostButton} onPress={() => {
          navigation.navigate('UploadVideos', { postId: null });
        }}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Welcome')}>
          <Icon name="home" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.activeFooterButton]}
          onPress={() => handleTabPress('Videos')}
        >
          <Icon name="camera-retro" size={25} color="#c0c0c0" />
          <Text style={[styles.iconLabel, styles.activeIconLabel]}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Constituency')}>
          <Icon1 name="location" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Constituency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Nadunedu')}>
          <Icon name="signal" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Nadu-Nedu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Network')}>
          <Icon name="users" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Network</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red', 
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 11
  },
  container: {
    backgroundColor: '#FE0175',
    flex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    padding: 16,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', 
    marginBottom: 8,
  },
  galleryItem: {
    marginBottom: 16,
  },
  videoItem: {
    width: 150,
    height: 100,
    marginRight: 16,
    backgroundColor: '#F0F0F0', 
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingHorizontal: 10,
  },
  logoutButton: {
    paddingHorizontal: 10,
  },
  profileImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    top: -10,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  videoLabelContainer: {
    flex: 1,
  },
  videoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: 200,
    height: 160,
    marginLeft: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', 
    
    elevation: 10, 
    shadowColor: 'black', 
    shadowOffset: { width: 4, height: 6 }, 
    shadowOpacity: 0.2, 
  },

  footerButton: {
    alignItems: 'center',
    color: '#FE0175',
  },
  iconLabel: {
    alignItems: 'center',
    color: '#FE0175',
  },
  activeIconLabel: {
    color: '#c0c0c0',
  },
  activeFooterButton: {
    color: '#c0c0c0',
  },
  createPostButton: {
    backgroundColor: '#FE0175', 
    width: 70,
    height: 70,
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute',
    bottom: '15%', 
    right: 20, 
  },
});


export default Videos;