import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { db } from './firebase';
import { getDocs, collection } from 'firebase/firestore';
const Schemes = ({ navigation }) => {
  const [schemes, setSchemes] = useState([]);
  const fetchSchemesFromFirebase = async (setSchemes) => {
    try {
      const schemesCollection = await getDocs(collection(db, 'schemes')); // Replace 'schemes' with your Firestore collection name
      const schemeData = schemesCollection.docs.map((doc) => doc.data());
      setSchemes(schemeData);
    } catch (error) {
      console.error('Error fetching scheme data: ', error);
    }
  };
  useEffect(() => {
    fetchSchemesFromFirebase(setSchemes);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/kcrpic.jpg')}
          style={styles.image}
        />
      </View>
      <Text style={styles.header}>Schemes implementing in the constituency</Text>
      <View style={styles.gridRow}>
        {schemes.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() => {
              navigation.navigate('PDFViewerScreen', { pdfUrl: item.uri });
            }}
          >
            <View style={styles.buttonContainer}>
              <Image
                source={require('./assets/telangana.png')}
                style={styles.buttonImage}
              />
              <Text style={styles.gridItemText}>{item.SchemeName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'mistyrose',
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#FE0175",
  },
  gridRow: {
    flexDirection: 'row', // Display items in a row
    flexWrap: 'wrap',     // Allow items to wrap to the next row
    justifyContent: 'space-between', // Adjust this as needed
    marginBottom: 10,
  },
  gridItem: {
    width: '33%', // Three items per row, adjust as needed
    aspectRatio: 1, // Maintain a 1:1 aspect ratio for square boxes
  },
  buttonContainer: {
    aspectRatio: 1, // Maintain a 1:1 aspect ratio for square boxes
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffb6c1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,

  },
  buttonImage: {
    width: '50%', // Adjust the image size as needed
    height: '50%', // Adjust the image size as needed
    resizeMode: 'contain', // Adjust the image resizeMode as needed
  },
  gridItemText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: 'contain',
  },
});

export default Schemes;