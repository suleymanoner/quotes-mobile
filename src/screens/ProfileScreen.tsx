import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import {ApplicationState, UserState, PostState, onGetUserAccount, onGetUserFollowers, onGetUsersPosts, onGetUserFollowings} from '../redux';
import {connect} from 'react-redux';
import { ButtonWithIcon} from '../components';
import QuoteCard from '../components/QuoteCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, TEXT_COLOR, MAIN_COLOR} from '../utils/Config'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import LottieView from "lottie-react-native";


interface ProfileScreenProps {
    userReducer: UserState;
    postReducer: PostState;
    onGetUsersPosts: Function;
    onGetUserFollowers: Function;
    onGetUserFollowings: Function;
}

const _ProfileScreen: React.FC<ProfileScreenProps> = ({userReducer, postReducer, onGetUserFollowers, onGetUsersPosts, onGetUserFollowings}) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const {user,account, followers, followings } = userReducer
    const {users_posts, indv_post} = postReducer

    

    useEffect(() => {
        let unmounted = false

        if(!unmounted) {
            onGetUsersPosts(user.id)
            onGetUserFollowers(user.id)
            onGetUserFollowings(user.id)
        }
        return () => {
            unmounted = true    
        };
    }, [users_posts, followers, followings])


    const onTapSettings = () => {
        navigation.navigate("SettingPage")
    }

    const noPostComponent = () => {
        return(
            <View style={{flex: 1,  marginTop: 30}} >
                <Text style={{fontSize: 20, color: "black", textAlign: "center", fontFamily: 'Roboto-Regular'}} >You didn't post yet!</Text>
                <LottieView 
                        source={require('../assets/images/eyes-looking.json')}
                        autoPlay
                        loop
                />
            </View>
        )
    }



    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <Text style={styles.top_container_title} >"Profile"</Text>
                <TouchableOpacity onPress={() => onTapSettings()} style={styles.settings_icon}  >
                    <Icon name='cog-outline' color="black" size={30}/>
                </TouchableOpacity>
                
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
                <ButtonWithIcon height={30} title="Follow" btnColor={MAIN_COLOR} txtColor="white" width={100} onTap={() => {}} />
            </View>
            <View style={styles.followings_detail_container} >
                <View>
                    <TouchableOpacity onPress={() => console.log(followers)} >
                        <Text style={[styles.followers_text, {marginLeft: 30}]} >Followers</Text>
                        <Text style={[styles.followers_text, {marginLeft: 55, marginTop: 5, fontWeight: "700"}]} >{user.followers}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => console.log(followings)} >
                        <Text style={[styles.followers_text, {textAlign: "right" ,marginRight: 30}]} >Following</Text>
                        <Text style={[styles.followers_text, {textAlign: "right", marginTop: 5, marginRight: 55, fontWeight: "700" }]} >{user.following}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                users_posts.length > 0 ? 
                <FlatList 
                style={styles.post_flatlist}
                data={users_posts}
                initialNumToRender={3}
                renderItem={({item}) => <QuoteCard post={item} userId={user.id} isImage={item.image} onTap={() => {}} />}
                /> : noPostComponent()
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
        marginTop: 10
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
  
  const ProfileScreen = connect(mapToStateProps, {onGetUserAccount, onGetUsersPosts, onGetUserFollowers, onGetUserFollowings})(_ProfileScreen);
  
  export {ProfileScreen};