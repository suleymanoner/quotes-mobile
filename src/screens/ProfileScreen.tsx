import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import {ApplicationState, UserState, PostState, onGetUserAccount, onGetUsersPosts} from '../redux';
import {connect} from 'react-redux';
import { ButtonWithIcon, QuoteCard } from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, TEXT_COLOR} from '../utils/Config'

interface ProfileScreenProps {
    userReducer: UserState;
    postReducer: PostState;
    onGetUserAccount: Function
    onGetUsersPosts: Function;
}

const _ProfileScreen: React.FC<ProfileScreenProps> = ({userReducer, postReducer, onGetUserAccount, onGetUsersPosts}) => {

    const {user,account} = userReducer
    const {users_posts, indv_post} = postReducer


    useEffect(() => {
        onGetUsersPosts(1)
    }, [])

    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <Text style={styles.top_container_title} >"Profile"</Text>
                <Icon name='cog-outline' color="#00344F" size={30} style={styles.settings_icon}  />
            </View>
            <View style={styles.user_info_container} >
                <Image
                source={{uri: user.profile_photo}}
                style={styles.top_container_image} />
                <View>
                    <Text style={styles.user_name_text} >{user.name} {user.surname}</Text>
                    <Text style={styles.user_account_name_text} >@{account.name}</Text>
                </View>
            </View>
            <View style={styles.follow_button_container} >
                <Text style={styles.info_text} >{user.bio}</Text>
                <ButtonWithIcon height={30} title="Follow" width={100} onTap={() => {}} />
            </View>
            <View style={styles.followings_detail_container} >
                <View>
                    <Text style={[styles.followers_text, {marginLeft: 30}]} >Followers</Text>
                    <Text style={[styles.followers_text, {marginLeft: 55, marginTop: 5}]} >50</Text>
                </View>
                <View>
                    <Text style={[styles.followers_text, {textAlign: "right" ,marginRight: 30}]} >Following</Text>
                    <Text style={[styles.followers_text, {textAlign: "right", marginTop: 5, marginRight: 55 }]} >150</Text>
                </View>
            </View>

            <FlatList 
            style={styles.post_flatlist}
                    data={users_posts}
                    renderItem={({item}) => <QuoteCard post={item} userId={item.user_id} onTap={() => {}} />}
            />
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
        alignItems: "center"
    },
    settings_icon: {
        position: 'absolute',
        right: 5,
    },
    top_container_title:{
        fontSize: 30,
        fontFamily: 'bahnschrift',
        marginTop: 10,
        color: TEXT_COLOR,
        textAlign: "center"
    },
    user_info_container: {
        flexDirection: "row",
        alignItems: "center"
    },
    post_flatlist: {
        marginTop: 10
    },
    follow_button_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    followings_detail_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    user_name_text: {
        fontSize: 25,
        fontFamily: 'Roboto-Regular',
        marginTop: 10,
        color: TEXT_COLOR,
    },
    user_account_name_text: {
        fontSize: 14,
        fontFamily: 'Roboto-Regular',
        marginTop: 5,
        color: "gray"
    },
    top_container_image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        margin: 10,
        borderWidth: 1,
        borderColor: "black"
    },
    info_text: {
        fontSize: 17,
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        color: TEXT_COLOR,
    },
    followers_text: {
        fontSize: 17,
        fontFamily: 'Roboto-Regular',
        color: TEXT_COLOR,
    }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    postReducer: state.postReducer
  });
  
  const ProfileScreen = connect(mapToStateProps, {onGetUserAccount, onGetUsersPosts})(_ProfileScreen);
  
  export {ProfileScreen};