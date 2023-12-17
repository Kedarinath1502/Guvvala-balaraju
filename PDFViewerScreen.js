import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview'

const PDFViewerScreen = ({ route }) => {
  const { pdfUrl } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <WebView
          source={{ uri: pdfUrl }}
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});

export default PDFViewerScreen;