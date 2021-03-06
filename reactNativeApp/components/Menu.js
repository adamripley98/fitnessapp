import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';

import menuStyles from './MenuStyle';

const window = Dimensions.get('window');
const uri1 = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const uri = 'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Duck-PNG-Transparent-Image-1-500x587.png';
const profPic = '../assets/jchen.png';


const xIcon = require('../assets/icons/xIcon.png');
const xIcon2 = require('../assets/icons/xIcon2.png');
const hamburgerIcon = require('../assets/icons/hamburgerIcon.png');


export default class Menu extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };

    xButton = () => (
      <View style={{
          position: 'absolute',
          top: 10,
          right: 0,
          zIndex: 1,
      }}
      >
        <TouchableOpacity
          onPress={() => this.props.xPressed()}
          style={{ width: 30, height: 30 }}
        >
          <View>
            <Image
              source={xIcon2}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )

    logout = () => {
        firebase.auth().signOut().then(() => {
        // Sign-out successful
        }).catch((error) => {
        // An error happened.
            alert(error.message);
        });
    }

    render() {
        return (
          <ScrollView scrollEnabled={false} scrollsToTop={false} style={menuStyles.menu}>
            {this.xButton()}
            <View style={menuStyles.avatarContainer}>
              <Image
                style={menuStyles.avatar}
                source={{ uri: this.props.profPic }}
              />
              <Text style={menuStyles.name}>{this.props.name}</Text>
            </View>

            {console.log('istrainer???', this.props.isTrainer)}
            {
              this.props.isTrainer === false ?
                <Text
                  onPress={() => this.props.onItemSelected('UserProfile')}
                  style={menuStyles.item}
                >
                  Profile
                </Text> :
                <Text
                  onPress={() => this.props.onItemSelected('TrainerProfile')}
                  style={menuStyles.item}
                >
                  Profile
                </Text>
          }
            <Text
              onPress={() => this.props.onItemSelected('PaymentSettings')}
              style={menuStyles.item}
            >
              Payment Settings
            </Text>

            <Text
              onPress={() => this.logout()}
              style={menuStyles.item}
            >
              Logout
            </Text>
          </ScrollView>
        );
    }
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    xPressed: PropTypes.func.isRequired,
};
