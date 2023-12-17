
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Octicons';
import { auth, db } from '../../firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';

const FooterComponent = ({ navigation, videos }) => {

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
    };

    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const user = auth.currentUser;

        if (user) {
            // User is authenticated
            const userId = user.uid;
            console.log(userId);

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
                            if (userData.role === 'Admin') {
                                setIsAdmin(true)
                                console.log('User Data:', userData.role);
                            } else {
                                setIsAdmin(false);
                                console.log('User Data:',);
                            }

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

    return (
        <SafeAreaView style={styles.footerContainer}>

            {isAdmin ? (
                <TouchableOpacity style={styles.createPostButton} onPress={() => {
                    if (videos) {
                        navigation.navigate('UploadVideos', { postId: null })
                    } else {
                        navigation.navigate('CreatePost', { postId: null })
                    }

                }}
                >
                    <Feather name="plus" size={24} color="white" />
                </TouchableOpacity>
            ) : (
                <View />
            )}
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
            <TouchableOpacity style={styles.footerButton} onPress={() => handleTabPress('Network')}>
                <Icon name="users" size={25} color="#FE0175" />
                <Text style={styles.iconLabel}>Network</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F4F4F4',

    },

    footerButton: {
        alignItems: 'center',
        color: '#FE0175',
    },
    iconLabel: {
        alignItems: 'center',
        color: '#FE0175',
    },
    createPostButton: {
        backgroundColor: '#FE0175', // Orange color for the button
        width: 70,
        height: 70,
        borderRadius: 50, // Make it round
        justifyContent: 'center', // Center the plus symbol vertically
        alignItems: 'center', // Center the plus symbol horizontally
        position: 'absolute',
        bottom: '300%', // Adjust the distance from the bottom
        right: 20, // Adjust the distance from the left
    },
});

export default FooterComponent