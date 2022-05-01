import React, { useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuoteCard } from '../components';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/Config'
import {ApplicationState, UserState, PostState, onGetIndividualPost} from '../redux';
import {connect} from 'react-redux';


interface PostDetailScreenProps {
    userReducer: UserState;
    postReducer: PostState;
    onGetIndividualPost: Function;
    route: any
}

const _PostDetailScreen: React.FC<PostDetailScreenProps> = (props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const {indv_post} = props.postReducer

    const { post_id } = props.route.params


    useEffect(() => {

        props.onGetIndividualPost(post_id)

    }, [])


    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.top_container_icon} >
                    <Icon name='keyboard-backspace' color="black" size={30} />
                </TouchableOpacity>
                <Text style={styles.top_container_title} >"Quote"</Text>
            </View>

            <QuoteCard post={indv_post} isImage={indv_post.image} onTap={() => {}} userId={indv_post.user_id} />            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    top_container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    top_container_title:{
        fontSize: 30,
        fontFamily: 'bahnschrift',
        marginTop: 10,
        color: TEXT_COLOR,
    },
    top_container_icon: {
        position: 'absolute', 
        left: 0,
        top: 15,
        marginLeft: 10,
    },
})
  

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    postReducer: state.postReducer
});

const PostDetailScreen = connect(mapToStateProps, {onGetIndividualPost})(_PostDetailScreen);

export { PostDetailScreen }