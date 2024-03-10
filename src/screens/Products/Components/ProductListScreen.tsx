import React, { useState, useEffect } from 'react';
import { Pressable, Box, VStack, HStack, Heading, Image, Button, ButtonText, Text, Spinner, ScrollView } from '@gluestack-ui/themed';
import { Product } from '../../../Types/productList';
import { useNavigation } from '@react-navigation/native';

const ProductListScreen = () => {
  const [productList, setProductList] = useState<Product | any>();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProductList(data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductPress = async (productId:number) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const productDetails = await response.json();
      navigation.navigate('ProductDetails', { product: productDetails });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ScrollView>
    <VStack>
      {productList.map((product:Product) => (
        <Pressable key={product.id} onPress={() => handleProductPress(product.id)}>
          <Box mb={'$2'} w={'$96'} rounded={'$lg'} hardShadow='1' bg="$white">
            <HStack space="2xl">
              <Box alignSelf="center" p={'$2'}>
                <Image w={'$32'} rounded={'$lg'} source={{ uri: product.thumbnail }} alt="Product thumbnail" resizeMode="cover" />
              </Box>
              <VStack mb={'$2'} mt={'$2'} w={'$56'} space="sm">
                <Heading numberOfLines={1} size="md">{product.title}</Heading>
                <HStack>
                  <Heading size="sm">₹ {product.price}</Heading>
                </HStack>
                <Button
                  onPress={() => handleProductPress(product.id)}
                  w={'$24'}
                  rounded={'$full'}
                  size="sm"
                  variant="outline"
                >
                  <ButtonText>VIEW</ButtonText>
                </Button>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      ))}
    </VStack>
    </ScrollView>
  );
};

export default ProductListScreen;
