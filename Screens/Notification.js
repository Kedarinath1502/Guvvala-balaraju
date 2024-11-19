import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import FooterComponent from './Components/Main/FooterComponent';

const Notification = ({ navigation }) => {
  const handleFeedbackSurveyClick = () => {
    const feedbackSurveyUrl = 'https://forms.gle/6ZHkQYeBGiwLNAMKA'; 
    Linking.openURL(feedbackSurveyUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />
      <ScrollView style={styles.videoContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/guvvalabalaraju.png')} 
            style={styles.image}
          />
        </View>
        <Text style={styles.label}>                     Guvvala Balaraju (MLA)</Text>
        <Text style={styles.labelone}>                    Achampet Constituency</Text>
        <Text style={styles.flabel}>Feed back survey :</Text>
        <TouchableOpacity onPress={handleFeedbackSurveyClick}>
          <Feather name='arrow-right-circle' size={24} color={"red"}><Text style={styles.clabel}>   Click here</Text></Feather>
        </TouchableOpacity>
      </ScrollView>

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
  flabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '10%',
    color: 'red',
  },
  clabel: {
    fontSize: 22,
    color: 'blue', 
    
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  labelone: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FE0175',
  },
  imageContainer: {
    alignItems: 'center', 
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
});

export default Notification;
