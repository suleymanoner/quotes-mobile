import React, { useEffect, useState, memo } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { PostModel, UserModel, ErrorModel, CommentModel } from '../redux'
import { BACKGROUND_COLOR, BASE_URL } from '../utils/Config'
import moment from 'moment'
import {ApplicationState, Response, CommentAndLikeState} from '../redux';
import {connect} from 'react-redux';
import axios from 'axios'
import LottieView from "lottie-react-native";

interface CommentCardProps {
    comment: CommentModel,
    userId: number;
}


const initialUser: UserModel = {
    id: 0,
    name: "string",
    surname: "string",
    email: "string",
    password: "string",
    status: "string",
    followers: 0,
    following: 0,
    role: "string",
    created_at: new Date(),
    updated_at: new Date(),
    token_created_at: new Date(),
    account_id: 0,
}

const _CommentCard: React.FC<CommentCardProps> = ({comment, userId}) => {

    const [loading, setLoading] = useState(true)

    const date = moment(comment.created_at).fromNow();

    const [commentUser, setCommentUser] = useState<UserModel>()

    const getUser = async () => {

        if(userId) {
            const response = await axios.get<Response & UserModel>(`${BASE_URL}users/${userId}`);

            if(response.data.response) {
                setCommentUser(response.data.response)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getUser()
        return () => {
            setCommentUser(initialUser)
        }
    }, [])


    const body = () => {
        return(
            <View style={styles.container} >
                <View style={styles.top_container} >
                    <Image
                    source={{uri: commentUser?.profile_photo}}
                    style={styles.image} />
                    <Text style={styles.name} >{commentUser?.name}</Text>
                    <Text style={styles.username} > • {date}</Text>
                </View>
                <Text style={styles.comment} >{comment.comment}</Text>
            </View>
        )
    }

    
    return(
        <View >
            {
                loading ? 
                <></>:
                body()
            }
        </View>            
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    comment: {
        fontFamily: 'Roboto-Regular',
        textAlign: "left",
        marginLeft: 55,
        color: "black",
        fontSize: 15,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        margin: 5,
        borderWidth: 1,
        borderColor: "black"
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
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    postReducer: state.postReducer
});
  
const CommentCard = connect(mapToStateProps, {})(_CommentCard);

export default memo(CommentCard)