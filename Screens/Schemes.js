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
      const schemesCollection = await getDocs(collection(db, 'schemes')); 
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
    flexDirection: 'row', 
    flexWrap: 'wrap',     
    justifyContent: 'space-between', 
    marginBottom: 10,
  },
  gridItem: {
    width: '33%', 
    aspectRatio: 1, 
  },
  buttonContainer: {
    aspectRatio: 1, 
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
    width: '50%', 
    height: '50%', 
    resizeMode: 'contain', 
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