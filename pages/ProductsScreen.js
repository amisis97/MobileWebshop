import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableHighlight } from 'react-native';
import { Card, Layout, Text, TopNavigation, Button } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './ProductScreen';
import FastImage from 'react-native-fast-image';

const productsStack = createStackNavigator();

export default ProductsScreen = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/getproducts.php')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const productsGrid = [];

    data.forEach(d => {
        const images = JSON.parse(d.images);
        const imageUrl = images.length > 0 ?
            'https://www.alexandra.siteset.hu/tools/packages/etalon_gyartas_fejl/image?&pid=' + images[0] + '&w=300&h=300&ratio=1' :
            'https://www.alexandra.siteset.hu/packages/alexandra/images/no_img.jpg';
        productsGrid.push(
            <View key={d.id} style={styles.productTile}>
                <FastImage
                    style={styles.productLogo}
                    source={{
                        uri: imageUrl,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text category={'s1'} style={{ height: 40 }}>{d.name}</Text>
                <Text category={'c1'} style={{ height: 40 }}>{d.szerzo}</Text>
                <Text category={'p1'}>{Math.round(d.price) + ' Ft'}</Text>
                <Button style={{marginTop: 10}} onPress={() => {navigation.navigate('Product', {productId: d.id})}}>
                    Tovább
                </Button>
            </View>
        );
    });

    const productsComp = () => (
        <View style={{backgroundColor: '#fff'}}><Text style={{ marginLeft: 25 }} category='h1'>Termékek</Text>
            <ScrollView contentContainerStyle={[styles.container, {
                // Try setting `flexDirection` to `"row"`.
                flexDirection: "row"
            }]}>
                {productsGrid}
            </ScrollView>
        </View>
    );

    return (
        <Layout style={{ flex: 1 }}>
            <productsStack.Navigator screenOptions={{ headerShown: false }}>
                <productsStack.Screen name="Products" component={productsComp} />
                <productsStack.Screen name="Product" component={ProductScreen} />
            </productsStack.Navigator>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexWrap: 'wrap',
    },
    productTile: {
        width: '50%',
        padding: 10
    },
    productLogo: {
        height: 220,
    },
});