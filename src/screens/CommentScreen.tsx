import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommentInput } from '../components';
import CommentCard from '../components/CommentCard';
import { BACKGROUND_COLOR, BASE_URL, TEXT_COLOR } from '../utils/Config'
import {ApplicationState, UserState, CommentModel, Response} from '../redux';
import {connect} from 'react-redux';
import axios from 'axios';


interface CommentScreenScreenProps {
    userReducer: UserState;
    route: any
}

const _CommentScreen: React.FC<CommentScreenScreenProps> = (props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const { post_id } = props.route.params

    const { user, account } = props.userReducer

    const [comments, setComments] = useState<[CommentModel]>()

    const getComments = async () => {
        try {
          await axios.get<Response & CommentModel>(`${BASE_URL}postcomments/${post_id}`)
          .then(response => {
            if (response.data.response) {
                setComments(response.data.response)
            }
          }).catch(err => console.log(err));
        } catch (error) {
          console.log(error);
        }
      }
  
    const goBack = () => {
        props.route.params = undefined
        navigation.goBack()
    }

    useEffect(() => {
        const ac = new AbortController();
        getComments()
        return () => ac.abort()
    }, [comments])


    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <TouchableOpacity onPress={goBack} style={styles.top_container_icon} >
                    <Icon name='keyboard-backspace' color="black" size={30} />
                </TouchableOpacity>
                <Text style={styles.top_container_title} >"Comments"</Text>
            </View>

            <CommentInput user={user} acc_name={account.name} post_id={post_id} />

            {
                comments ? 
                <FlatList
                    data={comments}
                    initialNumToRender={6}
                    renderItem={({item}) => <CommentCard comment={item} userId={item.user_id} />}
                    keyExtractor={(item, index) => String(item.id)} 
                /> : <></>
            }

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
        marginBottom: 10
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
});

const CommentScreen = connect(mapToStateProps, {})(_CommentScreen);

export { CommentScreen }