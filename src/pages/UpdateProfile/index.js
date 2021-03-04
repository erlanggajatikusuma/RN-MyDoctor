import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {Firebase} from '../../config';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoDB, setPhotoDB] = useState('');

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const update = () => {
    console.log('Profile: ', profile);
    console.log('New Password: ', password);

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password min 6 characters',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        updatePassword();
        updateProfileData();
        navigation.replace('MainApp');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp');
    }
  };

  const updatePassword = () => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updatePassword(password).catch((error) => {
          showMessage({
            message: error.message,
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        });
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoDB;
    Firebase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        console.log('Success', data);
        storeData('user', data);
      })
      .catch((error) => {
        showMessage({
          message: error.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxHeight: 200,
        maxWidth: 200,
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel || response.error) {
          showMessage({
            message: 'Oops, sepertinya anda tidak memilih fotonya',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          const base64Photo = `data:${response.type};base64, ${response.base64}`;
          const source = {uri: response.uri};
          setPhotoDB(base64Photo);
          setPhoto(source);
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {padding: 40, paddingTop: 0},
});
