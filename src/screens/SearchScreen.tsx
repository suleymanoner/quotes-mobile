import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';

const SearchScreen = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [txt, setTxt] = useState('');

 

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
          onEndEditing={() => setIsEditing(false)}
          onChangeText={text => setTxt(text)}
          style={styles.textField}
        />
      </View>

      
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

export {SearchScreen};
