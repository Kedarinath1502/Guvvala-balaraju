import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import HeaderComponent from './Components/Main/HeaderComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Octicons';

const Nadunedu = ({ navigation }) => {

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
    };


    return (
        <SafeAreaView style={styles.container}>
            
            <HeaderComponent navigation={navigation} />
            
            <ScrollView style={styles.conceptContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('./assets/Telangana_Map.png')} 
                        style={styles.image}
                    />
                </View>
                <View>
                    <Text style={styles.one} > Telangana Nadu - Nedu </Text>
                </View>
                <View style={styles.naduNeduButtonContainer}>
                    
                    <View style={styles.rowContainer}>
                        <Image
                            source={require('./assets/finger.jpg')}
                            style={styles.buttonImage}
                        />
                        <TouchableOpacity
                            style={styles.mapButton}
                            onPress={() => {
                                
                                navigation.navigate('PDFViewerScreen', { pdfUrl: 'https://drive.google.com/file/d/1BEXi5WL2Lhi6E_I9GahnZcP9Jb6g0dDA/view' });
                            }}
                        >
                            <Text style={styles.mapButtonText}>Naadu - Nedu</Text>
                            <Text style={styles.mapButtonText}>Telangana before and after 2014</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={styles.rowContainer}>
                        <Image
                            source={require('./assets/finger.jpg')}
                            style={styles.buttonImage}
                        />
                        <TouchableOpacity
                            style={styles.mapButton}
                            onPress={() => {
                                
                                navigation.navigate('PDFViewerScreen', { pdfUrl: 'https://drive.google.com/file/d/1ff3FiSAZ_oDyb90JkNpI59LkvxVJmP8G/view' });
                            }}
                        >
                            <Text style={styles.mapButtonText}>Telangana No 1</Text>
                            <Text style={styles.mapButtonText}>Appreciations, Awards, Rewards, Ranks</Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style={styles.rowContainer}>
                        <Image
                            source={require('./assets/finger.jpg')}
                            style={styles.buttonImage}
                        />
                        <TouchableOpacity
                            style={styles.mapButton}
                            onPress={() => {
                                
                                navigation.navigate('PDFViewerScreen', { pdfUrl: 'https://drive.google.com/file/d/1GhUea-jKEJ6CfF5l1wtFn9yXLwAThdvr/view' });
                            }}
                        >
                            <Text style={styles.mapButtonText}>Telangana</Text>
                            <Text style={styles.mapButtonText}>Development Info Capsules</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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

                <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Constituency')}>
                    <Icon1 name="location" size={25} color="#FE0175" />
                    <Text style={styles.iconLabel}>Constituency</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.footerButton, styles.activeFooterButton]}
                    onPress={() => handleTabPress('Nadunedu')}
                >
                    <Icon name="signal" size={25} color="#c0c0c0" />
                    <Text style={[styles.iconLabel, styles.activeIconLabel]}>Nadu-Nedu</Text>
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
    activeIconLabel: {
        color: '#c0c0c0', 
    },
    conceptContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    conceptItem: {
        flexDirection: 'column',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FE0175',
    },
    imageContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    conceptImage: {
        resizeMode: 'cover',
        marginBottom: 10,
    },

    id0Image: {
        width: "100%",
        height: 180,
    },
    id11Image: {
        width: "100%",
        height: 140,
    },
    conceptMatterContainer: {
        flex: 1,
    },
    conceptTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "#FE0175"
    },
    conceptMatter: {
        fontSize: 16,
    },
    activeIconLabel: {
        color: '#c0c0c0',
    },
    activeFooterButton: {
        color: '#c0c0c0',
    },
    mapButtonText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'white',
    },
    naduNeduButtonContainer: {
        padding: 15,
    },
    mapButton: {
        backgroundColor: '#FE0175',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "10%",
        borderWidth: 0.9,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
    },
    buttonImage: {
        width: 30,
        height: 30,
        top: -20,
        marginRight: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        top: '10%',
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    one: {
        alignItems: 'center',
        top: '10%',
        padding: 25,
        fontSize: 22,
        color: '#FE0175',
        fontWeight: 'bold',
        shadowColor: 'black',       
        shadowOffset: { width: 1, height: 1 },  
        shadowOpacity: 0.8,        
        shadowRadius: 1,           
        elevation: 5,              
    },
    rowContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
    },
});

export default Nadunedu;