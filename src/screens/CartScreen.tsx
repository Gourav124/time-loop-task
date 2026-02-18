import { View, Text, ScrollView, FlatList, Image, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from '@react-native-vector-icons/fontawesome'

const {width,height}=Dimensions.get('window');

type Product = {
  id: number,
  category: string,
  title: string,
  description: string,
  price: string,
  thumbnail: string

}

const CartScreen = () => {

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true)

  const fetchCarts = async () => {
    try {
      const cartIems = await AsyncStorage.getItem('cart');
      const cart = JSON.parse(cartIems || '[]');
      setCartItems(cart);
      setLoading(false)
      console.log(cart)
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (product: Product) => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      let cart: Product[] = JSON.parse(cartData || '[]');
      cart = cart.filter((item) => item.id !== product.id);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setCartItems(cart);
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price), 0);

  useEffect(() => {
    fetchCarts();
  }, [cartItems])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#dbebecff' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'bold', margin: 20 }}>My Cart</Text>
        {
          loading
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#58a6caff" />
            </View>
            :
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              ListEmptyComponent={
                <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                  <Text>Cart is Empty !</Text>
                </View>
              }
              renderItem={({ item }) => {
                return (
                  <View style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: '#fff',
                    margin: 10,
                    borderRadius: 8
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: item.thumbnail }}
                        style={{
                          width: width*0.3,
                          height: height*0.12,
                          resizeMode: 'contain',
                          backgroundColor: '#d9e2e69e',
                          borderRadius: 8
                        }} />
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: '#edb149ff' }}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#159e55ff' }}>₹ {item.price}</Text>
                          <FontAwesome
                            name='trash'
                            size={18}
                            color='red'
                            onPress={() => removeFromCart(item)}
                            style={{ margin: 10 }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }}
            />
        }

        <View style = {{alignItems:'flex-start',padding:10,justifyContent:'space-between',flexDirection:'row',borderRadius:8}}>
          <Text style = {{fontWeight:'bold',fontSize:18}}>Total Price</Text>
          <Text style = {{fontSize:18}}>₹{totalPrice.toFixed(2)}</Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default CartScreen