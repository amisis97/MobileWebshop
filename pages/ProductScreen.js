import React, { useState, useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { StyleSheet, Image, ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from '@ui-kitten/components';

export default ProductScreen = ({ navigation, route }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/getproducts.php?productId=' + route.params.productId)
            .then(resp => resp.json())
            .then(data => setData(data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const BackIcon = (props) => (
        <Icon {...props} name='arrow-back' />
    );

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
    );

    if(isLoading) {
        return (
        <Layout style={styles.container} level='1'>
            <Text>Töltés...</Text>
        </Layout>
        )
    } else {
        const images = JSON.parse(data.images ?? data.images);
        const imageUrl = images.length > 0 ?
        'https://www.alexandra.siteset.hu/tools/packages/etalon_gyartas_fejl/image?&pid=' + images[0] + '&w=1000&h=1000&ratio=1' :
        'https://www.alexandra.siteset.hu/packages/alexandra/images/no_img.jpg';

        return (
            <Layout style={styles.container} level='1'>
                <TopNavigation
                    alignment='center'
                    title={data.name}
                    subtitle={data.szerzo}
                    accessoryLeft={renderBackAction}
                />
                <ScrollView>
                    <FastImage
                        style={styles.productLogo}
                        source={{
                            uri: imageUrl,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{ marginTop: 20 }} category={'h4'}>{data.name}</Text>
                    <Text style={{ marginTop: 20, textAlign: 'justify' }} >{data.description}</Text>
                </ScrollView>
                <View style={styles.hoverDiv}>
                    <Button>Kosárba</Button>
                </View>
            </Layout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
    },
    productLogo: {
        width: '100%',
        height: 500
    },
    hoverDiv: {
        padding: 10,
    }
});