import React, {memo} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

interface UserCardProps {
    image: string,
    name: string;
    onTap: Function
}

const UserCard: React.FC<UserCardProps> = ({image, name, onTap}) => {
    return(
        <TouchableOpacity onPress={() => onTap()} >
            <View style={styles.container} >
                <View style={styles.top_container} >
                    <Image
                    source={{uri: image}}
                    style={styles.image} />
                    <Text style={styles.name} >{name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E4E4E4",
        borderColor: "black",
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
        flexDirection: "column",
    },
    top_container: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 30,
        margin: 5,
        borderWidth: 1,
        borderColor: "black"
    },
    name:{
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
        marginTop: 11,
        color: "black",
        marginLeft: 5
    },
    username: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 5,
        color: "gray",
        fontFamily: "Roboto-Regular"
    },
})

export default memo(UserCard)