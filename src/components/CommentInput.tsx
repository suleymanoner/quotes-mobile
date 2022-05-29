import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { PostModel, UserModel, ErrorModel, CommentModel } from '../redux'
import { BACKGROUND_COLOR, BASE_URL, MAIN_COLOR } from '../utils/Config'
import {ApplicationState, onMakeComment} from '../redux';
import {connect} from 'react-redux';
import {ButtonWithIcon} from './ButtonWithIcon'


interface CommentInputProps {
    user: UserModel,
    acc_name: string,
    post_id: number,
    onMakeComment: Function
}


const _CommentInput: React.FC<CommentInputProps> = ({user, acc_name, post_id, onMakeComment}) => {

    const [comm, setComm] = useState('')

    const onSendComment = () => {

        console.log("Comment: ", comm);
        console.log("User id : ", user.id);
        console.log("Post id : ", post_id);

        onMakeComment(comm, user.id, post_id)
    }

    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <Image
                source={{uri: user.profile_photo}}
                style={styles.image} />
                <Text style={styles.name} >{user.name}</Text>
                <Text style={styles.username} >@{acc_name}</Text>
            </View>

            <View style={styles.text_field_container} >
                <TextInput 
                placeholder="Enter comment.."
                autoCapitalize='none'
                onChangeText={(text) => setComm(text)}
                style={styles.textField} />
            </View>

            <View style={styles.button_container} >
                <ButtonWithIcon title='Send' onTap={() => onSendComment()} width={80} height={40} btnColor={MAIN_COLOR} txtColor="white" />
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
    text_field_container: {
        height: 55,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        marginLeft: 25,
        marginRight: 25,
        paddingRight: 10,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: "black",
    },
    textField: {
        width: 320,
        height: 50,
        fontSize: 16,
        color: "black",
        fontFamily: 'Roboto-Regular',
    },
    button_container: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginRight: 20
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
    postReducer: state.postReducer,
});
  
const CommentInput = connect(mapToStateProps, {onMakeComment})(_CommentInput);

export {CommentInput}