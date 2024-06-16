import {Alert, Button, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function App() {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const [hasScannedCode, setHasScannedCode] = useState(false);

  //   console.log(hasPermission);
  if (!hasPermission) {
    requestPermission()
      .then(reason => {
        console.log('App has camera permissions: ', reason);
      })
      .catch(e => {
        console.log(e);
      });
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(codes?.[0]?.value);

      if (!hasScannedCode && codes.length > 0) {
        setHasScannedCode(true);

        Alert.alert('Code Scanned', codes?.[0]?.value);
      }
    },
  });

  console.log('Has camera permissions: ', Platform.OS, hasPermission);
  console.log('Has device: ', Platform.OS, hasPermission);

  if (!hasPermission) {
    return (
      <View>
        <Button title="Request Camera Permissions" />
      </View>
    );
  }

  if (!device) {
    return (
      <View>
        <Text>You have no camera on your device</Text>
      </View>
    );
  }

  //
  //
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
}

const styles = StyleSheet.create({});
