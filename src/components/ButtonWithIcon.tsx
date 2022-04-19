import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { BUTTON_COLOR } from '../utils/Config'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps {
    onTap: Function,
    width: number,
    height: number,
    iconName?: string,
    iconColor?: string,
    iconSize?: number,
    title: string
}

const ButtonWithIcon: React.FC<ButtonProps> = ({ onTap, width, height, iconName, iconColor, iconSize, title }) => {
    
    return(
        <TouchableOpacity style={[styles.button, { width, height }]} onPress={() => onTap()} >
            <View style={styles.inside_container} >
                <Text style={styles.button_text} >{title}</Text>
                <Icon size={iconSize} color={iconColor} style={styles.icon} name={iconName!} />
            </View>
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
    inside_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
    },
    icon: {
        marginLeft: 10,
    }
})

export { ButtonWithIcon }