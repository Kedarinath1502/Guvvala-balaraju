import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const RameshHazari = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/guvvalabalaraju.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.label}>Guvvala Balaraju (MLA)</Text>
      <Text style={styles.labelone}>Member of the Legislative Assembly (MLA)</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('./assets/2018.jpg')} 
          style={styles.image0}
        />
      </View>
      <Text style={styles.description}>
        Guvvala Balaraju is an Indian politician who is a member of the legislative assembly representing Achampet (SC) (Assembly constituency). He belongs to Telangana Rashtra Samithi and is its official spokesperson.
      </Text>
      <Text style={styles.description}>
        Early Life: He was born in a village in Wanaparthy in Mahbubnagar district, Andhra Pradesh to Guvvala Ramulu & Bakkamma, an agricultural laborer. He went to ZPHS in Wanaparthy, graduation from New Government Degree College, Khairtabad, and LLM from PRR Law College, Hyderabad.
      </Text>
      <Text style={styles.description}>
        Career: He started working part-time with his father, who was a laborer and later became a small construction contractor. He now runs a company, GBR Infrastructure in Hyderabad.
      </Text>
      <Text style={styles.description}>
        Political career: He contested but lost to Manda Jagannath as a Member of Parliament for Nagarkurnool constituency. He won as an MLA from Achampet with nearly 12,000 votes majority in the first Telangana Legislative Elections, 2014.
      </Text>
      <Text style={styles.description}>
        Personal life: Guvvala Balaraju married Amala.
      </Text>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffb6c1',
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    top: 50,

  },
  labelone: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FE0175',
    top: "6%",
  },
  labeltwo: {
    fontSize: 24,
    fontWeight: 'bold',
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
    top: "50%",
  },
  image0: {
    top: "-10%",
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    top: "-12%",
  },

});

export default RameshHazari;
