import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import ModalDataObat from './ModalDataObat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';
export default function FormInput() {

  const navigation = useNavigation();
  const [modalObatVisible, setModalObatVisible] = useState(false);
  const [kodekeluar, setKodeKeluar] = useState('');
  const [qty, setQty] = useState('');
  const [selectedObat, setSelectedObat] = useState({kodeobat: '', namaobat: '', hargajual:''});

  const [tglKeluar, setTglKeluar] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [total, setTotal] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  
   const calculateTotal = () => {
     const price = parseFloat(selectedObat.hargajual);
     const quantity = parseFloat(qty);
     if (!isNaN(price) && !isNaN(quantity)) {
       setTotal((price * quantity).toString());
     }
   };

     useEffect(() => {
       calculateTotal();
     }, [qty, selectedObat.hargajual]);

  const onObatSelected = (kodeobat, namaobat, hargajual) => {
    setSelectedObat({kodeobat, namaobat, hargajual});
    setModalObatVisible(false); 
  };

   const onDateChange = (event, selectedDate) => {
     const currentDate = selectedDate || tglKeluar;
     setDatePickerVisible(Platform.OS === 'ios');
     setTglKeluar(currentDate);
   };
   const formatDate = date => {
     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
   };
  const modalSearchObat = () => {
    setModalObatVisible(true); // Buka hanya modal Obat
  };

  const submitJadwal = async () => {
    setLoading(true);
    setValidationErrors({});
    const dataToSend = {
      kodekeluar: kodekeluar, // Ambil dari state atau Input component
      keluarkodeobat: selectedObat.kodeobat,
      tglkeluar: tglKeluar.toISOString().split('T')[0],
      qty: qty, // Ambil dari state atau Input component
      totalkeluar: total,
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiUrl}obatkeluar`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          // Jika ada kesalahan validasi, akan masuk ke sini
          if (response.status === 422) {
            // Handle validation errors
            let errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = data.errors[key][0]; // Ambil hanya pesan pertama untuk setiapfield;
            });
            setValidationErrors(errors);
          } else {
            throw new Error(
              data.message || 'Terjadi kesalahan saat menyimpan data.',
            );
          }
          return;
        }
        setLoading(false);
        Alert.alert('Berhasil', 'Data obat keluar berhasil disimpan', [
          {
            text: 'Ok',
            onPress: () => {
              setKodeKeluar('');
              setQty('');
              setSelectedObat({nidn: '', nama: '',hargajual:''});
              setTglKeluar(new Date());
              setShowPicker(false);
              setTotal('');
              setValidationErrors({});
              navigation.navigate('DataKeluar', {dataAdded: true});
            },
          },
        ]);
      })
      .catch(error => {
        // Handle failure
        console.log(`Gagal Simpan Data : ${error}`);
      });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.container}>
        <Input
          value={kodekeluar}
          onChangeText={setKodeKeluar}
          label="Kode Obat Keluar"
          labelStyle={styles.labelInput}
          placeholder="Input Kode Obat Keluar"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.kodekeluar}
        />
        <View style={styles.dateContainer}>
          <Button
            title="Pilih Tanggal"
            onPress={() => setDatePickerVisible(true)}
          />
          {datePickerVisible && (
            <DateTimePicker
              value={tglKeluar}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <Text style={styles.dateDisplay}>
            Tanggal Obat Keluar: {formatDate(tglKeluar)}
          </Text>
        </View>
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Obat"
              labelStyle={styles.labelInput}
              placeholder="Cari Obat"
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectedObat.kodeobat} - ${selectedObat.namaobat}`}
              errorMessage={validationErrors.keluarkodeobat}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cari"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                height: 50,
                backgroundColor: '#FBA834',
                borderRadius: 10,
              }}
              onPress={modalSearchObat}
            />
            <ModalDataObat
              isVisible={modalObatVisible}
              onClose={() => setModalObatVisible(false)}
              onObatSelected={onObatSelected} // Memberikan callback ke ModalDataObat
            />
          </View>
        </View>
        <Input
          value={`${selectedObat.hargajual}`}
          onChangeText={setQty}
          label="Harga Jual"
          labelStyle={styles.labelInput}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          disabled={true}
        />
        <Input
          value={qty}
          onChangeText={text => {
            setQty(text);
            calculateTotal();
          }}
          label="Qty"
          labelStyle={styles.labelInput}
          placeholder="Input Qty..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.qty}
          keyboardType="number-pad"
        />
        <Input
          value={total}
          onChangeText={setTotal}
          label="Total"
          labelStyle={styles.labelInput}
          disabled={true}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.totalkeluar}
        />
        <Button
          title={loading ? 'Tunggu...' : 'Simpan Data'}
          disabled={loading}
          onPress={submitJadwal}
          buttonStyle={{marginHorizontal: 10}}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
  },
  labelInput: {
    color: '#387ADF',
    borderBottomColor: '#387ADF',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  labelInputHari: {
    color: '#387ADF',
    borderBottomColor: '#387ADF',
    marginBottom: 2,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 16,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    elevation: 3,
  },
  inputText: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 25,
  },
  pickerContainer: {
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 20,
  },
  picker: {
    color: 'black',
    fontWeight: 'bold',
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
