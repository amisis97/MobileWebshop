import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card, Layout, Text, TopNavigation, Button, Modal } from '@ui-kitten/components';
import FastImage from 'react-native-fast-image';

export default ProfileScreen = () => {

    const [visible, setVisible] = React.useState(false);


    return (
        <Layout style={styles.container} level='1'>
            <Text style={{ marginLeft: 25 }} category={'h1'}>Profilom</Text>
            <ScrollView style={styles.view}>
                <TouchableHighlight onPress={() => setVisible(true)}>
                    <Image resizeMode="contain" style={styles.memberCard}
                        source={require('../assets/generate_card.png')}
                    />
                </TouchableHighlight>
            </ScrollView>
            <Modal
                visible={visible}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setVisible(false)}>
                <Card disabled={true}>
                    <Text>Welcome to UI Kitten 😻</Text>
                    <Button onPress={() => setVisible(false)}>
                        DISMISS
                    </Button>
                </Card>
            </Modal>

        </Layout>
    );
}

const styles = {
    container: {
        flex: 1,
    },
    view: {
        paddingLeft: 20,
        paddingRight: 20
    },
    memberCard: {
        width: '100%',
        height: 220
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}