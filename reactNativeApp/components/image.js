const ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
const options = {
    title: 'Select Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    } else {
        const source = { uri: response.uri };
        this.setState({
            avatarSource: source,
        });
    }
});
