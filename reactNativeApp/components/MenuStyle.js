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
        width: 90,
        height: 90,
        borderRadius: 45,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 102,
        top: 31,
        fontSize: 25,
    },
    item: {
        fontSize: 20,
        fontWeight: '300',
        paddingTop: 5,
        padding: 2,
    },
});
