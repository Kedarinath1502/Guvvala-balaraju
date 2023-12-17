import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { collection, doc, getDoc, getDocs, where, query, updateDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import { app, auth, db, storage } from './firebase'; // Import your initialized Firebase app
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const ProfileSchema = yup.object().shape({
    firstName: yup.string().max(26, 'firs name has reached max length'),
    lastName: yup.string().max(10, 'last name has reached max length'),
    phoneNumber: yup.number().max(9999999999, 'Mobile number reached max length'),
    email: yup.string().email('Invalid email').required('Email is required'),
    location: yup.string().max(15, 'Location reached max length'),
    address: yup.string().max(100, 'Address reached max length'),
});
const ProfilePage = ({ route }) => {
    // const mobileNo = route?.params?.mobileNo || '';
    // const email = route?.params?.email || '';
    const [mediaType, setMediaType] = useState('image');
    const [userData, setUserData] = useState({});
    const [loading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [role, setRole] = useState('');
    const [userName, setUserName] = useState('');

    const handleRegister = async (values) => {
        try {
            setIsLoading(true); // Set loading state to true
            const userId = auth.currentUser.uid;
            const updatedData = {
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                email: values.email,
                location: values.location,
                address: values.address,
                profileImage: profileImage, // Make sure profileImage and role are defined elsewhere
                role: role,
                userName: userName,
            };

            // Reference to the 'users' collection in Firestore
            const usersCollection = collection(db, 'users');

            // Create a query to find the document where 'userId' field matches the current user's ID
            const queryCondition = where('userId', '==', userId);

            // Fetch the user's document(s) that match the query condition
            const querySnapshot = await getDocs(query(usersCollection, queryCondition));

            // Check if any documents match the query
            if (!querySnapshot.empty) {
                // Assuming there's only one document that matches the query
                const userDoc = querySnapshot.docs[0];

                // Update the user's data in Firestore
                await updateDoc(userDoc.ref, updatedData);

                setIsLoading(false); // Set loading state back to false
                console.log('User profile updated successfully');
                Alert.alert('Success', 'Profile updated successfully.');
            } else {
                setIsLoading(false); // Set loading state back to false
                console.log('No matching user documents found');
                Alert.alert('Error', 'No matching user documents found.');
            }
        } catch (error) {
            setIsLoading(false); // Set loading state back to false
            console.error('Error updating profile:', error);
            Alert.alert('Error updating profile:', error.message);
        }
    };



    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            // User is authenticated
            const userId = user.uid;
            console.log(userId);
            // Define a reference to the 'users' collection in Firestore
            const usersCollection = collection(db, 'users');

            // Create a query to get user data where userId === userId
            const queryCondition = where('userId', '==', userId);
            // Fetch the user's data from Firestore using the query
            getDocs(query(usersCollection, queryCondition))
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // Documents exist, you can access the user's data
                        const userData = querySnapshot.docs[0].data();
                        console.log('Fetched user data:', userData);
                        setUserData(userData);
                        // Set the state variables here

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

    useEffect(() => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setPhoneNumber(userData.phoneNumber);
        setEmail(userData.email);
        setLocation(userData.location);
        setAddress(userData.address);
        setProfileImage(userData.profileImage);
        setRole(userData.role);
        setUserName(userData.userName);

    }, [userData])

    const handleImagePicker = async () => {
        setMediaType('image');
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false, // Allow multiple image selection
        });

        if (!result.canceled) {
            for (let i = 0; i < result.assets.length; i++) {
                await uploadMedia(result.assets[i].uri);
            }
        }
    };
    const uploadMedia = async (uploadUri) => {
        if (uploadUri != null) {
            let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
            const extension = fileName.split('.').pop();
            const name = fileName.split('.').slice(0, -1).join('.');
            fileName = 'post/' + name + Date.now().toString() + '.' + extension;
            setIsLoading(true);
            const blob = await fetch(uploadUri).then(response => response.blob());
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, blob, extension);
            uploadTask.on('state_changed', (taskSnapshot) => {
                const progress = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
                console.log('upload is ' + progress + "% done");
                switch (taskSnapshot.state) {
                    case 'paused':
                        console.log('upload is paused');
                        break;
                    case 'running':
                        console.log('upload is running');
                        break;
                }
            }, (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        console.log('user not authorized');
                        break;
                    case 'storage/canceled':
                        console.log('user cancled uploading');
                        break;
                    case 'storage/unknown':
                        console.log('unknow error');
                        break;
                }
                setIsLoading(false);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setProfileImage(downloadUrl);
                    console.log('uploaded file url is here : ', downloadUrl);
                    setIsLoading(false);
                })

                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
            Alert.alert('Select an image again');
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior for iOS and 'height' behavior for Android
        >
            <Formik
                initialValues={userData}
                onSubmit={(values) => handleRegister(values)}
                validationSchema={ProfileSchema}
                validateOnMount={true}
                enableReinitialize={true}
            >
                {({ handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.formContainer}>
                                <View style={styles.headerContainer}>
                                    <Text style={styles.header}>Create Your Profile</Text>
                                    <TouchableOpacity style={styles.cameraIconContainer} onPress={handleImagePicker}>
                                        {profileImage != null ? <Image source={{ uri: profileImage != null ? profileImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={{ height: 64, width: 64, borderRadius: 50 }} />
                                            : <Feather name="camera" size={50} color="#FE0175" />}

                                        <Text style={styles.label}>Update Profile</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>First Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your first name"
                                        onChangeText={handleChange('firstName')}
                                        value={values.firstName}
                                    />
                                    {errors.firstName && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.firstName}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Last Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your last name"
                                        onChangeText={handleChange('lastName')}
                                        value={values.lastName}
                                    />
                                    {errors.lastName && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.lastName}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Mobile No</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your mobile number"
                                        onChangeText={handleChange('phoneNumber')}
                                        value={values.phoneNumber}
                                    />
                                    {errors.phoneNumber && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.phoneNumber}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Email ID</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your email"
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                    />
                                    {errors.email && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.email}
                                        </Text>
                                    )}
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.inputContainer}>
                                        <Feather name="search" size={24} color="#FE0175" />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Village/Mandal/Division/States"
                                            onChangeText={handleChange('location')}
                                            value={values.location}
                                        />
                                        {errors.location && (
                                            <Text style={{ fontSize: 10, color: 'red' }}>
                                                {errors.location}
                                            </Text>
                                        )}
                                    </View>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your address"
                                        onChangeText={handleChange('address')}
                                        value={values.address}
                                    />
                                    {errors.address && (
                                        <Text style={{ fontSize: 10, color: 'red' }}>
                                            {errors.address}
                                        </Text>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.registerButton(isValid)}
                                    onPress={handleSubmit}
                                    disabled={!isValid}
                                >
                                    {loading ? (
                                        <View style={{ height: 24, width: '100%', alignContent: 'center', alignItems: 'center' }}><ActivityIndicator color="white" size={'large'} /></View>
                                    ) : (
                                        <Text style={styles.registerButtonText}>Register</Text>
                                    )}

                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>
                )}
            </Formik>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    formContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F4F4F4',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'below',
        marginBottom: 50,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cameraIconContainer: {
        marginLeft: -150,
        top: 50,
        alignItems: 'center',
    },
    field: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    input: {
        fontSize: 16,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    registerButton: isValid => ({
        backgroundColor: isValid ? '#FE0175' : '#CCCCCC',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    }),
    registerButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ProfilePage;