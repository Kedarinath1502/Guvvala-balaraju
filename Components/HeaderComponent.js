import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Pressable,
    TouchableOpacity,
    Image,
    Alert,
    StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth } from '../../firebase';

const HeaderComponent = ({ navigation }) => {
    const handleSignOut = async () => {
        if (!auth.currentUser) {
            Alert.alert('Signin', 'You are not signed in', [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);
            return console.log('User not logged in');
        }
        else {
            try {
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                    {
                        text: 'OK',
                        onPress: async () => {
                            await auth.signOut();
                            console.log('User signed out successfully');
                            navigation.navigate('Login');
                        },
                    },
                ]);
            } catch (error) {
                console.error('Error signing out:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.headerContainer}>
            <StatusBar
                barStyle="light-content" 
                backgroundColor="#FE0175" 
            />
            <View style={styles.header}>
                <Pressable
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('ProfilePage')}
                >
                    <Feather name="user" size={24} color="white" />
                </Pressable>
                <View style={styles.profileImageContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RameshHazari')}
                    >
                        <Image
                            source={require('../../assets/guvvala.jpeg')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('SearchScreen')}
                >
                    <Feather name="search" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('Notification')}
                >
                    <Feather name="clipboard" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={handleSignOut} >
                    <Feather name="log-out" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        borderWidth: 1, 
        borderColor: 'black', 
    },
    headerContainer: {
        backgroundColor: '#FE0175',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    profileImageContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    iconButton: {
        paddingHorizontal: 10,
    },
});

export default HeaderComponent;