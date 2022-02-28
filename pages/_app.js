import React from 'react';
import App from 'next/app';
import {initializeApp} from "firebase/app";
import { config } from "config/firebase";
import { ChakraProvider } from '@chakra-ui/react'
class PageApp extends App {
  
  componentDidMount() {
    initializeApp(config)
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    )}
}

export default PageApp
