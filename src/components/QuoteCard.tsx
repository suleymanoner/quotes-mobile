import React, { useEffect, useState, memo } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { MAIN_COLOR, BACKGROUND_COLOR, BASE_URL} from '../utils/Config';
import { PostModel, UserModel, UserState, ErrorModel } from '../redux/models'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {ApplicationState, onGetPostUser} from '../redux';
import {connect} from 'react-redux';
import axios from 'axios'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';

interface QuoteCardProps {
    userReducer: UserState;
    post: PostModel,
    onTap: Function,
    userId: number,
    isImage: string,
    onGetPostUser: Function
}

const _QuoteCard: React.FC<QuoteCardProps> = ({ userReducer, post, userId, isImage, onGetPostUser }) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const date = moment(post.created_at).fromNow();

    const [postUser, setPostUser] = useState<UserModel>()


    const getUser = async () => {

        const response = await axios.get<UserModel & ErrorModel>(`${BASE_URL}users/${userId}`);

        if(response.data.id) {
            setPostUser(response.data)
        }
    }

    const onTapComment = (post_id: number) => {
        navigation.navigate('PostDetailPage', {post_id})
    }


    useEffect(() => {
        getUser()
        onGetPostUser(userId)
    }, [])

    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <Image
                source={{uri: postUser?.profile_photo}}
                style={styles.image} />
                <Text style={styles.name} >{postUser?.name}</Text>
                <Text style={styles.username} > • {date}</Text>
            </View>
            <View style={styles.post_container} >
                <Text style={styles.post_text} >{post.body}</Text>
                <Text style={styles.quote_from} >• {post.post_from}</Text>
            </View>
            {isImage ? 
            <View style={styles.image_container} >
                <Image source={{uri: post.image}}
                style={styles.post_image} />
            </View> : null}
            
            <View style={styles.comment_like_container} >
                <TouchableOpacity onPress={() => onTapComment(post.id)} >
                    <View style={styles.comment_like_inside_container} >
                        <Icon name='comment-outline' color="#00344F" size={25} />
                        <Text style={styles.comment_like_number} >{post.total_comments}</Text>
                    </View>
                </TouchableOpacity>
            
                <View style={styles.comment_like_inside_container} >
                    <TouchableOpacity>
                        <Icon name='cards-heart' color="#00344F" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.comment_like_number} >{post.total_likes}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: BACKGROUND_COLOR,
      borderColor: "black",
      borderWidth: 2,
      padding: 5,
      borderRadius: 10,
      flexDirection: "column",
    },
    top_container: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    post_container: {

    },
    image_container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    comment_like_container: {
        flexDirection: "row",
        marginTop: 2
    },
    comment_container: {
        flexDirection: "row"
    },
    comment_like_inside_container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    comment_like_number: {
        fontSize: 15,
        color: "black",
        margin: 3
    },
    post_text: {
        color: "black",
        marginLeft: 55,
        marginRight: 5,
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    quote_from: {
        color: "black",
        textAlign: "right",
        marginTop: 10,
        marginRight: 10,
        marginBottom: 5,
        fontWeight: "700",
        fontFamily: "Roboto-Regular"
    },
    name:{
      fontSize: 20,
      fontFamily: 'Roboto-Regular',
      marginTop: 11,
      color: "black",
      marginLeft: 5
    },
    username: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 5,
        color: "gray",
        fontFamily: "Roboto-Regular"
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 30,
      margin: 5,
      borderWidth: 1,
      borderColor: "black"
    },
    top_container_icon: {
      margin: 10
    },
    post_image: {
        width: '90%',
        height: undefined,
        alignItems: "center",
        borderRadius: 10,
        aspectRatio: 1,
    }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    postReducer: state.postReducer
});
  
const QuoteCard = connect(mapToStateProps, {onGetPostUser})(_QuoteCard);
  
export default memo(QuoteCard)