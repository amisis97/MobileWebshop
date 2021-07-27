import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text, Icon } from '@ui-kitten/components';
import ProductsScreen from '../pages/ProductsScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from '../pages/ProfileScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props) => (
  <Icon {...props} name='home-outline' />
);

const ProductsIcon = (props) => (
  <Icon {...props} name='shopping-bag-outline' />
);

const ProfilIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const UsersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Kezdőlap' icon={HomeIcon} />
    <BottomNavigationTab title='Termékek' icon={ProductsIcon} />
    <BottomNavigationTab title='Profil' icon={ProfilIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Users' component={UsersScreen} />
    <Screen name='Orders' component={ProductsScreen} />
    <Screen name='Profil' component={ProfileScreen} />
  </Navigator>
);

export default BottomAppNavigator = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  </SafeAreaView>
);