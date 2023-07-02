import { Box, Card, Flex, Text } from "@chakra-ui/react";
import React from "react";

type CartItemProps = {
  title: string;
  price: number;
  quantity: number;
};

const CartItem = ({ title, price, quantity }: CartItemProps) => {
  return (
    <Card mt={5} p={3}>
      {quantity > 1 && (
        <Box
          bg={"teal"}
          maxW={"fit-content"}
          maxH={"fit-content"}
          paddingRight={2}
          paddingLeft={2}
          borderRadius={"full"}
          color={"white"}
          position={"absolute"}
          right={0}
          top={-3}
        >
          {quantity}
        </Box>
      )}

      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Box as="div">{title}</Box>
        <Text ml={4} whiteSpace={"nowrap"}>
          $ {price * quantity}
        </Text>
      </Flex>
    </Card>
  );
};

export default CartItem;
