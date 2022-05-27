import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {ApplicationState, UserState, onGetUser, PostState, onGetDailyPost} from '../redux';
import {connect} from 'react-redux';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../utils/Config';


interface DailyQuoteScreenProps {
    postReducer: PostState;
    onGetDailyPost: Function;
}


const _DailyQuoteScreen: React.FC<DailyQuoteScreenProps> = ({postReducer,onGetDailyPost}) => {

    const {daily_post} = postReducer

    useEffect(() => {
        let unmounted = false

        if(!unmounted) {
            onGetDailyPost()
        }
        return () => {
            unmounted = true    
        };
    }, [])

    return(
        <View style={styles.container} >
            <Text style={styles.title} >"Daily Quote"</Text>
            {
                daily_post.id ? <View style={styles.text_container} >
                <Text style={styles.post_body_text} >"{daily_post.body}"</Text>
                <Text style={styles.post_from_text} >• {daily_post.post_from}</Text>
                </View> : <></>
            }
            <View style={styles.image_container} >
                <Image
                source={{uri: daily_post.image}}
                style={styles.post_image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    title:{
        fontSize: 30,
        fontFamily: 'bahnschrift',
        marginTop: 10,
        color: TEXT_COLOR,
        textAlign: "center",
    },
    text_container: {
        marginTop: 25,
    },
    image_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flex: 2,
        marginBottom: 15,
    },
    post_image: {
        width: '95%',
        height: undefined,
        alignItems: "center",
        borderRadius: 10,
        aspectRatio: 1,
       
    },
    post_body_text: {
        color: "black",
        textAlign: "left",
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        marginLeft: 30
    },
    post_from_text: {
        color: "black",
        textAlign: "right",
        fontWeight: "700",
        fontFamily: "Roboto-Regular",
        marginRight: 10,
        marginTop: 20,
        fontSize: 15
    },
})


const mapToStateProps = (state: ApplicationState) => ({
    postReducer: state.postReducer
});
  
const DailyPostScreen = connect(mapToStateProps, {onGetUser, onGetDailyPost})(_DailyQuoteScreen);
  
export {DailyPostScreen};