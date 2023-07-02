import AddProductsModal from "@/components/AddProductsModal";
import RatingModal from "@/components/RatingModal";
import { OrdersService } from "@/services/orders.services";
import { ProductServices } from "@/services/products.services";
import { useGlobalStore } from "@/stores/globalStore";
import { Product } from "@/types/product.types";
import { createServerSideAxiosInstance } from "@/utils/axios.server.utils";
import { formatCurrecy } from "@/utils/common.utils";
import {
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

type OrderPageProps = {
  order: Order;
  products: Product[];
  originalOrder: Order;
};

export type Order = {
  _id: string;
  creationDate: string;
  currency: string;
  active: boolean;
  items: {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
  }[];
  rating?: number;
};

const OrderPage = ({ order, products, originalOrder }: OrderPageProps) => {
  const [myOrder, setMyOrder] = useState<Order>(order);
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const router = useRouter();
  const { showError } = useGlobalStore();

  const onPayClick = async () => {
    try {
      await OrdersService.payOrder(axios, order._id);
      setOpenRatingModal(true);
    } catch (error: any) {
      showError(error.message);
    }
  };

  const onAddCheckout = (product: Product) => {
    const { id, title, price } = product;
    const { items } = myOrder;
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item.productId === id);
    if (itemIndex === -1) {
      newItems.push({
        productId: id,
        productName: title,
        price,
        quantity: 1,
      });
    } else {
      newItems[itemIndex].quantity++;
    }
    setMyOrder({
      ...myOrder,
      items: newItems,
    });
  };

  const onRemoveCheckout = (productId: number) => {
    const { items } = myOrder;
    const newItems = [...items];
    const itemIndex = items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return;
    }
    if (newItems[itemIndex].quantity === 1) {
      newItems.splice(itemIndex, 1);
    } else {
      newItems[itemIndex].quantity--;
    }
    setMyOrder({
      ...myOrder,
      items: newItems,
    });
  };

  const onChangeCurrency = (currency: string) => {
    const newOrder = { ...myOrder, currency };
    setMyOrder(newOrder);
  };

  const saveOrder = async () => {
    if (myOrder.items.length === 0) {
      showError("You need to add at least one product");
      return;
    }
    try {
      await OrdersService.updateOrder(axios, myOrder._id, myOrder);
      setIsEditing(false);
    } catch (error) {
      showError((error as any).message);
    }
  };

  return (
    <>
      {openModal && (
        <AddProductsModal
          onClose={() => {
            setOpenModal(false);
          }}
          products={products}
          onAddCheckout={onAddCheckout}
        />
      )}
      {openRatingModal && (
        <RatingModal onClose={() => router.push("/")} orderId={order._id} />
      )}
      <Container maxW="1000px" pt={10}>
        <Card>
          <CardBody>
            <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
              <Text>Order ID: {myOrder._id} </Text>
              <Text>{new Date(myOrder.creationDate).toLocaleString()}</Text>
              {isEditing && (
                <Select
                  onChange={(e) => onChangeCurrency(e.target.value)}
                  placeholder="Currency"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="HNL">HNL</option>
                </Select>
              )}
            </Flex>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Product</Th>
                    <Th>Price</Th>
                    <Th>Interest</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {myOrder.items.map(
                    ({ productId, productName, price, quantity }) => (
                      <Tr key={productId}>
                        <Td>
                          <Flex alignItems={"center"}>
                            {isEditing && (
                              <Button
                                colorScheme="red"
                                mr={3}
                                onClick={() => onRemoveCheckout(productId)}
                              >
                                Delete
                              </Button>
                            )}
                            {productName}{" "}
                            {quantity > 1 && (
                              <Text ml={2} fontWeight={"bold"}>
                                x{quantity}
                              </Text>
                            )}
                          </Flex>
                        </Td>
                        <Td>
                          {formatCurrecy(myOrder.currency, price * quantity)}
                        </Td>
                        <Td>
                          {formatCurrecy(
                            myOrder.currency,
                            price * quantity * 0.15
                          )}
                        </Td>
                        <Td>
                          {formatCurrecy(
                            myOrder.currency,
                            price * quantity + price * quantity * 0.15
                          )}
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
            {myOrder.active && (
              <Flex gap={2} p={2} justifyContent={"flex-end"}>
                {isEditing && (
                  <Button onClick={() => setOpenModal(true)}>
                    Add product
                  </Button>
                )}
                <Button
                  colorScheme="pink"
                  onClick={() => {
                    setIsEditing(false);
                    setMyOrder(originalOrder);
                  }}
                >
                  {isEditing ? "Back" : "Cancel"}
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    if (isEditing) {
                      saveOrder();
                    } else {
                      setIsEditing(!isEditing);
                    }
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </Button>
                <Button colorScheme="teal" onClick={onPayClick}>
                  Pay
                </Button>
              </Flex>
            )}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default OrderPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const orderId = context.params?.id;
  const axiosInstance = createServerSideAxiosInstance(context);
  if (!orderId) {
    return { notFound: true };
  }
  const order = await OrdersService.getOrderById(
    axiosInstance,
    orderId as string
  );
  const products = await ProductServices.getProducts(axiosInstance);
  return { props: { order, products, originalOrder: order } };
};
