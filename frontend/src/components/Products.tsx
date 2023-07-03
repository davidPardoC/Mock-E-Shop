import { useCartStore } from "@/stores/cartStore";
import { Product } from "@/types/product.types";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  FormControl,
  Input,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { FormEvent, FormEventHandler, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductServices } from "@/services/products.services";
import axios from "axios";
import { set } from "react-hook-form";
import { useGlobalStore } from "@/stores/globalStore";

const Products = ({
  products = [],
  isCheckout = false,
  onAddCheckout = () => {},
}: {
  products: Product[];
  isCheckout?: boolean;
  onAddCheckout?: (product: Product) => void;
}) => {
  const [myProducts, setProducts] = useState<Product[]>(products);
  const [search, setSearch] = useState("");
  const { showError } = useGlobalStore();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filterProductsByName = (name: string) => {
    let newProducts = [...products];
    newProducts = newProducts.filter((product) =>
      product.title.toLowerCase().includes(name.toLowerCase())
    );
    return newProducts;
  };

  const filterProductsByPrice = (price: number) => {
    let newProducts = [...products];
    newProducts = newProducts.filter((product) =>
      product.price.toString().includes(price.toString())
    );
    return newProducts;
  };

  const filterProductsByCategory = (category: string) => {
    let newProducts = [...products];
    newProducts = newProducts.filter((product) =>
      product.category.toLowerCase().includes(category.toLowerCase())
    );
    return newProducts;
  };

  const onSearch = () => {
    if (!search) {
      setProducts(products);
      return;
    }
    const productsByName = filterProductsByName(search);
    if (productsByName.length) {
      setProducts(productsByName);
      return;
    }
    const productsByPrice = filterProductsByPrice(Number(search));
    if (productsByPrice.length) {
      setProducts(productsByPrice);
      return;
    }
    const productsByCategory = filterProductsByCategory(search);
    if (productsByCategory.length) {
      setProducts(productsByCategory);
      return;
    }
    setProducts([]);
  };

  const onSearchSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    onSearch();
  };

  const onSelectedCategory = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const products = await ProductServices.getProducts(
        axios,
        event.target.value
      );
      setProducts(products);
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <>
      <Container>
        <Flex as={"form"} onSubmit={onSearchSubmit} mb={5} gap={2}>
          <FormControl>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search by Name, Price or Category"
            />
          </FormControl>
          <Button onClick={onSearch} colorScheme="teal">
            <Search2Icon />
          </Button>
        </Flex>

        <Flex gap={2} alignItems={"center"} mb={5}>
          <Text>Categories:</Text>
          <Select maxW={"80%"} onChange={onSelectedCategory}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Flex>
      </Container>
      {myProducts.length === 0 && (
        <Text textAlign={"center"}>No products where found</Text>
      )}
      <SimpleGrid gap={6} minChildWidth={["150px", "150px", "200px"]}>
        {myProducts.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            onAddCheckout={onAddCheckout}
            isCheckout={isCheckout}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Products;
