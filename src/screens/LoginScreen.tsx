import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '../utils/useNavigation'
import { connect } from 'react-redux'
import { MAIN_COLOR, BASE_URL, BUTTON_COLOR } from '../utils/Config'
import { TextField, ButtonWithIcon } from '../components';
import { UserModel, UserState, ApplicationState, onUserLogin, onUserSignUp } from '../redux'
import * as Progress from 'react-native-progress'
import axios from 'axios';


interface LoginScreenProps {
    userReducer: UserState,
    onUserLogin: Function,
    onUserSignUp: Function
}



const _LoginScreen: React.FC<LoginScreenProps> = ({ userReducer, onUserLogin }) => {


    const { user, error } = userReducer


    const { navigate } = useNavigation()
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [username, setUsername] = useState("")



    useEffect(() => {
        console.log(user);
    }, [])


    const handleAuthentication = () => {


        if(isSignUp) {

            if(email.length == 0 || password.length == 0 || name.length == 0 || surname.length == 0 || username.length == 0) {
                console.log("Please fill all blanks!");
            } else {

                if(password == passwordAgain) {
                    onUserSignUp(name, surname, email, password, username)
                    navigate('ConfirmationPage')
                } else {
                    console.log("Your passwords not matched!");
                }
            }

        } else {

            if(email.length == 0 || password.length == 0 ) {
                console.log("Please fill all blanks!");
            } else {
            
                onUserLogin(email, password)

                if(error) {
                    console.log(error);
                } else {
                    navigate('HomePage')
                }

                
            }

        }

    }

        

        

    



    /*
    const register =async () => {
        
        try {

            if(password == passwordAgain) {

                const response = await axios.post<UserModel>(`http://192.168.1.151/quotes-backend/api/users/register`, {
                    name,
                    surname,
                    email,
                    password,
                    username
                })
    
                console.log(response.data);
    
                const user = response.data as UserModel

            } else {
                console.log("Passwords not matched!");
            }
            

        } catch (error) {
            console.log(error);
        }

    }*/


    useEffect(() => {
        
    }, [])




    const onTapGoNextScreen = (where: string) => {
        if(where == "signup") {
            setIsSignUp(true)
        } else {
            setIsSignUp(false)
        }
    }

    if(!isSignUp) {
        return(
            <View style={styles.container} >
    
                <View style={styles.body} >
                    <Image source={require('../assets/images/quotes-icon.png')} style={styles.image} />
                    <Text style={styles.title} >"Quotes"</Text>
                </View>
    
                <View style={styles.input_container} >
                    <TextField placeholder='email' onTextChange={setEmail} />
                    <TextField placeholder='password' onTextChange={setPassword} isSecure={true} />
                    <ButtonWithIcon onTap={handleAuthentication} title="Sign In" width={350} height={50} icon={require('../assets/images/add_account.png')} />

                    <TouchableOpacity onPress={() => onTapGoNextScreen("signup")} >
                        <Text style={styles.link_text} >You don't have account yet? Click for Sign-up.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {


        return(
            <View style={styles.container} >

                <Text style={styles.title} >"Sign Up"</Text>

                <TextField placeholder='Name' onTextChange={setName} />
                <TextField placeholder='Surname' onTextChange={setSurname} />
                <TextField placeholder='Email' onTextChange={setEmail} />
                <TextField placeholder='Username' onTextChange={setUsername} />
                <TextField placeholder='Password' onTextChange={setPassword} isSecure={true} />
                <TextField placeholder='Password Again' onTextChange={setPasswordAgain} isSecure={true} />

                <ButtonWithIcon onTap={handleAuthentication} title="Sign Up" width={350} height={50} icon={require('../assets/images/add_account.png')} />

                <TouchableOpacity onPress={() => onTapGoNextScreen("signin")} >
                    <Text style={styles.link_text} >You don't have account yet? Click for Sign-up.</Text>
                </TouchableOpacity>
            </View>
        )
  
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, { onUserLogin, onUserSignUp })(_LoginScreen)

export { LoginScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_COLOR,
    },
    body: {
        flex: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    input_container: {
        flex: 8,
    },
    image: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 45,
        marginBottom: 15,
        marginTop: 15,
        fontFamily: 'Aleo-Regular',
        color: "black",
        textAlign: "center"
    },
    title2: {
        fontSize: 30,
        marginBottom: 15,
        marginTop: 15,
        fontFamily: 'Aleo-Regular',
        color: "black",
        textAlign: "center",
        
    },
    link_text: {
        textAlign: "center",
        fontSize: 15,
        color: "black"
    }
})