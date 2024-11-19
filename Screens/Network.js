import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Linking, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Octicons';

const Network = ({ navigation }) => {
  const imageLinks = [
    { id: 1, title: 'Facebook', link: 'https://www.facebook.com/GuvvalaBalarajuBRS', icon: 'facebook', iconColor: '#1877F2', image: require('./assets/guvvalasocial.png') },
    { id: 2, title: 'Twitter', link: 'https://twitter.com/GBalarajuTrs?s=20', icon: 'twitter', iconColor: '#00acee', image: require('./assets/guvvalasocial.png') },
    { id: 3, title: 'Instagram', link: 'https://www.instagram.com/balarajuguvvala/?hl=en', icon: 'instagram', iconColor: '#d62976', image: require('./assets/guvvalasocial.png') },
    { id: 4, title: 'YouTube', link: 'https://www.youtube.com/watch?v=STN3scPBzH0', icon: 'youtube', iconColor: '#CD201F', image: require('./assets/guvvalasocial.png') },
  ];

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <HeaderComponent navigation={navigation} />

      
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.one} > MLA All Social Media  Links</Text>
          {imageLinks.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={styles.imageItem}
              onPress={() => Linking.openURL(link.link)}
            >
              <Image source={link.image} style={styles.image} />
              <View style={styles.iconLabelContainer}>
                <Feather name={link.icon} size={34} color={link.iconColor} />
                <Text style={[styles.linkTitle, { color: link.iconColor }]}>{link.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.naduNeduButtonContainer}>
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => {
                navigation.navigate('Weblinks');
              }}
            >
              <Text style={styles.mapButtonText}>BRS Govt Welfare and Development Programs all Official Web Links</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      
      <View style={styles.spacer} />


      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Welcome')}>
          <Icon name="home" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Videos')}>
          <Icon name="camera-retro" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Constituency')}>
          <Icon1 name="location" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Constituency</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Nadunedu')}>
          <Icon name="signal" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Nadu-Nedu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.activeFooterButton]}
          onPress={() => handleTabPress('Network')}
        >
          <Icon name="users" size={25} color="#c0c0c0" />
          <Text style={[styles.iconLabel, styles.activeIconLabel]}>Network</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  imageItem: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  linkTitle: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    flex: 1,
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
  naduNeduButtonContainer: {
    padding: 10,
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, 
    marginBottom: 5, 
  },
  mapButton: {
    padding: 10,
    backgroundColor: '#FE0175',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: "10%",
    borderWidth: 0.9,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
  },

  one: {
    fontSize: 22,
    color: '#FE0175',
    fontWeight: 'bold',
    marginBottom: "10%",
  },
  mapButtonText: {
    color: "white",
    fontWeight: "bold",
  }
});

export default Network;