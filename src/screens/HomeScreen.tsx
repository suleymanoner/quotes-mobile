import React from 'react'
import { View, Text, Image } from 'react-native'
import { UserModel, ApplicationState, UserState } from '../redux'
import { connect } from 'react-redux';


interface HomeScreenProps {
    userReducer: UserState,
    navigation: { getParam: Function }
}

const _HomeScreen: React.FC<HomeScreenProps> = (props) => {

    const { getParam } = props.navigation

    const { user } = props.userReducer
    
    

    return(
        <View>
            <Text>Home</Text>
            <Text>{user.name}</Text>
            <Text>{user.surname}</Text>
            <Image source={{uri: user.profile_photo }} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
        </View>
    )

}

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const HomeScreen = connect(mapToStateProps, {  })(_HomeScreen)

export { HomeScreen }
