/* eslint-disable react-hooks/exhaustive-deps */
import Orders from "@/components/Orders";
import OrdersFilters from "@/components/OrdersFilters";
import Products from "@/components/Products";
import { OrdersService } from "@/services/orders.services";
import { ProductServices } from "@/services/products.services";
import { useCartStore } from "@/stores/cartStore";
import { useUserStore } from "@/stores/userStore";
import { Product } from "@/types/product.types";
import { createServerSideAxiosInstance } from "@/utils/axios.server.utils";
import { getCartFromLocalStorage } from "@/utils/common.utils";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Order } from "./orders/[id]";

type HomeProps = {
  products: Product[];
  orders: any[];
};

export default function Home({ products, orders }: HomeProps) {
  const [myOrders, setMyOrders] = useState<Order[]>(orders || []);
  const { setCartItems } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();

  const getInitialCartItems = () => {
    const cartItems = getCartFromLocalStorage();
    setCartItems(cartItems);
  };

  const onMyOrdersClick = () => {
    router.replace({ query: { tab: "1" } }, undefined, { shallow: true });
  };

  const onProductsClick = () => {
    router.replace({ query: { tab: "0" } }, undefined, { shallow: true });
  };
  
  const onSortOrder = (orders: Order[]) => {
    setMyOrders(orders);
  }

  useEffect(() => {
    getInitialCartItems();
  }, []);

  return (
    <>
      <Tabs defaultIndex={Number(router.query.tab) || 0} colorScheme="teal">
        <TabList>
          <Tab onClick={onProductsClick}>All Products</Tab>
          {user && <Tab onClick={onMyOrdersClick}>My Orders</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Products products={products} />
          </TabPanel>
          <TabPanel>
            <OrdersFilters orders={orders} onSortOrder={onSortOrder} />
            <Orders orders={myOrders} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const axiosInstance = createServerSideAxiosInstance(context);
  const products = await ProductServices.getProducts(axiosInstance);
  let orders = [];
  try {
    orders = await OrdersService.getOrders(axiosInstance);
  } catch (error) {
    console.log(error);
  }
  return { props: { products, orders } };
};
