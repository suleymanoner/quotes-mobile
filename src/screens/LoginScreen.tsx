import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '../utils/useNavigation'
import { MAIN_COLOR } from '../utils/Config'
import { TextField } from '../components/TextField';

const LoginScreen = () => {

    const { navigate } = useNavigation()

    useEffect(() => {
        
    }, [])


    return(
        <View style={styles.container} >

            <View style={styles.body} >
                <Image source={require('../assets/images/quotes-icon.png')} style={styles.image} />
                <Text style={styles.title} >"Quotes"</Text>
            </View>

            <View style={styles.input_container} >
                <TextField placeholder='email' onTextChange={() => {}} />
                <TextField placeholder='password' onTextChange={() => {}} isSecure={true} />
                <Text style={styles.link_text} >You don’t have account yet? Click for Sign-up.</Text>
            </View>


        </View>
    )
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
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 45,
        marginBottom: 50,
        fontFamily: 'Aleo-Regular',
        color: "black"
    },
    link_text: {
        textAlign: "center",
        fontSize: 15,
        color: "black"
    }
})