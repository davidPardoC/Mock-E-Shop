import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { Product } from "@/types/product.types";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const ProductCard = ({
  product,
  isCheckout = false,
  onAddCheckout = () => {},
}: {
  product: Product;
  isCheckout?: boolean;
  onAddCheckout?: (product: Product) => void;
}) => {
  const {
    title,
    image,
    rating: { rate },
    price,
  } = product;

  const { addItemsToCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();

  const onAddToCart = (product: Product) => {
    if (isCheckout) {
      onAddCheckout(product);
      return
    }
    if (!user) {
      router.push("/login");
      return;
    }
    addItemsToCart(product);
  };

  return (
    <Card>
      <Box style={{ position: "relative", height: "100px" }}>
        <Image
          alt={title}
          src={image}
          fill
          sizes="(min-width: 808px) 50vw, 100vw"
          style={{
            objectFit: "contain",
          }}
        />
      </Box>
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Box>
          <Text>{title}</Text>
          <Text>{rate}</Text>
        </Box>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <div>$ {price}</div>
          <Button
            borderRadius={"full"}
            p={0}
            colorScheme="teal"
            onClick={() => {
              onAddToCart(product);
            }}
          >
            <AddIcon />
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
