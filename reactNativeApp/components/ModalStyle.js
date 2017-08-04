import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 100,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '80%',
    },
    bottomModal: {
        backgroundColor: 'white',
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '100%',
    },
    leftModal: {
        alignItems: 'flex-start',
        margin: 0,
    },
    rightModal: {
        alignItems: 'flex-end',
        margin: 0,
    },
});
