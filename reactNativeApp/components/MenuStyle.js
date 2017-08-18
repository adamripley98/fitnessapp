import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    menu: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 20,
        backgroundColor: '#ff5c41',
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 75,
        top: 30,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});
