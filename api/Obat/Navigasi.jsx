import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Data from './Data';
import DetailData from './Detaildata';
import {StatusBar} from 'react-native';
import FormTambah from './FormTambah';
import FormEdit from './FormEdit';
import FormUpload from './FormUpload';

export default function Navigasi() {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#387ADF"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataObat">
        <Stack.Screen
          name="DataObat"
          component={Data}
          options={{
            headerTitle: 'Data Obat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
          }}
        />
        <Stack.Screen
          name="DetailObat"
          component={DetailData}
          options={{
            headerTitle: 'Detail Obat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
          }}
        />
        <Stack.Screen
          name="FormTambah"
          component={FormTambah}
          options={{
            headerTitle: 'Tambah Obat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEdit"
          component={FormEdit}
          options={{
            headerTitle: 'Edit Obat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormUpload"
          component={FormUpload}
          options={{
            headerTitle: 'Update Foto Obat',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#387ADF',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
