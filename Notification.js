import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import FooterComponent from './Components/Main/FooterComponent';

const Notification = ({ navigation }) => {
  const handleFeedbackSurveyClick = () => {
    const feedbackSurveyUrl = 'https://forms.gle/6ZHkQYeBGiwLNAMKA'; // Your feedback survey URL
    Linking.openURL(feedbackSurveyUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent navigation={navigation} />

      {/* Content: Video List */}
      <ScrollView style={styles.videoContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/guvvalabalaraju.png')} // Replace with the actual image file path
            style={styles.image}
          />
        </View>
        <Text style={styles.label}>                     Guvvala Balaraju (MLA)</Text>
        <Text style={styles.labelone}>                    Achampet Constituency</Text>
        <Text style={styles.flabel}>Feed back survey :</Text>

        {/* Clickable label for the feedback survey */}
        <TouchableOpacity onPress={handleFeedbackSurveyClick}>
          <Feather name='arrow-right-circle' size={24} color={"red"}><Text style={styles.clabel}>   Click here</Text></Feather>

        </TouchableOpacity>

        {/* ... Your video content goes here ... */}
      </ScrollView>

      {/* Footer */}
      <FooterComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FE0175',
    flex: 1,
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
    padding: "10%",
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
    width: 80,
    height: 60,
    marginLeft: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space evenly between items
    alignItems: 'center', // Align items vertically
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF', // Pink background for the footer
    // Shadow properties
    elevation: 10, // For Android shadow
    shadowColor: 'black', // For iOS shadow
    shadowOffset: { width: 4, height: 6 }, // For iOS shadow
    shadowOpacity: 0.2, // For iOS shadow
  },

  footerButton: {
    alignItems: 'center',
    color: '#FE0175',
  },
  iconLabel: {
    alignItems: 'center',
    color: '#FE0175',
  },
  flabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '10%',
    color: 'red',
  },
  clabel: {
    fontSize: 22,
    color: 'blue', // You can customize the color
    //textDecorationLine: 'underline'
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    //justifyContent:'center',
  },
  labelone: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FE0175',
  },
  imageContainer: {
    alignItems: 'center', // Center the image horizontally
    marginBottom: 10,
    //marginTop:'10%',

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Fit the image within the container

  },
});

export default Notification;
