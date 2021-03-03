import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DummyUser} from '../../../assets';
import {colors, fonts} from '../../../utils';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.borderPofile}>
        <Image source={DummyUser} style={styles.avatar} />
      </View>
      <Text style={styles.name}>Shayana Melinda</Text>
      <Text style={styles.profession}>Product Designer</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {justifyContent: 'center', alignItems: 'center'},
  avatar: {width: 110, height: 110, borderRadius: 110 / 2},
  borderPofile: {
    borderRadius: 130 / 2,
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
  },
  profession: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
  },
});
