import React from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './screens/HomeScreen';
import ScanScreen from './screens/ScanScreen';
import MapScreen from './screens/MapScreen';
import ShopScreen from './screens/ShopScreen';
import ProfileScreen from './screens/ProfileScreen';

import { House, Camera, MapTrifold, ShoppingBag, User } from 'phosphor-react-native';

const Tab = createBottomTabNavigator();

const PALETTE = {
  primary: '#4988C4',
  secondary: '#1C4D8D', 
  white: '#FFFFFF',
  scanAccent: '#00E5FF',
  gray: '#A0BFDE'
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => {
          const isScanScreen = route.name === 'Scan';

          return {
            headerShown: false,
            tabBarShowLabel: false,
            
            // --- KONFIGURASI NAVBAR ---
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 90, 
              backgroundColor: isScanScreen ? 'transparent' : '#FFFFFF', 
              borderTopLeftRadius: 30, 
              borderTopRightRadius: 30,
              borderTopWidth: 0,
              elevation: isScanScreen ? 0 : 10, 
              shadowColor: '#000',
              shadowOpacity: isScanScreen ? 0 : 0.1,
              shadowRadius: 10,
              paddingBottom: 0,
            },

            tabBarItemStyle: {
              height: 90, 
              justifyContent: 'center', 
              // Kamu juga bisa pakai paddingTop disini, tapi lebih presisi pakai logic di bawah
            },

            tabBarIcon: ({ focused }) => {
              let IconComponent = House;
              if (route.name === 'Scan') IconComponent = Camera;
              if (route.name === 'Map') IconComponent = MapTrifold;
              if (route.name === 'Shop') IconComponent = ShoppingBag;
              if (route.name === 'Profile') IconComponent = User;
              
              // Perbaikan kecil: Saat scan screen, inactive color sebaiknya putih transparan biar kelihatan
              const activeColor = isScanScreen ? PALETTE.scanAccent : PALETTE.primary;
              const inactiveColor = isScanScreen ? PALETTE.gray : PALETTE.gray;

              return (
                <View style={{ 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  top: 15
                }}>
                  <IconComponent 
                    color={focused ? activeColor : inactiveColor} 
                    size={28} 
                    weight={focused ? "fill" : "regular"} 
                  />
                  
                  {focused && (
                     <View style={{ 
                       width: 4, 
                       height: 4, 
                       borderRadius: 2, 
                       backgroundColor: activeColor, 
                       marginTop: 6 
                     }} />
                  )}
                </View>
              );
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});