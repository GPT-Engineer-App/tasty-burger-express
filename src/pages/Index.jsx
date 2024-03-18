import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

const burgers = [
  { id: 1, name: "Classic Cheeseburger", price: 8.99, image: "https://images.unsplash.com/photo-1591336277697-cdae7e42dead?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwY2hlZXNlYnVyZ2VyfGVufDB8fHx8MTcxMDc2MTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, name: "BBQ Bacon Burger", price: 10.99, image: "https://images.unsplash.com/photo-1591336277932-f0579b75992b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxiYnElMjBiYWNvbiUyMGJ1cmdlcnxlbnwwfHx8fDE3MTA3NjEyNDd8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, name: "Mushroom Swiss Burger", price: 9.99, image: "https://images.unsplash.com/photo-1579065413090-3ce766e7deca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtdXNocm9vbSUyMHN3aXNzJTIwYnVyZ2VyfGVufDB8fHx8MTcxMDc2MTI0N3ww&ixlib=rb-4.0.3&q=80&w=1080" },
  // Add the remaining 27 burger objects here
];

const Index = () => {
  const [cart, setCart] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addToCart = (burger) => {
    setCart([...cart, burger]);
  };

  const removeFromCart = (burger) => {
    const updatedCart = cart.filter((item) => item.id !== burger.id);
    setCart(updatedCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" my={8}>
        Delicious Burger Delivery
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} mx={8}>
        {burgers.map((burger) => (
          <Box key={burger.id} borderWidth={1} borderRadius="lg" p={4}>
            <Image src={burger.image} alt={burger.name} borderRadius="lg" />
            <Heading as="h2" size="lg" mt={4}>
              {burger.name}
            </Heading>
            <Text fontSize="xl" fontWeight="bold" mt={2}>
              ${burger.price}
            </Text>
            <Button colorScheme="blue" size="lg" mt={4} onClick={() => addToCart(burger)}>
              Add to Cart
            </Button>
          </Box>
        ))}
      </Grid>
      <Box position="fixed" bottom={4} right={4}>
        <IconButton icon={<FaShoppingCart />} colorScheme="blue" size="lg" rounded="full" onClick={onOpen} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {cart.length === 0 ? (
              <Text>Your cart is empty.</Text>
            ) : (
              <VStack align="stretch" spacing={4}>
                {cart.map((item) => (
                  <HStack key={item.id} justify="space-between">
                    <Text>{item.name}</Text>
                    <Text fontWeight="bold">${item.price}</Text>
                    <IconButton icon={<FaMinus />} size="sm" onClick={() => removeFromCart(item)} />
                  </HStack>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Text fontSize="xl" fontWeight="bold" mr={4}>
              Total: ${getTotalPrice()}
            </Text>
            <Button colorScheme="blue" size="lg">
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
