import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '../utils/useNavigation'
import { MAIN_COLOR } from '../utils/Config'
import { TextField } from '../components';

const LoginScreen = () => {

    const { navigate } = useNavigation()
    const [isSignUp, setIsSignUp] = useState(false)

    useEffect(() => {
        
    }, [])


    const onTapGoSignUp = () => {
        setIsSignUp(true)
    }

    const onTapGoSignIn= () => {
        setIsSignUp(false)
    }

    if(!isSignUp) {
        return(
            <View style={styles.container} >
    
                <View style={styles.body} >
                    <Image source={require('../assets/images/quotes-icon.png')} style={styles.image} />
                    <Text style={styles.title} >"Quotes"</Text>
                </View>
    
                <View style={styles.input_container} >
                    <TextField placeholder='email' onTextChange={() => {}} />
                    <TextField placeholder='password' onTextChange={() => {}} isSecure={true} />
                    <TouchableOpacity onPress={onTapGoSignUp} >
                        <Text style={styles.link_text} >You don't have account yet? Click for Sign-up.</Text>
                    </TouchableOpacity>
                </View>
    
    
            </View>
        )
    } else {
        return(
            <View style={styles.container} >

                <Text style={styles.title} >"Sign Up"</Text>

                <TextField placeholder='Name' onTextChange={() => {}} />
                <TextField placeholder='Surname' onTextChange={() => {}} />
                <TextField placeholder='Email' onTextChange={() => {}} />
                <TextField placeholder='Username' onTextChange={() => {}} />
                <TextField placeholder='Password' onTextChange={() => {}} isSecure={true} />
                <TextField placeholder='Password Again' onTextChange={() => {}} isSecure={true} />



                <TouchableOpacity onPress={onTapGoSignIn} >
                    <Text style={styles.link_text} >You don't have account yet? Click for Sign-up.</Text>
                </TouchableOpacity>
    
    
            </View>
        )
    }

}

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
    link_text: {
        textAlign: "center",
        fontSize: 15,
        color: "black"
    }
})