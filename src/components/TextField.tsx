import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Post } from '../redux'


interface TextFieldProps {
    post: Post,
}


const TextField: React.FC<TextFieldProps> = ({ post }) => {

    if(post.image != null) {
        return(
            <View style={styles.container} >
               <Text>{post.body}</Text>
               <Text>{post.post_from}</Text>
    
              <Image source={{uri: post.image}} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
    
            </View>
        )
    } else {
        return(
            <View style={styles.container} >
               <Text>{post.body}</Text>
               <Text>{post.post_from}</Text>
        
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        margin: 10,
    }
})

export { TextField }