import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import HeaderComponent from './Components/Main/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import Icon1 from 'react-native-vector-icons/Octicons';

const openGoogleMaps = () => {
  const mapUrl = 'https://goo.gl/maps/PpWhELrzKWDYyKEAA';

  Linking.openURL(mapUrl).catch((err) => console.error('An error occurred', err));
};

const fetchButtonsFromFirebase = async (setButtons) => {
  try {
    const buttonsCollection = await getDocs(collection(db, 'buttons'));
    const buttonData = buttonsCollection.docs.map((doc) => doc.data());
    setButtons(buttonData);
  } catch (error) {
    console.error('Error fetching button data: ', error);
  }
};

const Constituency = ({ navigation }) => {
  const [buttons, setButtons] = useState([]);
  const iconColors = ['#3C40C6', '#32CD32', '#FF69B4', '#E74C3C', '#FF5733', '#9932CC'];

  useEffect(() => {
    fetchButtonsFromFirebase(setButtons);
  }, []);

  const handleTabPress = (tabName) => {
    navigation.navigate(tabName);
  };

  const renderButtons = (buttons) => {
    return (
      <View style={styles.horizontalButtonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.subButton, { marginBottom: 20 }]}
            onPress={() => {
              // Use the dynamically fetched button link URL
              navigation.navigate('PDFViewerScreen', { pdfUrl: button.buttonLink });
            }}
          >
            <Icon name={button.buttonIcon} size={34} color={iconColors[index % iconColors.length]} />
            <Text style={styles.subButtonText}>{button.buttonName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation} />

      <ScrollView contentContainerStyle={styles.subButtonsContainer} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.mapButton} onPress={openGoogleMaps}>
          <Feather name="map-pin" size={34} color="#E0E0E0" />
          <Text style={styles.mapButtonText}>ACHAMPET CONSTITUENCY</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/mapacham.jpg')} style={styles.image} />
        </View>

        <TouchableOpacity style={styles.subButtonTitle} onPress={() => navigation.navigate('Schemes')}>
          <Image source={require('./assets/telangana.png')} style={styles.image1} />
          <Text style={styles.subButtonTextone}>Information of All Schemes in Achampet Constituency</Text>
        </TouchableOpacity>

        <Text style={styles.textInfo}>
          Achampet Constituency Info <Image source={require('./assets/finger_down.jpg')} style={styles.buttonImage} />
        </Text>
        {renderButtons(buttons)}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Welcome')}>
          <Icon name="home" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Videos')}>
          <Icon name="camera-retro" size={25} color="#FE0175" />
          <Text style={styles.iconLabel}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton, styles.activeFooterButton]} onPress={() => handleTabPress('Constituency')}>

          <Icon1 name="location" size={25} color="#c0c0c0" />
          <Text style={[styles.iconLabel, styles.activeIconLabel]}>Constituency</Text>
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
  container: {
    backgroundColor: '#FE0175',
    flex: 1,
  },
  subButtonsContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  mapButton: {
    backgroundColor: '#FE0175',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  mapButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  image1: {
    width: 50,
    height: 50,
  },
  subButtonTitle: {
    width: '100%',
    backgroundColor: '#ffebf0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 30,
  },
  subButton: {
    width: '30%',
    backgroundColor: '#ffebf0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginBottom: 10,
  },
  subButtonTextone: {
    fontSize: 14,
    color: '#FE0175',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  subButtonText: {
    fontSize: 10,
    color: '#FE0175',
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
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
    color: '#FE0175',
  },
  activeIconLabel: {
    color: '#c0c0c0',
  },
  activeFooterButton: {
    color: '#c0c0c0',
  },
  horizontalButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  textInfo: {
    alignItems: 'center',
    fontSize: 18,
    color: '#FE0175',
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default Constituency;