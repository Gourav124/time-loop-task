import { View, Text, StyleSheet, ActivityIndicator, ViewBase, Image, Pressable, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { height, width } = Dimensions.get('window');

type Product = {
  id: number,
  category: string,
  title: string,
  description: string,
  price: string,
  thumbnail: string

}

const ProductDetailsScreen = ({ route, navigation }: any) => {

  const product = route.params.product;
  const [loading, setLoading] = useState(false)
  const [isVisible, setVisible] = useState(false)
  const [error, setError] = useState(false)

  const addToCart = async (product: Product) => {
    try {
      const cartItems = await AsyncStorage.getItem('cart');
      const cart = JSON.parse(cartItems || '[]');
      const isProductInCart = cart.some((item: Product) => item.id === product.id);

      if (isProductInCart) {
        Toast.show({
          type: 'info',
          text1: 'Product already in the cart',
        });

        return false;
      }
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      console.log('Product added to cart:', product);
      return true;
    } catch (error) {
      console.log('Error :', error);
      return false;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dbebecff' }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingBottom: 100 }]}>
            <FontAwesome name='arrow-left' size={24} color='#4a4e4fff' onPress={() => navigation.goBack()} />
          <Image
            source={{
              uri: product.thumbnail
            }}
            style={{
              width: '100%',
              height: height * 0.3,
              resizeMode: 'contain',
              backgroundColor: '#fff',
              borderRadius: 8,
              marginTop: 15
            }} />
          <Text style={{ fontWeight: 'bold', fontSize: 22, marginTop: 15 }}>{product.title}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#159e55ff', marginTop: 10 }}>₹ {product.price}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>About</Text>
          <Text style={{ fontWeight: 'semibold', fontSize: 16, marginTop: 6 }}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={{
        flexDirection: 'row',
        bottom: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: width * 0.9,
        alignSelf: 'center'
      }}>
        <TouchableOpacity onPress={() => Toast.show({type:'info',text1:'To buy product you have to login !'})} style={styles.button}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const added = await addToCart(product);
            if (added) {
              Toast.show({
                type: 'success',
                text1: 'Product added to cart',
              });
            }
          }} style={styles.button}
        >
          <Text style={styles.btnText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>


  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#dbebecff'
  },
  button: {
    backgroundColor: '#ebb027ff',
    borderRadius: 8,
    paddingHorizontal: width * 0.12,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  documentModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16
  },
  documentModalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 30,
    elevation: 10,
    alignItems: 'center',
  },

});