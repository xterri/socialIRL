import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Button,
    FlatList,
    TouchableOpacity, 
} from 'react-native';
import ListItem, { Separator } from '../components/ListItem';


import data from '../devSource/events.json';

const ListMainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 8, borderColor: 'red', borderWidth: 3 }}>
                <FlatList
                    data={data.eventDetails}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <ListItem
                                {...item}
                                onSwipeFromLeft={() => alert('swiped from left')}
                                onRightPress={() => alert('pressed right')}
                            />
                        );
                    }}
                    ItemSeparatorComponent={() => <Separator />}
                />
            </View>

            <View style={styles.bottomContainer}>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'green' }]} 
                    onPress={() => alert('Interested, change card')}
                >
                    <Text style={styles.textButton}>Like</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: 'red' }]} 
                    onPress={() => alert('Not interested, change card')}
                >
                    <Text style={styles.textButton}>Dislike</Text>
                </TouchableOpacity>

            </View>
            {/* TODO: add notification and button to begin event and confirm attendance */}
            <Button title='START EVENT?' onPress={() => navigation.navigate('ConfirmAttendance')} />
        </View>
    );
};

/*
** Edit MainScreen Header
*/
ListMainScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (
            <Button
                onPress={() => alert('Switch to Host/User View!')}
                title='Switch'
            />
        ),
        headerLeft: (
            <Button
                onPress={() => navigation.navigate('AccountMain')}
                title='Account'
            />
        ),
        headerRight: (
            <Button
                onPress={() => navigation.navigate('ChatList')}
                title='Chats'
            />
        )
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomContainer: {
        // height: 60, 
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        borderColor: 'green', 
        borderWidth: 3
    },
    button: {
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        width: 50,
    },
    textButton: {
        fontWeight: '800',
        color: '#fff'
    },
});

export default ListMainScreen;