import React, { useState } from 'react';
import { Box, HStack, Heading, Image, Pressable, Text, VStack } from "@gluestack-ui/themed";

const ProductDetailsScreen = ({ route }: { route: any }) => {
    const { product } = route.params;
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number, img: string) => {
        setSelectedImageIndex(index);
    };

    return (
        <Box>
            <Box>
                <Image w={'$full'} h={'$48'} source={{ uri: product.images[selectedImageIndex] }} alt='Main image' />
                <HStack ml={'$2'} alignSelf='center' space='md'>
                    {product.images.map((img: string, index: number) => (
                        <Pressable key={index} onPress={() => handleImageClick(index, img)}>
                        <Box mt={'$2'} hardShadow='1' key={index}  style={{ borderWidth: selectedImageIndex === index ? 2 : 0, borderColor: selectedImageIndex === index ? 'blue' : 'transparent' }}>
                            <Image rounded={'$lg'} w={'$16'} h={'$16'} resizeMode='cover' source={{ uri: img }} alt='images'/>
                        </Box>
                        </Pressable>
                    ))}
                </HStack>
            </Box>
            <Box p={'$5'}>
                <HStack justifyContent='space-between'>
                    <HStack space='sm'>
                    <Heading size='2xl'>₹ {product.price}</Heading>
                    <Box w={'$20'} h={'$9'} justifyContent='center' rounded={'$full'} bg='$pink400'>
                        <Text size='sm' alignSelf='center' color='$white'>{`${product.discountPercentage}% off`}</Text>
                    </Box>
                    </HStack>
                    <Text color='$textLight700' alignSelf='center'>{`${product.stock} pieces left`}</Text>
                </HStack>
            </Box>
            <VStack p={'$5'}>
                <VStack>
                <Heading size='xl'>{product.title}</Heading>
                <Text size='sm'>{`(${product.brand})`}</Text>
                </VStack>
                <Text mt={'$5'} color='$textLight700'>{product.description}</Text>
            </VStack>
            <Box p={'$5'}>
                <Text color='$textLight700'>{` Rating: ${product.rating}`}</Text>
            </Box>
        </Box>
    );
};

export default ProductDetailsScreen;
