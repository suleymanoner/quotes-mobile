import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonWithIcon} from '../components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import {ApplicationState, UserState, PostState, onPostQuote} from '../redux';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {AWS3_ACCESS_KEY, AWS3_SECRET_KEY} from '../utils/Config';
import {RNS3} from 'react-native-aws3';
import {showToast} from '../utils/showToast';

interface PostQuoteScreenProps {
  userReducer: UserState;
  postReducer: PostState;
  onPostQuote: Function;
  route: any;
}

const _PostQuoteScreen: React.FC<PostQuoteScreenProps> = ({
  userReducer,
  onPostQuote,
  route,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const {user} = userReducer;
  const {acc_name} = route.params;
  const [qFrom, setQFrom] = useState<string | null>('');
  const [quote, setQuote] = useState<string | null>('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isPhoto, setIsPhoto] = useState(false);
  const [disablePost, setDisablePost] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const onTapSend = async () => {
    setDisablePost(!disablePost);
    let randomName = (Math.random() + 1).toString(36).substring(2);

    if (qFrom?.length == 0 || quote?.length == 0) {
      showToast('Please fill all blanks!');
    } else {
      if (photo) {
        const file = {
          uri: photo,
          name: randomName,
          type: 'image/jpeg',
        };

        const config = {
          keyPrefix: 's3/',
          bucket: 'quotes-photo-bucket',
          region: 'eu-central-1',
          accessKey: AWS3_ACCESS_KEY,
          secretKey: AWS3_SECRET_KEY,
          successActionStatus: 201,
        };

        await RNS3.put(file, config)
          .then(response => {
            if (response.status !== 201) {
              console.log('Failed to upload!');
            }
            console.log(response.headers.Location);
            console.log(response.status);
            onPostQuote(quote, qFrom, response.headers.Location, user.id);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        await onPostQuote(quote, qFrom, null, user.id);
      }
      
      goBack();
    }
  };

  const chooseFromLibrary = () => {
    try {
      ImagePicker.openPicker({
        width: 350,
        height: 300,
        cropping: true,
      })
        .then(image => {
          console.log(image);
          setPhoto(image.path);
          setIsPhoto(true);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => goBack()}>
          <Icon
            name="close"
            color="#00344F"
            size={30}
            style={styles.exit_icon}
          />
        </TouchableOpacity>
        <Text style={styles.top_container_title}>"Post Quote"</Text>
      </View>
      <View style={styles.inside_container}>
        <View style={styles.inside_top_container}>
          <Image source={{uri: user.profile_photo}} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{acc_name}</Text>
        </View>
        <View style={styles.text_field_container}>
          <TextInput
            placeholder="Quote From.."
            autoCapitalize="none"
            onChangeText={text => setQFrom(text)}
            underlineColorAndroid="transparent"
            style={styles.textField}
          />
        </View>
        <View style={[styles.text_field_container, {height: 70}]}>
          <TextInput
            placeholder="Quote.."
            autoCapitalize="none"
            onChangeText={text => setQuote(text)}
            multiline={true}
            underlineColorAndroid="transparent"
            style={[styles.textField, {textAlignVertical: 'top', height: 70}]}
          />
        </View>
        <View style={styles.image_container}>
          {!isPhoto ? (
            <></>
          ) : (
            <Image
              source={{
                uri: photo,
              }}
              style={styles.post_image}
            />
          )}
        </View>
        <View style={styles.bottom_container}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => chooseFromLibrary()}>
            <Icon name="image" color="#00344F" size={35} />
          </TouchableOpacity>
          <View style={{marginRight: 15}}>
            <ButtonWithIcon
              title="Send"
              onTap={() => onTapSend()}
              width={100}
              height={40}
              btnColor="#7182BD"
              txtColor="white"
              disable={disablePost}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  exit_icon: {
    right: 75,
    position: 'absolute',
    bottom: -25,
  },
  top_container_title: {
    fontSize: 30,
    fontFamily: 'bahnschrift',
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
  },
  bottom_container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inside_container: {
    backgroundColor: '#E4E4E4',
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
  },
  inside_top_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    marginTop: 11,
    color: 'black',
    marginLeft: 5,
  },
  username: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 5,
    color: 'gray',
    fontFamily: 'Roboto-Regular',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  text_field_container: {
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 45,
    marginRight: 25,
    paddingRight: 10,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  textField: {
    width: 300,
    height: 50,
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Regular',
  },
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  post_image: {
    width: '80%',
    height: undefined,
    alignItems: 'center',
    borderRadius: 10,
    aspectRatio: 1,
    marginLeft: 15,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  postReducer: state.postReducer,
});

const PostQuoteScreen = connect(mapToStateProps, {onPostQuote})(
  _PostQuoteScreen,
);

export {PostQuoteScreen};
