import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import {ApplicationState, UserState, onUserEditProfile, onUserChangePassword} from '../redux';
import {connect} from 'react-redux';
import { ButtonWithIcon, TextField} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BACKGROUND_COLOR, TEXT_COLOR, MAIN_COLOR} from '../utils/Config'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import ImagePicker from 'react-native-image-crop-picker'
import { AWS3_ACCESS_KEY, AWS3_SECRET_KEY } from '../utils/Config'
import { RNS3 } from 'react-native-aws3'

interface EditProfileScreenProps {
    userReducer: UserState;
    onUserEditProfile: Function;
    onUserChangePassword: Function;
    route: any;
}

const _EditProfileScreen: React.FC<EditProfileScreenProps> = ({userReducer, onUserEditProfile, onUserChangePassword, route}) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

    const {user, error} = userReducer

    const { type } = route.params

    const [photo, setPhoto] = useState(user.profile_photo)
    const [isPhoto, setIsPhoto] = useState(false)
    const [name, setName] = useState(user.name)
    const [surname, setSurname] = useState(user.surname)
    const [bio, setBio] = useState(user.bio)

    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPasswordAgain, setNewPasswordAgain] = useState<string>('')

    const goBack = () => {
        navigation.goBack()
    }

    const chooseFromLibrary = () => {
        try {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            console.log(image);
            setIsPhoto(true)
            setPhoto(image.path)
          }).catch((error) => {
            console.log(error);
          });
        } catch (error) {
          console.log(error);
        }
      }

    const onTapSave = async () => {

        if(type == "Edit Profile") {
            if(isPhoto) {
                let randomName = (Math.random() + 1).toString(36).substring(2);
    
                const file = {
                    uri: photo!,
                    name: randomName,
                    type: 'image/jpeg'
                }
                
                const config = {
                    keyPrefix: 's3/',
                    bucket: 'quotes-photo-bucket',
                    region: 'eu-central-1',
                    accessKey: AWS3_ACCESS_KEY,
                    secretKey: AWS3_SECRET_KEY,
                    successActionStatus: 201,
                }
            
                await RNS3.put(file, config)
                .then((response) => {
                    if(response.status !== 201) {
                        console.log("Failed to upload!");
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
            await onUserEditProfile(user.id, name, surname, bio, photo)
        } else if(type == "Change Password") {
            await onUserChangePassword(user.id, oldPassword, newPassword, newPasswordAgain)
        }
        
        goBack()
    }  


    return(
        <View style={styles.container} >
            <View style={styles.top_container} >
                <Text style={styles.top_container_title} >"{type}"</Text>
                <TouchableOpacity onPress={goBack} style={styles.top_container_icon}  >
                    <Icon name='keyboard-backspace' color="black" size={30}/>
                </TouchableOpacity>
            </View>

            {
                type == "Edit Profile" ?
                <View>
                    <View style={styles.user_info_container} >
                        <TouchableOpacity onPress={chooseFromLibrary} >   
                            <Image
                            source={{uri: photo}}
                            style={styles.top_container_image} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.edit_input_container} >
                        <View style={styles.text_input_container} >
                            <TextInput 
                            placeholder="Change name"
                            autoCapitalize='none'
                            defaultValue={user.name}
                            onChangeText={(text) => setName(text)}
                            style={styles.textField} />
                        </View>
                        <View style={styles.text_input_container} >
                            <TextInput 
                            placeholder="Change surname"
                            autoCapitalize='none'
                            defaultValue={user.surname}
                            onChangeText={(text) => setSurname(text)}
                            style={styles.textField} />
                        </View>
                        <View style={styles.text_input_container} >
                            <TextInput 
                            placeholder="Add bio"
                            autoCapitalize='none'
                            defaultValue={user.bio}
                            onChangeText={(text) => setBio(text)}
                            style={styles.textField} />
                        </View>
                    </View>
                </View>
                :
                <View style={{marginTop: 35}} >
                    <View style={styles.text_input_container} >
                        <TextInput 
                        placeholder="Old Password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(text) => setOldPassword(text)}
                        style={styles.textField} />
                    </View>
                    <View style={styles.text_input_container} >
                        <TextInput 
                        placeholder="New Password"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(text) => setNewPassword(text)}
                        style={styles.textField} />
                    </View>
                    <View style={styles.text_input_container} >
                        <TextInput 
                        placeholder="New Password Again"
                        autoCapitalize='none'
                        secureTextEntry={true}
                        onChangeText={(text) => setNewPasswordAgain(text)}
                        style={styles.textField} />
                    </View>
                </View>
            }
            <View style={{ position: 'absolute', bottom:10, right:10,}} >
                <ButtonWithIcon btnColor={MAIN_COLOR} height={50} width={100} onTap={() => onTapSave()} title="Save" txtColor='white'  />
            </View>
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
    top_container_icon: {
        position: 'absolute',
        left: 0,
        top: 15,
        marginLeft: 10,
    },
    top_container_title:{
        fontSize: 30,
        fontFamily: 'bahnschrift',
        marginTop: 10,
        color: TEXT_COLOR,
        textAlign: "center"
    },
    user_info_container: {
        alignItems: "center",
        marginTop: 10
    },
    post_flatlist: {
        marginTop: 10
    },
    edit_input_container: {
        marginTop: 10,
        flexDirection: "column",
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
    text_input_container: {
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
        borderColor: "black"
    },
    textField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 16,
        color: TEXT_COLOR
    }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
});

const EditProfileScreen = connect(mapToStateProps, {onUserEditProfile,onUserChangePassword})(_EditProfileScreen);

export {EditProfileScreen};