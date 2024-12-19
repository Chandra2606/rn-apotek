import React, {useState} from 'react';
import {ScrollView, StyleSheet, Alert, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormTambah = () => {
  const [kodesup, setKodeSup] = useState('');
  const [namaSup, setNamaSup] = useState('');
  const [alamat, setAlamat] = useState('');
  const [noTelp, setNoTelp] = useState('');

  const navigation = useNavigation();
  const [validationErrors, setValidationErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  let token;
  const submitForm = () => {
    checkToken();
    setIsSaving(true);
    setValidationErrors({});
  };

  const checkToken = async () => {
    token = await AsyncStorage.getItem('userToken');
    if (!token) {
      navigation.navigate('Login');
    } else {
      const formData = {
        kodesup: kodesup,
        namasup: namaSup,
        alamatsup: alamat,
        nohp: noTelp,
      };
      fetch(`${apiUrl}supplier`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then(async response => {
          const data = await response.json();
          if (!response.ok) {
            setIsSaving(false);
            if (response.status === 422) {
              let errors = {};
              Object.keys(data.errors).forEach(key => {
                errors[key] = data.errors[key][0];
              });
              setValidationErrors(errors);
            } else {
              throw new Error(
                data.message || 'Terjadi kesalahan saat menyimpan data.',
              );
            }
            return;
          }
          setIsSaving(false);
          Alert.alert('Success', 'Data Supplier berhasil ditambahkan', [
            {
              text: 'ok',
              onPress: () =>
                navigation.navigate('DataSupplier', {dataAdded: true}),
            },
          ]);
        })
        .catch(error => {
          //handle failure
          setIsSaving(false);
          Alert.alert('Error', error.toString());
        });
    }
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Input
        placeholder="Kode Supplier"
        value={kodesup}
        onChangeText={setKodeSup}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user-circle" size={24} color="black" />}
        errorMessage={validationErrors.kodesup}
      />

      <Input
        placeholder="Nama Supplier"
        value={namaSup}
        onChangeText={setNamaSup}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        leftIcon={<Icon name="user" size={24} color="black" />}
        errorMessage={validationErrors.namasup}
      />

      <Input
        placeholder="Alamat Supplier"
        value={alamat}
        onChangeText={setAlamat}
        leftIcon={<Icon name="map-marker-alt" size={24} color="black" />}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.alamat}
      />

      <Input
        placeholder="Nomor Telpon"
        value={noTelp}
        onChangeText={setNoTelp}
        leftIcon={<Icon name="phone" size={24} color="black" />}
        placeholderTextColor="#888"
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        errorMessage={validationErrors.nohp}
        keyboardType="number-pad"
      />

      <Button
        title="Simpan Data"
        onPress={submitForm}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitTitle}
        loading={isSaving}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
  },
  container: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
  inputText: {
    color: '#000',
  },
  pickerContainer: {
    marginBottom: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#387ADF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  submitTitle: {
    color: '#fff', //warna text tombol
  },
  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default FormTambah;
