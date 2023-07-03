import { useCartStore } from "@/stores/cartStore";
import {
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import CartItem from "./CartItem";
import { useUserStore } from "@/stores/userStore";
import { OrdersService } from "@/services/orders.services";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

const Header = () => {
  const { cartItems, clearCart } = useCartStore();
  const { user } = useUserStore();
  const [openCart, setOpenCart] = useState(false);
  const router = useRouter();
  const onOpenCart = () => {
    setOpenCart(true);
  };

  const onCheckout = async () => {
    await OrdersService.createOrder(cartItems);
    clearCart();
    setOpenCart(false);
    router.push("/?tab=1");
  };

  const onLogOut = () => {
    deleteCookie("token");
    deleteCookie("refreshToken");
    window.location.reload();
  }

  return (
    <>
      <Box bg={"teal"} color={"white"} p={3}>
        <nav>
          <Flex
            as={"ul"}
            listStyleType={"none"}
            gap={3}
            justifyContent={"space-between"}
          >
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <Flex gap={4}>
              <li>
                {user ? (
                  <Text onClick={onLogOut}>Log Out</Text>
                ) : (
                  <Link href={"/login"}>{"Login"}</Link>
                )}
              </li>
              <Box
                display={"flex"}
                alignItems={"center"}
                as="li"
                _hover={{ cursor: "pointer" }}
                onClick={onOpenCart}
              >
                Cart
                {cartItems.length > 0 && (
                  <Box
                    bg={"white"}
                    maxW={"fit-content"}
                    maxH={"fit-content"}
                    ml={1}
                    px={2}
                    py={0}
                    borderRadius={"full"}
                    color={"teal"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {cartItems.length}
                  </Box>
                )}
              </Box>
            </Flex>
          </Flex>
        </nav>
      </Box>
      <Drawer
        isOpen={openCart}
        onClose={() => {
          setOpenCart(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody mt={10}>
            {cartItems.map(({ id, price, title, quantity = 0 }) => (
              <CartItem
                price={price}
                title={title}
                quantity={quantity}
                key={id}
              />
            ))}
            {cartItems.length > 0 && (
              <Flex mt={3} justifyContent={"space-between"}>
                <Button onClick={clearCart}>Empty Cart</Button>
                <Button colorScheme="teal" onClick={onCheckout}>
                  Checkout
                </Button>
              </Flex>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
