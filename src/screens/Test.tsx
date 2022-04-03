import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import axios from "axios";
import { BASE_URL } from '../utils/Config'


interface test {
 
}


const Test: React.FC<test> = () => {

    const [followings, setFollowings] = useState([''])
    const [uri, setUri] = useState([''])


    const get = async () => {

        const response = await axios.get(BASE_URL + "quotes-backend/api/posts")

        console.log(response.data)
        setFollowings(response.data)

      

    }

    useEffect(() => {
        get()
    }, [])

    const aa = "https://static.onecms.io/wp-content/uploads/sites/20/2019/06/dead-poets-0-2000.jpg"

    return(
        <View style={styles.container} >
            
              <Text>Landing Screen</Text>

              

             

            <Image source={{uri: aa }} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />


        </View>
    )
}


/*
 <FlatList 
                    showsHorizontalScrollIndicator={false} 
                    data={followings} 
                    renderItem = { ({item}) => <TextField post={item} />  }
              />

*/ 

export { Test }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)"
    }
})