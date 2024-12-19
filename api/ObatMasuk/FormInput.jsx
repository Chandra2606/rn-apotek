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
import ModalDataSup from './ModalDataSup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';
export default function FormInput() {

  const navigation = useNavigation();
  const [modalObatVisible, setModalObatVisible] = useState(false);
  const [modalSupVisible, setModalSupVisible] = useState(false);
  const [kodeMasuk, setKodeMasuk] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [selectedObat, setSelectedObat] = useState({kodeobat: '', namaobat: '', hargabeli:''});
  const [selectSup, setSelectedSup] = useState({
    kode: '',
    nama: '',
  });
  const [tglMasuk, setTglMasuk] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [total, setTotal] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  
   const calculateTotal = () => {
     const price = parseFloat(selectedObat.hargabeli);
     const quantity = parseFloat(jumlah);
     if (!isNaN(price) && !isNaN(quantity)) {
       setTotal((price * quantity).toString());
     }
   };

     useEffect(() => {
       calculateTotal();
     }, [jumlah, selectedObat.hargabeli]);

  const onObatSelected = (kodeobat, namaobat, hargabeli) => {
    setSelectedObat({kodeobat, namaobat, hargabeli});
    setModalObatVisible(false); 
  };
  const onSupSelected = (kode, nama) => {
    setSelectedSup({kode, nama});
    setModalSupVisible(false); 
  };
   const onDateChange = (event, selectedDate) => {
     const currentDate = selectedDate || tglMasuk;
     setDatePickerVisible(Platform.OS === 'ios');
     setTglMasuk(currentDate);
   };
   const formatDate = date => {
     return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
   };
  const modalSearchObat = () => {
    setModalObatVisible(true); // Buka hanya modal Obat
  };
  const modelSearchSup = () => {
    setModalSupVisible(true); // Buka hanya modal Sup
  };
  const submitJadwal = async () => {
    setLoading(true);
    setValidationErrors({});
    const dataToSend = {
      kodemasuk: kodeMasuk, // Ambil dari state atau Input component
      masukkodeobat: selectedObat.kodeobat,
      masukkodesup: selectSup.kode,
      tglmasuk: tglMasuk.toISOString().split('T')[0],
      jumlah: jumlah, // Ambil dari state atau Input component
      totalmasuk: total,
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiUrl}obatmasuk`, {
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
        Alert.alert('Berhasil', 'Data obat masuk berhasil disimpan', [
          {
            text: 'Ok',
            onPress: () => {
              setKodeMasuk('');
              setJumlah('');
              setSelectedObat({nidn: '', nama: '',hargabeli:''});
              setSelectedSup({kode: '', nama: ''});
              setTglMasuk(new Date());
              setShowPicker(false);
              setTotal('');
              setValidationErrors({});
              navigation.navigate('DataMasuk', {dataAdded: true});
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
          value={kodeMasuk}
          onChangeText={setKodeMasuk}
          label="Kode Obat Masuk"
          labelStyle={styles.labelInput}
          placeholder="Input Kode Obat Masuk"
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.kodemasuk}
        />
        <View style={styles.dateContainer}>
          <Button
            title="Pilih Tanggal"
            onPress={() => setDatePickerVisible(true)}
          />
          {datePickerVisible && (
            <DateTimePicker
              value={tglMasuk}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <Text style={styles.dateDisplay}>
            Tanggal Obat Masuk: {formatDate(tglMasuk)}
          </Text>
        </View>
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Supplier"
              labelStyle={styles.labelInput}
              placeholder="Cari Supplier..."
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectSup.kode} - ${selectSup.nama}`}
              errorMessage={validationErrors.masukkodesup}
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
              onPress={modelSearchSup}
            />
            <ModalDataSup
              isVisible={modalSupVisible}
              onClose={() => setModalSupVisible(false)}
              onSupSelected={onSupSelected} // Memberikan callback ke
              ModalDataObat
            />
          </View>
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
              errorMessage={validationErrors.masukkodeobat}
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
          value={`${selectedObat.hargabeli}`}
          onChangeText={setJumlah}
          label="Harga Beli"
          labelStyle={styles.labelInput}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          disabled={true}
        />
        <Input
          value={jumlah}
          onChangeText={text => {
            setJumlah(text);
            calculateTotal();
          }}
          label="Qty"
          labelStyle={styles.labelInput}
          placeholder="Input Qty..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.jumlah}
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
          errorMessage={validationErrors.total}
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
