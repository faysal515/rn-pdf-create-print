/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import RNPrint from 'react-native-print';




type Props = {};


export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      directory: null
    }
  }

  async componentDidMount() {
    try {
      const directory = await PDFLib.getDocumentsDirectory();
      this.setState({directory})
      console.log('.. ', directory)
    } catch (e) {
      console.log('err cmdm ', e)
    }

  }
  onCLick(e) {
    console.log('ok.')
    const page1 = PDFPage
    .create()
    .setMediaBox(200, 200)
    .drawText('You can add text and rectangles to the PDF!', {
      x: 5,
      y: 235,
      color: '#007386',
    })
    .drawRectangle({
      x: 25,
      y: 25,
      width: 150,
      height: 150,
      color: '#FF99CC',
    })
    .drawRectangle({
      x: 75,
      y: 75,
      width: 50,
      height: 50,
      color: '#99FFCC',
    });


    const { directory } = this.state
    console.log('directory ', directory)
    const pdfPath = `${directory}/faysal.pdf`;
    PDFDocument
    .create(pdfPath)
    .addPages(page1)
    .write() // Returns a promise that resolves with the PDF's path
      .then(path => {
        console.log('PDF created at: ' + path);

      })
      .catch(e => console.log('errr ', e))
    .catch(e => console.log('errr out ', e))
  }

  async doPrint(e) {
    try {
      await RNPrint.print({ filePath: `${this.state.directory}/faysal.pdf` })
      console.log('what')
    } catch (e) {
      console.log('err print', e)
    }
    // console.log(this.state)


  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={e => this.onCLick(e)}
          title="Generate PDF"
          color="#841584"
        />
        <Button
          onPress={e => this.doPrint(e)}
          title="Pring PDF"
          color="green"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
