import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";
import { TextField } from '../components/TextField';


interface LandingProps {
 
}


const LandingScreen: React.FC<LandingProps> = () => {

    const [followings, setFollowings] = useState([])

    const get = async () => {

        const response = await axios.get("")

        console.log(response.data);
        setFollowings(response.data)
    }

    useEffect(() => {
        get()
    }, [])

   
    return(
        <View style={styles.container} >
            
              <Text>Landing Screen</Text>  

              <FlatList 
                    showsHorizontalScrollIndicator={false} 
                    data={followings} 
                    renderItem={({item}) => <TextField user={item[0]} />}
              />

        </View>
    )
}

export { LandingScreen }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(242,242,242,1)"
    }
})