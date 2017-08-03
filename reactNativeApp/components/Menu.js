import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri1 = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const uri = 'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Duck-PNG-Transparent-Image-1-500x587.png';
const profPic = '../assets/jchen.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#ff5c41',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

export default function Menu({ onItemSelected }) {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri }}
          />
          <Text style={styles.name}>Jeffrey Chen</Text>
        </View>

        <Text
          onPress={() => onItemSelected('About')}
          style={styles.item}
        >
        About
      </Text>

        <Text
          onPress={() => onItemSelected('Contacts')}
          style={styles.item}
        >
        Contacts
      </Text>
      </ScrollView>
    );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};
