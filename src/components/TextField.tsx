import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface User {
    name: string,
    surname: string,
    bio?: string,
    email: string,
    password: string,
    status: string,
    role: string,
    profile_photo?: string,
    created_at: Date,
    updated_at: Date,
    token?: string,
    token_created_at: Date,
    account_id: number
}

interface Account {
    id: number,
    name: string,
    status: string,
    created_at: Date,
    updated_ad: Date
}


interface TextFieldProps {
    user: Account
}


const TextField: React.FC<TextFieldProps> = ({ user }) => {

    return(
        <View style={styles.container} >
           <Text>{user.name}</Text>
           <Text>{user.status}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        width: 340,
        backgroundColor: "#DBDBDB",
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingRight: 10,
        paddingLeft: 20,
    }
})

export { TextField }