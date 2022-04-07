import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { BUTTON_COLOR } from '../utils/Config'

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    icon: ImageSourcePropType,
    title: string
}

const ButtonWithIcon: React.FC<ButtonProps> = ({ onTap, width, height, icon, title }) => {
    
    return(
        <TouchableOpacity style={[styles.button, { width, height }]} onPress={() => onTap()} >
            <Text style={styles.button_text} >{title}</Text>
            <Image style={{width: 30, height: 30, marginLeft: 10}} source={icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 55,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
        marginLeft: 25,
        marginRight: 25,
        paddingRight: 10,
        paddingLeft: 20,
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: BUTTON_COLOR
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: 350,
        height: 50,
        backgroundColor: BUTTON_COLOR,
        margin: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderRadius: 15,
        alignSelf: "center"
    },
    button_text: {
        fontSize: 17,
        color: "white",
        fontWeight: "800"
    }
})

export { ButtonWithIcon }