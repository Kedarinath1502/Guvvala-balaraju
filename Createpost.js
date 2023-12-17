import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, doc, getDocs, where, query, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from './firebase'; // Import your initialized Firebase app
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
const CreatePost = ({ route }) => {
  const navigations = useNavigation();
  const { postId } = route.params;
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [likes, setLikes] = useState([]);
  const [comments, setCommennts] = useState([]);


  const getPostData = async (postId) => {
    try {
      const postRef = doc(db, 'post', postId); // Assuming 'posts' is your collection name
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        // Post data exists, you can access it using postSnapshot.data()
        const postData = postSnapshot.data();
        setLocation(postData.location);
        setAddress(postData.address);
        setDescription(postData.description);
        // setSelectedFiles(postData.files);
        setLikes(postData.likes);
        setCommennts(postData.comments);
        return postData;
      } else {
        return null; // Handle the case when the post doesn't exist
      }
    } catch (error) {
      console.error(`Error fetching post data for ID ${postId}:`, error);
      return null; // Handle the error case
    }
  };
  useEffect(() => {
    getPostData(postId);
  }, [postId])

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // User is authenticated
      const userId = user.uid;
      // Define a reference to the 'users' collection in Firestore
      const usersCollection = collection(db, 'users');

      // Create a query to get user data where userId === userId
      const querys = where('userId', '==', userId);
      // Fetch the user's data from Firestore using the query
      getDocs(query(usersCollection, querys)) // Pass the query directly here
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Documents exist, you can access the user's data
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setUserName(userData.userName);
              setProfileImage(userData.profileImage);

            });
          } else {
            // No matching documents found, handle the case accordingly
            console.log('No matching user documents found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      // User is not authenticated, handle this case accordingly
      console.log('User is not authenticated');
    }
  }, []);


  const handleAddPost = async () => {
    setUploading(true);
    const newPost = {
      postedBy: auth.currentUser.uid,
      createdAt: Date.now(),
      username: userName,
      location: location,
      address: address,
      description: description,
      files: selectedFiles,
      profileImage: profileImage,
      likes: likes,
      comments: comments
    }
    await addDoc(collection(db, 'post'), newPost).then(() => {
      setLocation('');
      setAddress('');
      setDescription('');
      setSelectedFiles([]);
      setUploading(false);
      navigations.navigate('Welcome', { newPost });
    })
      .catch(error => {
        setUploading(false);
        Alert.alert('Document Uploading Error',
          'Document Uploading Error : ', error);
      })

  };

  const handleEditPost = async (postId) => {
    try {
      // Assuming you have a form or modal for editing the post and collecting updated data
      // You would collect the updated data and then update the post using the postId
      const updatedData = {
        postedBy: auth.currentUser.uid,
        createdAt: Date.now(),
        username: userName,
        location: location,
        address: address,
        description: description,
        files: selectedFiles, // Pass the selectedImages array
        profileImage: profileImage,
        likes: likes,
        comments: comments
      };

      const postRef = doc(db, 'post', postId); // Assuming 'posts' is your collection name
      await updateDoc(postRef, updatedData);

      Alert.alert('Edit post', 'post has been edited successfully', [
        {
          text: 'OK',
          onPress: () => navigations.navigate('Welcome'),
        },
      ]);
      return console.log(`post edited successfully with ID ${postId}`);

    } catch (error) {
      console.error(`Error editing post with ID ${postId}:`, error);
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple image selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        await uploadMedia(result.assets[i].uri, 'image');
      }
    }
  };

  const handleVideoPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple image selection
    });

    if (!result.canceled) {
      for (let i = 0; i < result.assets.length; i++) {
        await uploadMedia(result.assets[i].uri, 'video');
      }
    }
  };

  const uploadMedia = async (uploadUri, mediaType) => {
    if (uploadUri != null) {
      let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      const extension = fileName.split('.').pop();
      const name = fileName.split('.').slice(0, -1).join('.');
      fileName = 'post/' + name + Date.now().toString() + '.' + extension;
      setUploading(true);
      setTransferred(0);
      const blob = await fetch(uploadUri).then(response => response.blob());
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, blob, extension);
      uploadTask.on('state_changed', (taskSnapshot) => {
        const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        console.log('upload is ' + progress + "% done");
        switch (taskSnapshot.state) {
          case 'paused':
            console.log('upload is paused');
            break;
          case 'running':
            console.log('upload is running');
            break;
        }
      }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            console.log('user not authorized');
            break;
          case 'storage/canceled':
            console.log('user cancled uploading');
            break;
          case 'storage/unknown':
            console.log('unknow error');
            break;
        }
        setUploading(false);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setSelectedFiles((prevSelectedFiles) => [
            ...prevSelectedFiles,
            { url: downloadUrl, mediaType: mediaType }
          ]);
          // setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, downloadUrl]);
          console.log('uploaded file url is here : ', selectedFiles);
          setUploading(false);
        })
        setUploading(false);
      });
    } else {
      setUploading(false);
      Alert.alert('Select an image again');
    }
  };

  const handleRemoveVideo = (indexToRemove) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(indexToRemove, 1);
    setSelectedFiles(updatedSelectedFiles);
  };
  const handleBackButton = () => {
    if (navigations) {
      navigations.goBack(); // Go back to the previous screen
    } else {
      console.log('Navigation object is not defined');
    }
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior for iOS and 'height' behavior for Android
      >
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButton}>
            <Image source={require('./assets/arrowback.png')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.header}>{postId ? 'Update Post' : 'Add Post'}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>

            <View style={styles.field}>
              <Text style={styles.label}>Post Location</Text>
              <View style={styles.inputContainer}>
                <Feather name="search" size={24} color="#FE0175" />
                <TextInput
                  style={styles.input}
                  placeholder="Village/Mandal/Division"
                  onChangeText={setLocation}
                  value={location}
                />
              </View>
            </View>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Add address"
              onChangeText={setAddress}
              value={address}
              multiline
            />
            <Text style={styles.label}>Post Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Post Description"
              onChangeText={(text) => {
                setDescription(text);
              }}
              value={description}
              multiline
            />
            {/* selected file show here  */}
            {selectedFiles.length > 0
              ? <View style={styles.videoContainer}>
                <ScrollView>
                  {selectedFiles.map((file, index) => (
                    <View style={{ marginTop: 8, marginLeft: 8, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} key={index}>
                      {file.mediaType === 'video' ?
                        <TouchableOpacity>
                          <Video
                            source={{ uri: file.url }}
                            style={styles.videoStyle}  //Adjust dimensions as needed
                            useNativeControls={true}
                            isLooping={false}
                          />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity >
                          <Image
                            source={{ uri: file.url }}
                            style={styles.postImage}
                            resizeMode="stretch"
                          />
                        </TouchableOpacity>
                      }
                      <View style={styles.videoNameStyle}>
                        <Text>File selected</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.videoDeleteStyle}
                        onPress={() => handleRemoveVideo(index)} // Call handleRemoveVideo when the button is pressed
                      >
                        <Feather name='trash-2' size={24} color='black' />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>

              </View>
              : (
                <View style={styles.iconButtonContainer}>

                  <TouchableOpacity onPress={handleVideoPicker}>
                    <Image source={require('./assets/upload_icon.png')} style={{ width: 64, height: 64, marginLeft: 10 }} />
                    {/* <Image
                    source={require('./assets/upload_icon.png')} // Replace this with the actual path to your cloud uploading image
                    
                    
                  /> */}
                    {/* <Feather name="cloud" size={24} color="#FE0175" /> */}
                  </TouchableOpacity>
                  <Text style={styles.text5}>Upload pictures and videos</Text>
                </View>

              )}

            {/* end here show selected file  */}
            {uploading ? (
              <View style={{ height: 10, width: '100%', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator color="red" size={'large'} /></View>
            ) : (
              <View />
            )}
            <View style={styles.iconContainer}>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleImagePicker}>
                  <Feather name="image" size={24} color="#FE0175" />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>Image</Text>
              </View>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={handleVideoPicker}>
                  <Feather name="video" size={24} color="#FE0175" />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>Video</Text>
              </View>
              <View style={styles.iconButtonContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="file-text" size={24} color="#FE0175" />
                </TouchableOpacity>
                <Text style={styles.iconLabel}>File</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addPostButton} onPress={() => {
              if (postId) {
                handleEditPost(postId);
              } else {
                handleAddPost();
              }
            }}>
              <Text style={styles.addPostButtonText}>{postId ? 'Update Post' : 'Add Post'}</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25.86,
    height: 23.04,
    alignSelf: 'center',
    tintColor: 'white'
  },
  toolbar: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FE0175'
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 999,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8
  },
  postImage: {
    width: 48,
    height: 48,
    resizeMode: 'cover'
  },
  videoStyle: {
    width: 48,
    height: 48,
    resizeMode: 'contain'
  },
  videoNameStyle: {
    width: '50%',
    marginLeft: 10,
    height: 48,
    alignContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  videoDeleteStyle: {
    marginLeft: 10,
    height: 48,
    alignContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    padding: 16,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 50,
    color: 'white'
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    width: "92%",
    height: 50,
    flexDirection: 'row',
    borderColor: '#CCCCCC',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  textArea: {
    fontSize: 16,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 5
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
  iconButtonContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  text5: {
    fontSize: 17, fontWeight: '500',
    color: '#FE0175',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FE0175',
    marginBottom: 5,
  },
  iconLabel: {
    color: '#FE0175',
  },
  addPostButton: {

    padding: 10,
    alignItems: 'center',
    marginTop: 32,
    marginLeft: '4%',
    marginRight: '4%',
    width: "92%",
    backgroundColor: '#FE0175',
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    marginBottom: 50
  },
  addPostButtonText: {
    color: 'white',
    fontWeight: 'bold',

  },
});

export default CreatePost;