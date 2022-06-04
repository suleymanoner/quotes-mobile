import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native';
import {ApplicationState, UserState, onGetAllUsers} from '../redux';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import UserCard from '../components/UserCard';

interface SearchScreenProps {
  userReducer: UserState;
  onGetAllUsers: Function;
}

const _SearchScreen: React.FC<SearchScreenProps> = ({userReducer, onGetAllUsers}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const { allUsers } = userReducer

  const [isEditing, setIsEditing] = useState(false);
  const [txt, setTxt] = useState('');

  const onGoUserDetail:Function = (id: number, acc_id: number) => {
    navigation.navigate('UserDetailPage', {"user_id": id, "acc_id": acc_id})
  }

  useEffect(() => {
    const ac = new AbortController();
    onGetAllUsers()
    return () => ac.abort()
  }, [])
  
 
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.top_container_title}>"Search"</Text>
      </View>

      <View style={styles.text_field_container}>
        <TextInput
          placeholder="Enter username.."
          autoCapitalize="none"
          onTouchStart={() => setIsEditing(true)}
          onChangeText={text => setTxt(text)}
          style={styles.textField}
        />
      </View>

      {isEditing ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          data={
            isEditing
              ? allUsers.filter(item => {
                  return item.name.toLocaleLowerCase().includes(txt);
                })
              : []
          }
          renderItem={({item}) => (
            <UserCard
              image={item.profile_photo!!}
              name={item.name}
              onTap={() => onGoUserDetail(item.id, item.account_id)}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      ) : (
        <></>
      )}

    </View>
  );
};


/**
 * 
 * {isEditing ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={}
          renderItem={({item}) => (
            <UserCard
              image={item.image}
              name={item.name}
              username={item.username}
            />
          )}
          keyExtractor={item => `${item.name}`}
        />
      ) : (
        <></>
      )}
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  top_container_title: {
    fontSize: 30,
    fontFamily: 'bahnschrift',
    marginTop: 10,
    color: 'black',
  },
  text_field_container: {
    height: 55,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
    marginRight: 25,
    paddingRight: 10,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  textField: {
    width: 320,
    height: 50,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const SearchScreen = connect(mapToStateProps, {onGetAllUsers})(_SearchScreen);

export {SearchScreen};
