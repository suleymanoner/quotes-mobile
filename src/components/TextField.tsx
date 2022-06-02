import React from 'react';
import { View, StyleSheet, TextInput, Dimensions  } from 'react-native';


interface TextFieldProps {
    placeholder: string,
    isSecure?: boolean,
    onTextChange: Function,
}


const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure = false, onTextChange }) => {

    return(
        <View style={styles.container} >
            <TextInput 
            placeholder={placeholder}
            placeholderTextColor="white"
            autoCapitalize='none'
            secureTextEntry={isSecure}
            onChangeText={(text) => onTextChange(text)}
            style={styles.textField} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
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
        borderColor: "white"
    },
    textField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 16,
        color: "white"
    }
})

export { TextField }