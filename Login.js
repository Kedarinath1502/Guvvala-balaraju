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
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = ({ navigation }) => {
    const LoginSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required(''),
        password: yup.string().required('').min(6, 'your password has to have atleast 6 characters'),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values) => {
                        try {
                            setIsLoading(true); // Set loading state to true

                            await signInWithEmailAndPassword(auth, values.email, values.password);
                            console.log('User signed in successfully!! ');

                            navigation.replace('Welcome');
                        } catch (error) {
                            console.log('Login error:', error);
                            Alert.alert('Login Failed', 'Invalid email or password.')
                            // Handle login error here
                        } finally {
                            setIsLoading(false); // Set loading state back to false
                        }
                    }}
                    validationSchema={LoginSchema}
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
                                    Login Here                      <Icon name="log-in" size={30} color="#FE0175" style={styles.icon} /></Text>

                                <View style={styles.fieldContainer}>
                                    <Icon name="mail" size={20} color="#FE0175" style={styles.icon} />
                                    <Text style={styles.formLabel}>Email</Text>
                                </View>
                                <View style={styles.inputFieldContainer}>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="Enter your email"
                                        autoCapitalize='none'
                                        keyboardType="email-address"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                {errors.email && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
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
                                <View style={styles.forgotPasswordContainer}>
                                    <TouchableOpacity onPress={() => {/* Add your logic for the forgot password action */ }}>
                                        <Icon name="meh" size={20} color="#FE0175" style={styles.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => resetPassword(values.email)}>
                                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                    </TouchableOpacity>
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
                                <View style={styles.loginContainer}>
                                    <Text></Text>
                                    <Text style={styles.loginText}>
                                        Dont have an account?{'    '}
                                        <Text style={styles.loginLink} onPress={() => navigation.navigate('Signup')}>        Sign Up</Text>
                                    </Text>
                                </View>
                                <Text style={styles.orlabel}> Skip Login Here </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.skipButton}>
                                    <Text style={styles.skipButtonText}>Skip</Text>
                                </TouchableOpacity>
                            </ScrollView>

                        </>
                    )}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const resetPassword = (email) => {

    sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert('Password Reset Email Sent', 'Please check your email for instructions on how to reset your password.');
        })
        .catch((error) => {
            Alert.alert('Password Reset Failed', error.message);
        });
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
        marginBottom: 50,
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
    loginButton: isValid => ({
        backgroundColor: isValid ? '#FE0175' : '#CCCCCC',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.9,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,
    }),
    forgotPasswordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 15,
    },

    forgotPasswordText: {
        fontSize: 16,
        color: '#FE0175',
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

    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    }, skipButton: {
        backgroundColor: '#FE0175',
        width: '100%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.9,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        elevation: 2,

    },
    skipButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginLink: {
        fontWeight: 'bold',
        color: '#FE0175',
    },
    orlabel: {
        fontWeight: 'bold',
        color: 'red',
        fontSize: 14,
    },
    welcomeTextlabel: {
        color: '#FE0175',
        fontWeight: 'bold',
    }
});

export default Login;