import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import {ApplicationState, UserState, PostState, Response, UserModel, AccountModel, onGetUsersPosts, onGetUserFollowers, PostModel, onUserFollow, onUserUnfollow } from '../redux';
import {connect} from 'react-redux';
import { ButtonWithIcon} from '../components';
import QuoteCard from '../components/QuoteCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, TEXT_COLOR, MAIN_COLOR, BASE_URL} from '../utils/Config'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import LottieView from "lottie-react-native";
import axios from 'axios';


interface UserDetailScreenProps {
    userReducer: UserState;
    postReducer: PostState;
    onGetUsersPosts: Function;
    onGetUserFollowers: Function;
    onUserFollow: Function;
    onUserUnfollow: Function;
    route: any
}

const initialPost: PostModel = {
    id: 0,
    body: "",
    post_from: "",
    image: "",
    total_likes: 0,
    total_comments: 0,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: 0
}

const _UserDetailScreen: React.FC<UserDetailScreenProps> = ({userReducer, onUserFollow, onUserUnfollow, onGetUserFollowers, onGetUsersPosts, route}) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const { user } = userReducer

    const [profileUser, setProfileUser] = useState<UserModel>()
    const [profileAccount, setProfileAccount] = useState<AccountModel>()
    const [posts, setPosts] = useState<[PostModel]>([initialPost])
    const [followBtnText, setFollowBtnText] = useState('Follow')

    const { user_id, acc_id } = route.params

    const getUserProfile = async () => {
        await axios.get<Response & UserModel>(`${BASE_URL}users/${user_id}`)
        .then(response => {
            if(response.data.response) {
                setProfileUser(response.data.response)
            }
        }).catch(err => console.log(err));

        await axios.get<[PostModel]>(`${BASE_URL}posts/user/${user_id}`)
        .then(response => {
            if (response.data) {
                setPosts(response.data)
            } 
        }).catch(err => console.log(err));

        await axios.get<Response & AccountModel>(`${BASE_URL}accounts/${acc_id}`)
        .then(response => {
            if(response.data.response) {
                setProfileAccount(response.data.response)
            }
        }).catch(err => console.log(err));
    }


    const check = async () => {
        await axios.post(`${BASE_URL}userfollowers/checkIfFollows`, {
            "follower_id": user.id,
            "user_id": profileUser?.id
        })
        .then(response => {
            if(response.data == true) {
                setFollowBtnText("Unfollow")
            }
        }).catch(err => console.log(err));   
    }

    useEffect(() => {
        const ac = new AbortController();
        check()
        return () => ac.abort()
    })

    useEffect(() => {
        const ac = new AbortController();
        getUserProfile()
        return () => ac.abort()
    }, [posts, profileUser, profileAccount])

 
    useEffect(() => {
        const ac = new AbortController();
        onGetUsersPosts(profileUser?.id)
        onGetUserFollowers(profileUser?.id)
        return () => ac.abort()
    }, [])

    const goBack = () => {
        navigation.goBack();
    };

    
    const onTapFollowBtn = async () => {
        if(followBtnText == "Follow") {
            await onUserFollow(user.id, profileUser?.id)
            setFollowBtnText("Unfollow")
        } else if(followBtnText == "Unfollow") {
            await onUserUnfollow(user.id, profileUser?.id)
            setFollowBtnText("Follow")
        }
    }


    const noPostComponent = () => {
        return(
            <View style={{flex: 1,  marginTop: 30}} >
                <Text style={{fontSize: 20, color: "black", textAlign: "center", fontFamily: 'Roboto-Regular'}} >No post here!</Text>
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
                <TouchableOpacity onPress={goBack} style={styles.top_container_icon}>
                    <Icon name="keyboard-backspace" color="black" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.user_info_container} >
                <Image
                source={{uri: profileUser?.profile_photo}}
                style={styles.top_container_image} />
                <View>
                    <Text style={styles.user_name_text} >{profileUser?.name} {profileUser?.surname}</Text>
                    <Text style={styles.user_account_name_text} >@{profileAccount?.name}</Text>
                </View>
            </View>
            <View style={styles.follow_button_container} >
                <Text style={styles.info_text} >{profileUser?.bio}</Text>
                <ButtonWithIcon height={30} title={followBtnText} btnColor={MAIN_COLOR} txtColor="white" width={100} onTap={() => onTapFollowBtn()} />
            </View>
            <View style={styles.followings_detail_container} >
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("FollowerListPage", {title: "Followers", user_id: user_id})} >
                        <Text style={[styles.followers_text, {marginLeft: 30}]} >Followers</Text>
                        <Text style={[styles.followers_text, {marginLeft: 55, marginTop: 5, fontWeight: "700"}]} >{profileUser?.followers}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate("FollowerListPage", {title: "Following", user_id: user_id})} >
                        <Text style={[styles.followers_text, {textAlign: "right" ,marginRight: 30}]} >Following</Text>
                        <Text style={[styles.followers_text, {textAlign: "right", marginTop: 5, marginRight: 55, fontWeight: "700" }]} >{profileUser?.following}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {
                posts!.length > 0 ? 
                <FlatList 
                style={styles.post_flatlist}
                data={posts}
                initialNumToRender={3}
                renderItem={({item}) => <QuoteCard post={item} userId={user_id} isImage={item.image} onTap={() => {}} />}
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
  
  const UserDetailScreen = connect(mapToStateProps, { onGetUsersPosts, onGetUserFollowers, onUserFollow, onUserUnfollow})(_UserDetailScreen);
  
  export {UserDetailScreen};