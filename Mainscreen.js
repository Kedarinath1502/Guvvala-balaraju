import React, { useState, useEffect, useRef } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Dimensions, RefreshControl, SafeAreaView, Image, Pressable, ScrollView, Share, TextInput, FlatList, ActivityIndicator, Platform } from 'react-native';
import HeaderComponent from './Components/Main/HeaderComponent';
import FooterComponent from './Components/Main/FooterComponent';
import Hyperlink from 'react-native-hyperlink'
import { Feather } from '@expo/vector-icons';
import { auth, db } from './firebase';
import { doc, deleteDoc, getDocs, collection, where, query, updateDoc, getDoc, orderBy, limit, startAfter } from 'firebase/firestore';
import { Video } from 'expo-av';
import { BottomSheet } from 'react-native-btr';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
// Post component
const Post = ({ postId, username, profileImage, description, files, likess, comment, navigation, createdAt }) => {
    const [currentUserID, setCurrentUserId] = useState(null);
    const [likes, setLikes] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [likedByCurrentUser, setLikedByCurrentUser] = useState(false);
    const [visibleCommentSheet, setVisibleCommentSheet] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [postStatus, setPostStatus] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedProfile, setSelectedProfile] = useState('https://picsum.photos/seed/picsum/200/300');
    const [selectedUserName, setSelectedUserName] = useState('')
    const [totalComments, setTotalComments] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authUserName, setAuthUserName] = useState('');
    const [authProfileImage, setAuthProfileImage] = useState('');
    const formattedDate = createdAt ? format(createdAt, 'MMMM d, yyyy') : '';

    useEffect(() => {
        if (likess) {
            setLikes(likess);
            setTotalLikes(likess.length);
        }
        if (comment) {
            setCommentList(comment);
            // console.log(comment.length)
            setTotalComments(comment.length);
        }
    }, [likess, comment]);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            setCurrentUserId(userId);
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
                            setAuthProfileImage(userData.profileImage);
                            setAuthUserName(userData.userName);
                            if (userData.role === 'Admin') {
                                setIsAdmin(true)
                            } else {
                                setIsAdmin(false);
                            }
                        });
                    } else {
                        console.log('No matching user documents found');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.log('User is not authenticated');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch post data and likes from Firestore
                const postRef = doc(db, 'post', postId); // Use 'posts' instead of 'post'
                const docSnapshot = await getDoc(postRef);
                if (docSnapshot.exists()) {
                    const postData = docSnapshot.data();
                    // Check if the current user has already liked the post
                    const userLiked = postData.likes.some((like) => like.userId === currentUserID); // Assuming 'like' objects have a 'userId' property
                    setLikedByCurrentUser(userLiked);
                    // This logs whether the user has liked the post (true or false)
                } else {
                    console.log('error', 'user not found');
                }
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData(); // Call the async function immediately
    }, [postId, currentUserID]);

    const handleLike = async (postId) => {
        try {
            const postRef = doc(db, 'post', postId);
            // Fetch the current post data
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                if (likedByCurrentUser) {
                    // Unlike the post
                    const updatedLikes = postData.likes.filter((like) => like.userId !== currentUserID);
                    await updateDoc(postRef, { likes: updatedLikes });
                    setLikedByCurrentUser(false);
                    setTotalLikes(updatedLikes.length);
                } else {
                    // Like the post
                    const updatedLikes = [...postData.likes, { userId: currentUserID }];
                    await updateDoc(postRef, { likes: updatedLikes });
                    setLikedByCurrentUser(true);
                    setTotalLikes(updatedLikes.length);
                }
            } else {
                // console.log(postId);
                console.error("The document with postId does not exist.");
            }
        } catch (error) {
            Alert.alert('Sign in', 'Please sign in to like', [
                { text: 'cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'Sign in', onPress: async () => {
                        navigation.navigate('Login');
                    }
                }
            ]
            );
            console.error("Error updating likes:", error);
        }
    };
    const handleComment = async (postId, description, profileImage, userName) => {
        setVisibleCommentSheet(!visibleCommentSheet);
        setSelectedPostId(postId);
        setSelectedDescription(description);
        setSelectedProfile(profileImage)
        setSelectedUserName(userName);
    }
    const postComment = async () => {
        try {
            const postRef = doc(db, 'post', selectedPostId); // Assuming 'db' is your Firestore database reference
            // Fetch the current post data
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const sanitizedTextMessage = textMessage.toString();
                const updatedComments = [
                    ...postData.comments,
                    { userId: currentUserID, profileImage: authProfileImage, username: authUserName, textMessage: sanitizedTextMessage }
                ];
                await updateDoc(postRef, { comments: updatedComments }); // Update the comments field
                setTextMessage(''); // Clear the input field
                setCommentList(updatedComments); // Update the comment list state
                // You can also update the total comments count if needed
                setTotalComments(updatedComments.length);
            } else {
                console.error("The document with selectedPostId does not exist.");
            }
        } catch (error) {
            Alert.alert('Sign in', 'Please sign in to Coment', [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'Sign in', onPress: async () => {
                        navigation.navigate('Login');
                    }
                }
            ]);
            console.error("Error updating comments:", error);
        }
    }
    const handleDeleteComment = async (postId, commentId) => {
        try {
            const postRef = doc(db, 'post', postId);
            const postSnapshot = await getDoc(postRef);

            if (postSnapshot.exists()) {
                const postData = postSnapshot.data();
                const updatedComments = postData.comments.filter(comment => comment.id !== commentId);

                await updateDoc(postRef, { comments: updatedComments });
                setCommentList(updatedComments); // Update the comment list state
                setTotalComments(updatedComments.length); // Update the total comments count if needed
            } else {
                console.error("The document with postId does not exist.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };
    const handleEdit = (postId) => {
        try {
            Alert.alert('Edit Post', 'Are you sure you want to edit this post?', [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'OK', onPress: async () => {
                        console.log('Edit Pressed', postId);
                        navigation.navigate('CreatePost', { postId: postId })
                    }
                }
            ]);
        } catch (error) {
            console.error(`Error editing post with ID ${postId}:`, error);
        }

    }

    const handleDelete = async (postId) => {
        try {
            Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
                {
                    text: 'OK', onPress: async () => {
                        const postRef = doc(db, 'post', postId); // Assuming 'posts' is your collection name
                        await deleteDoc(postRef);
                    }
                }
            ]);
        } catch (error) {
            console.error(`Error deleting post with ID ${postId}:`, error);
        }
    }

    const sharePost = async (description, files) => {
        const urlsArray = files.map(file => file.url);
        const urlsString = urlsArray.join('\n');
        const message = `${description}\n${urlsString}`;
        await Share.share({ message }).catch(e => {
            Alert.alert('Post not shared', 'Something went wrong');
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.postContainer}>
                    <BottomSheet
                        visible={visibleCommentSheet}
                        onBackButtonPress={handleComment}
                        onBackdropPress={handleComment}
                    >
                        <View style={styles.commentContainer}>
                            <View style={styles.selectedPostForComment}>
                                <TouchableOpacity onPress={() => {
                                    setVisibleCommentSheet(false);
                                }} style={{ marginBottom: 8 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('./assets/arrowback.png')} style={styles.sendIcon} />
                                        <Text style={{ width: '85%', textAlign: 'center' }}> Comments</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.commentContainer2}>
                                </View>
                            </View>
                            <View style={styles.comFlatList}>
                                <FlatList
                                    scrollEnabled={true}
                                    data={commentList}
                                    renderItem={({ item, index }) => (
                                        <View key={index} style={styles.commentContainer2}>
                                            <Image source={{ uri: item.profileImage }} style={styles.userImage} />
                                            <View style={styles.commentContent}>
                                                <Text style={styles.username}>{item.username}</Text>
                                                <Text style={styles.textMessage}>{item.textMessage}</Text>
                                            </View>
                                            {(item.userId === currentUserID || isAdmin) && (
                                                <TouchableOpacity
                                                    style={styles.button}
                                                    onPress={() => handleDeleteComment(postId, item.id)}
                                                >
                                                    <Feather name="trash-2" size={14} color="black" />
                                                    <Text style={styles.actionText}>Delete</Text>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Type your comment..."
                                    value={textMessage}
                                    onChangeText={(text) => {
                                        setTextMessage(text);
                                    }}
                                />

                                <TouchableOpacity style={styles.sendButton} onPress={() => {
                                    postComment();
                                }}>
                                    <Image source={require('./assets/send.png')} style={styles.sendIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </BottomSheet>

                    <View style={styles.postHeader}>
                        <View style={styles.userInfoContainer}>

                            <View style={styles.leftContent}>
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                                <View>
                                    <Text style={styles.username}>{username}</Text>
                                    <Text style={{ color: 'red', fontSize: 12, fontWeight: '700' }} >@ MLA Achampet</Text>
                                    <Text style={{ color: 'red', fontSize: 11 }}>{formattedDate}</Text>
                                </View>
                            </View>
                        </View>
                        {isAdmin ? <View style={styles.rightContent}>
                            {/* Edit Button */}
                            <TouchableOpacity
                                style={[styles.button]}
                                onPress={() => handleEdit(postId)}
                            >
                                <Feather name='edit' size={14} color='black' tintColor="white" />
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>

                            {/* Delete Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleDelete(postId)}
                            >
                                <Feather name='trash-2' size={14} color='black' />
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View> : <View />}

                    </View>
                    <View style={{ marginTop: 8 }}>
                        <Hyperlink linkDefault={true} >
                            <Text>{description}</Text>
                        </Hyperlink>
                    </View>
                    <View>
                        <ScrollView style={styles.postContainer}
                            horizontal>
                            {files.map((file) => (
                                <View>
                                    {file.mediaType === 'video' ?
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('MediaListScreen', { files: files });
                                        }}>
                                            <Video
                                                source={{ uri: file.url }}
                                                style={styles.videoStyle} // Adjust dimensions as needed
                                                useNativeControls={true}
                                                resizeMode='contain'
                                                isLooping={false}
                                                onError={() => {
                                                    console.log('Image loading failed'); // Handle the error, e.g., show a placeholder or an error message
                                                }}
                                            />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate('MediaListScreen', { files: files });
                                        }}>
                                            <Image
                                                source={{ uri: file.url ? file.url : 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI' }}
                                                style={styles.postImage}
                                                resizeMode="stretch"
                                            />
                                        </TouchableOpacity>

                                    }
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.actionButton}>
                        <View style={styles.centeredContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleLike(postId)}
                            >
                                <Feather
                                    name='thumbs-up'
                                    size={24}
                                    color={likedByCurrentUser ? 'red' : 'black'}
                                />
                                <Text style={styles.actionText}>{totalLikes} likes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleComment(postId, description, profileImage, username)}
                            >
                                <Feather name='message-circle' size={24} color='black' />
                                <Text style={styles.actionText}>{totalComments} comments</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => sharePost(description, files)}
                            >
                                <Feather name='share-2' size={24} color='black' />
                                <Text style={styles.actionText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
// Main screen with posts
const Mainscreen = ({ route }) => {
    const navigation = useNavigation();
    const { newPost } = route?.params || {};
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);

    const postLimit = 3;

    const scrollViewRef = useRef(null);

    // Function to fetch initial posts
    const fetchPosts = async () => {
        try {
            const postsCollection = collection(db, 'post');
            const queryssss = query(
                postsCollection,
                orderBy('createdAt', 'desc'),
                limit(postLimit)
            );
            const querySnapshot = await getDocs(queryssss);
            const postsData = [];
            querySnapshot.forEach((doc) => {
                postsData.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setPosts(postsData);
            if (querySnapshot.docs.length > 0) {
                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
            } else {
                setLastVisible(null);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const fetchMorePosts = async () => {
        if (lastVisible) {
            try {
                const postsCollection = collection(db, 'post');
                const queryssss = query(
                    postsCollection,
                    orderBy('createdAt', 'desc'),
                    startAfter(lastVisible.data().createdAt),
                    limit(postLimit)
                );
                const querySnapshot = await getDocs(queryssss);
                const newPosts = [];
                querySnapshot.forEach((doc) => {
                    newPosts.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setPosts([...posts, ...newPosts]);

                if (querySnapshot.docs.length > 0) {
                    setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
                } else {
                    setLastVisible(null);
                }
            } catch (error) {
                console.error('Error fetching more posts:', error);
            }
        }
    };
    const handleLoadMore = () => {
        fetchMorePosts();
    };
    useEffect(() => {
        fetchPosts();
    }, []);

    const renderFooter = () => {
        if (!isLoading && lastVisible) {
            return (
                <ActivityIndicator
                    style={{ marginVertical: 20 }}
                    size="large"
                    color="red"
                />
            );
        }
        return null;
    };

    return (
        <View style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <HeaderComponent navigation={navigation} />
            {isLoading ? (
                <ActivityIndicator
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    size="large"
                    color="red"
                />
            ) : (
                <FlatList
                    ref={scrollViewRef}
                    contentContainerStyle={{ minHeight: '100%' }}
                    data={posts} // Use the 'posts' data array
                    keyExtractor={(item) => item.id} // Specify a unique key for each item
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={fetchPosts} // Refresh the initial posts
                            tintColor="red"
                        />
                    }
                    onEndReached={handleLoadMore} // Load more posts when reaching the end
                    onEndReachedThreshold={0.1}
                    // Adjust the threshold as needed
                    renderItem={({ item }) => (
                        // Render your Post component with 'item' as the prop
                        <Post
                            key={item.id}
                            postId={item.id}
                            username={item.username}
                            profileImage={item.profileImage}
                            description={item.description}
                            files={item.files}
                            likess={item.likes}
                            comment={item.comments}
                            navigation={navigation}
                            createdAt={item.createdAt}
                        />
                    )}
                    ListFooterComponent={renderFooter}
                />
            )}

            {/* Footer */}
            <FooterComponent navigation={navigation} videos={false} />
        </View>
    );
};

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
    },
    centeredContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribute buttons equally
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.9, // Responsive width
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    actionText: {
        marginLeft: 8,
    },
    selectedPostForComment: {
        backgroundColor: '#eeee',
        paddingTop: 16
    },
    commentContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    textMessage: {
        fontSize: 16,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    postContainer: {
        backgroundColor: 'white',
        shadowColor: '#00000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 10,
        marginBottom: 8,
        marginLeft: 6,
        marginRight: 6,

    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: '-6%',
    },

    userInfoContainer: {
        flexDirection: 'column', // Make content appear vertically
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 32,
        fontWeight: '800'
    },

    creationDateText: {
        fontSize: 12, // Adjust the font size as needed
        color: 'gray', // Customize the text color
    },
    postImage: {
        height: 375,
        width: Dimensions.get('window').width * 0.94,
        marginTop: 8,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },
    videoStyle: {
        height: 375,
        width: Dimensions.get('window').width * 0.94,
        marginTop: 8,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,
    },

    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '10%', // Add margin between buttons
    },
    commentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '10%', // Add margin between buttons
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '10%',
    },
    actionText: {
        marginLeft: 5,
    },
    caption: {
        marginTop: 5,
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
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    iconButton: {
        paddingHorizontal: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 0.5,
        borderColor: 'black',
        top: "5%",
    },
    footerButton: {
        alignItems: 'center',
        color: '#FE0175',
    },
    iconLabel: {
        alignItems: 'center',
        color: '#FE0175',
    },
    profileImageContainer: {
        flex: 1,
        alignItems: 'center',
    },
    searchButton: {
        paddingHorizontal: 10,
    },
    logoutButton: {
        paddingHorizontal: 10,
    },
    createPostButton: {
        backgroundColor: '#FE0175', // Orange color for the button
        width: 70,
        height: 70,
        borderRadius: 50, // Make it round
        justifyContent: 'center', // Center the plus symbol vertically
        alignItems: 'center', // Center the plus symbol horizontally
        position: 'absolute',
        bottom: 70, // Adjust the distance from the bottom
        right: 20, // Adjust the distance from the left
    },
    emptySpace: {
        flex: 1,
    },
    iconLabel: {
        alignItems: 'center',
        color: '#FE0175',
    },
    telanganaImage: {
        height: 40,
        width: 40,
        top: -5,

    },
    comFlatList: {
        marginBottom: 64,
        padding: 16,
        height: 400

    }
    ,
    commentContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#fff',
    },
    comment: {
        fontSize: 16,
        marginBottom: 8,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 10,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        paddingHorizontal: 16,
        borderRadius: 20

    },
    sendButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'red',

    },
    sendIcon: {
        width: 24,
        height: 24,

    },
    constituency: {
        color: '#FE0175',
        top: "55%",
        marginLeft: 16,
    },
    creationDateText: {
        color: "red",
        top: "-50%",
        marginLeft: "28%",

    },
});

export default Mainscreen;