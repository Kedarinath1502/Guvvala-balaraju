import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Pressable, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mainscreen from './Mainscreen';
import CreatePost from './Createpost';
import ProfilePage from './ProfilePage';
import RameshHazari from './RameshHazari';
import Network from './Network';
import Videos from './Videos';
import VideoScreen from './VideoScreen';
import Nadunedu from './Nadunedu';
import Notification from './Notification';
import Login from './Login';
import Signup from './Signup';
import Constituency from './Constituency';
import ImageScreen from './ImageScreen';
import MediaListScreen from './MediaListScreen';
import Schemes from './Schemes';
import UploadVideos from './UploadVideos';
import SearchScreen from './Searchscreen';
import PDFViewerScreen from './PDFViewerScreen';
import SplashScreen from './SplashScreen';
import Weblinks from './Weblinks';


const Stack = createStackNavigator();

const Navigation = ({ navigation }) => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="Welcome" component={Mainscreen} options={{ headerShown: false }} />
                <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ headerShown: false }} />
                <Stack.Screen name="RameshHazari" component={RameshHazari} options={{ headerShown: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name="Network" component={Network} options={{ headerShown: false }} />
                <Stack.Screen name="Nadunedu" component={Nadunedu} options={{ headerShown: false }} />
                <Stack.Screen name='PDFViewerScreen' component={PDFViewerScreen} options={{ headerShown: false }} />
                <Stack.Screen name="UploadVideos" component={UploadVideos} options={{ headerShown: false }} />
                <Stack.Screen name="Videos" component={Videos} options={{ headerShown: false }} />
                <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerShown: false }} />
                <Stack.Screen name="ImageScreen" component={ImageScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MediaListScreen" component={MediaListScreen} options={{ headerShown: true }} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Constituency" component={Constituency} options={{ headerShown: false }} />
                <Stack.Screen name="Weblinks" component={Weblinks} />
                <Stack.Screen name="Schemes" component={Schemes} options={{
                    headerTitleStyle: {
                        color: "white",
                        fontSize: 20,
                    },
                    headerTitle: "Constituency Schemes",
                    headerStyle: {
                        backgroundColor: "#FE0175",
                    }
                }} />
                <Stack.Screen name="Login" component={Login}
                    options={{
                        headerTitle: "Jai Telangana..!",
                        headerTitleAlign: "left",

                        headerTitleStyle: {
                            color: "#FE0175",
                            fontSize: 20,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    // Add the action you want when the "smile" icon is pressed
                                }}
                            >

                                <Image source={require('./assets/kcr.png')} style={styles.telanganaImage} />
                            </TouchableOpacity>
                        ),
                        headerRightContainerStyle: {
                            paddingRight: 10, // Adjust the spacing from the right
                        },
                    }} />
                <Stack.Screen name="Signup" component={Signup}
                    options={{
                        headerTitle: "Jai Telangana...!",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            color: "#FE0175",
                            fontSize: 20,
                        },
                        headerRight: () => (
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    // Add the action you want when the "smile" icon is pressed
                                }}
                            >

                                <Image source={require('./assets/telangana.png')} style={styles.telanganaImage} />
                            </TouchableOpacity>
                        ),
                        headerRightContainerStyle: {
                            paddingRight: 10, // Adjust the spacing from the right
                        },
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer >
    )
}
const styles = StyleSheet.create({
    telanganaImage: {
        height: 40,
        width: 40,
        top: -5,

    }
})

export default Navigation
