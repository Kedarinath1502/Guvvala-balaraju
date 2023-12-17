import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase'; // Import your initialized Firebase app

const Signup = ({ navigation }) => {
    const SignupSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .required('')
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
        email: yup.string().email('Invalid email').required(''),
        userName: yup.string().required('').min(3).max(50),
        password: yup.string().required('').min(6, 'your password has to have atleast 6 characters'),
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // This line should be outside the onSubmit function

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleCheckbox = () => {
        setIsCheckboxChecked(!isCheckboxChecked);
    };
    const onSubmit = async (values) => {
        try {
            setIsLoading(true); // Set loading state to true

            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            console.log('User account created & signed in!');
            // Store user information in Firestore
            await addDoc(collection(db, 'users'), {
                userId: user.uid,
                firstName: '',
                lastName: '',
                phoneNumber: values.phoneNumber,
                email: values.email,
                location: '',
                address: '',
                profileImage: 'https://picsum.photos/seed/picsum/200/300',
                role: 'User',
                userName: values.userName,
                // Add any other user data you want to store
            });
            console.log('User registered and information stored in Firestore');
            Alert.alert(
                'Success',
                'Registration successful. You can now login.',
                [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
            );// Navigate to the welcome screen
        } catch (error) {
            console.error('Error creating user:', error);
            Alert.alert('Error creating user:', error.message);
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <Formik
                    initialValues={{ phoneNumber: '', email: '', userName: '', password: '' }}
                    onSubmit={onSubmit}
                    validationSchema={SignupSchema}
                    validateOnMount={true}

                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <>
                            <View style={styles.profileContainer}>
                                <Image source={require('./assets/guvvala.jpeg')} style={styles.profileImage} />
                                <Text style={styles.welcomeText}>Guvvala Balaraju (MLA)</Text>
                                <Text style={styles.welcomeTextlabel}>                                  @Achampet</Text>


                            </View>

                            <ScrollView style={styles.formContainer}>
                                <Text style={styles.registerLabel}>
                                    Register Here      <Icon name="arrow-down-circle" size={30} color="#FE0175" style={styles.icon} /></Text>
                                <View style={styles.fieldContainer}>
                                    <Icon name="phone" size={20} color="#FE0175" style={styles.icon} />
                                    <Text style={styles.formLabel}>Phone Number</Text>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="Enter your phone number here"
                                        keyboardType="phone-pad"
                                        onChangeText={handleChange('phoneNumber')}
                                        onBlur={handleBlur('phoneNumber')}
                                        value={values.phoneNumber}

                                    />
                                </View>
                                {errors.phoneNumber && <Text style={{ fontSize: 10, color: 'red' }}>{errors.phoneNumber}</Text>}
                                <View style={styles.fieldContainer}>
                                    <Icon name="mail" size={20} color="#FE0175" style={styles.icon} />
                                    <Text style={styles.formLabel}>Email</Text>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="Enter your email here"
                                        autoCapitalize='none'
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}

                                    />

                                </View>
                                {errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                                <View style={styles.fieldContainer}>
                                    <Icon name="user" size={20} color="#FE0175" style={styles.icon} />
                                    <Text style={styles.formLabel}>User Name</Text>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="Enter your last user name here"
                                        onChangeText={handleChange('userName')}
                                        onBlur={handleBlur('userName')}
                                        value={values.userName}
                                    />
                                </View>
                                {errors.userName && <Text style={{ fontSize: 10, color: 'red' }}>{errors.userName}</Text>}
                                <View style={styles.fieldContainer}>
                                    <Icon name="lock" size={20} color="#FE0175" style={styles.icon} />
                                    <Text style={styles.formLabel}>Password</Text>
                                </View>

                                <View style={styles.passwordInputContainer}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Enter your password"
                                        secureTextEntry={!passwordVisible}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />

                                    <TouchableOpacity
                                        style={styles.passwordVisibilityIcon}
                                        onPress={togglePasswordVisibility}
                                    >
                                        <Icon
                                            name={passwordVisible ? 'eye' : 'eye-off'}
                                            size={20}
                                            color="#FE0175"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {errors.password && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}
                                <View style={styles.agreementContainer}>
                                    <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
                                        {isCheckboxChecked && (
                                            <Icon name="check" size={18} color="#FE0175" /> // Render check icon when checked
                                        )}
                                    </TouchableOpacity>
                                    <Text style={styles.agreementText}>
                                        I agree to the terms and conditions
                                    </Text>
                                </View>
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>
                                        Already registered?{' '}
                                        <Text
                                            style={styles.loginLink}
                                            onPress={() => navigation.navigate('Login')} // Replace 'LoginPage' with your actual login page route
                                        >
                                            Login Here
                                        </Text>
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.loginButton(isValid)}
                                    onPress={handleSubmit}
                                    disabled={isLoading} // Disable button when loading
                                >
                                    {isLoading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Icon name="arrow-right" size={20} color="black" />
                                    )}
                                </TouchableOpacity>


                            </ScrollView>
                        </>

                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffb6c1',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
        top: 10,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        width: '90%',
        marginHorizontal: '5%',
        marginTop: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    inputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    registerLabel: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        color: '#FE0175',
    },
    inputField: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        borderRadius: 10,
        paddingRight: 10,
    },
    passwordInput: {
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    passwordVisibilityIcon: {
        padding: 10,
        position: 'absolute',
        right: 12,
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15, // Increase the top margin to create space between checkbox and "Already registered?"
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderColor: '#FE0175',
        borderWidth: 2,
        marginRight: 10,
    },
    agreementText: {
        fontSize: 14,
    },
    loginText: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15, // Add margin at the bottom to separate from the next content
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        alignSelf: 'center', // Center the text horizontally
    },
    loginLink: {
        color: '#FE0175',
        //textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    welcomeTextlabel: {
        color: '#FE0175',
        fontWeight: 'bold',
    },
    loginButton: isValid => ({
        backgroundColor: isValid ? '#FE0175' : '#CCCCCC',
        width: '100%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,

    }),
});

export default Signup;