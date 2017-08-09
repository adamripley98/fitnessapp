import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 0,
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '85%',
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
    leftModalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 10,
        top: 20,
    },
    rightModalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 20,
    },
    bottomModalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '10%',
        bottom: 0,
    },
    bottomButton: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: '98%',
        height: '100%',
    },
    xButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 12,
        backgroundColor: 'blue',
    },
    leftXButtonPosition: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    leftModalContent: {
        backgroundColor: 'blue',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        width: '100%',
    },
    modalPage: {
        backgroundColor: 'white',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        position: 'absolute',
        left: 0,
        top: 0,
    },
});
