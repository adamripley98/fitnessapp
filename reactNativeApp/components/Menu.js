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
import LinearGradient from 'react-native-linear-gradient';
import Orientation from 'react-native-orientation';
import menuStyles from './MenuStyle';

const window = Dimensions.get('window');
const uri1 = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const uri = 'http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Duck-PNG-Transparent-Image-1-500x587.png';
const profPic = '../assets/jchen.png';


const xIcon = require('../assets/icons/xIcon.png');


export default class Menu extends React.Component {
    constructor(props) {
        super(props);
    }
    xButton = () => (
      <View style={{
          position: 'absolute',
          top: 10,
          right: 0,
      }}
      >
        <TouchableOpacity onPress={() => this.props.xPressed()}>
          <View>
            <Image
              source={xIcon}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
    render() {
        return (
          <ScrollView scrollEnabled={false} scrollsToTop={false} style={menuStyles.menu}>
            {this.xButton()}

            <View style={menuStyles.avatarContainer}>
              <Image
                style={menuStyles.avatar}
                source={{ uri }}
              />
              <Text style={menuStyles.name}>Jeffrey Chen</Text>
            </View>

            <Text
              onPress={() => this.props.onItemSelected('Map')}
              style={menuStyles.item}
            >
              Map
            </Text>

            <Text
              onPress={() => this.props.onItemSelected('Profile')}
              style={menuStyles.item}
            >
              Profile
            </Text>

            <Text
              onPress={() => this.props.onItemSelected('Payment')}
              style={menuStyles.item}
            >
              Payment
            </Text>
          </ScrollView>
        );
    }
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
    xPressed: PropTypes.func.isRequired,
};
