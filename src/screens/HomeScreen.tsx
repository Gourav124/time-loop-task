import { View, Text, Dimensions, StyleSheet, ActivityIndicator, FlatList, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategoriesApi, getProductsByCategoryApi } from '../api/apis';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

type Category = {
    slug: string,
    name: string,
    url: string
}

type Product = {
    id: number,
    category: string,
    title: string,
    description: string,
    price: string,
    thumbnail: string

}

const HomeScreen = ({ navigation }: any) => {

    const [category, setCategory] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Beauty');
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false)

    const fetchcategories = async () => {
        try {
            const response = await getCategoriesApi();
            setCategory(response.data)
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true)
            setLoading(false)
        }
    }

    const fetchProductsByCategory = async (category: string) => {
        try {
            const response = await getProductsByCategoryApi(category);
            setProducts(response.data.products);
            setError(false)
        } catch (error) {
            console.log(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryPress = (category: string) => {
        setSelectedCategory(category);
        setLoading(true);
        fetchProductsByCategory(category);
    }

    const handleSearch = () => {
        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
    }

    useEffect(() => {
        fetchcategories();
        fetchProductsByCategory(selectedCategory);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.searchInput}>
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search for products..."
                            placeholderTextColor={'grey'}
                        />
                    </View>
                    <Pressable onPress={handleSearch} style={styles.searchButton}>
                        <FontAwesome name="search" size={19} color="#ffffff" style={{ margin: 10 }} />
                    </Pressable>
                </View>


                <FlatList
                    data={category}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    style={{ marginTop: 20, width: '100%', flexGrow: 0 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <Pressable
                                style={[styles.categoryContainer, { backgroundColor: selectedCategory === item.name ? '#2698bdff' : '#eff6f9ff' },]}
                                onPress={() => handleCategoryPress(item.name)}>
                                <Text style={{ fontWeight: 'semibold', color: selectedCategory === item.name ? '#ffffff' : '#000000' }} numberOfLines={1}>{item.name}</Text>
                            </Pressable>
                        )
                    }}
                />

                {
                    loading
                        ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#58a6caff" />
                        </View>
                        :
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id.toString()}
                            style={{width: '100%', marginTop: 20, flex: 1 }}
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>No products available !</Text>
                                </View>
                            }
                            numColumns={2}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable onPress={() => navigation.navigate('Details', { product: item })} style={styles.productCard}>
                                        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
                                        <View style={{
                                            alignItems: 'flex-start',
                                        }}
                                        >
                                            <Text style={{ textAlign: 'left', fontWeight: 'bold', color: '#edb149ff' }} numberOfLines={1}>{item.title}</Text>
                                            <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 10 }}>₹ {item.price}</Text>
                                        </View>
                                    </Pressable>
                                )
                            }}
                        />
                }
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#dbebecff'
    },
    categoryContainer: {
        margin: 10,
        height: height * 6 / 100,
        width: width * 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 25
    },
    searchInput: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: 'grey',
        paddingHorizontal: width * 0.05,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    productImage: {
        width: width * 0.3,
        height: 100,
        resizeMode: 'contain',
    },
    productCard: {
        flex: 1,
        maxWidth: (width / 2) - 30,
        padding: 10,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButton: {
        backgroundColor: '#2698bdff',
        borderRadius: 8,
        marginLeft: 10,
        paddingHorizontal: width * 0.01
    }
})