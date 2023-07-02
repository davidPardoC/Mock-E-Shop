import { Order } from "@/pages/orders/[id]";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Card, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

type OrdersProps = {
  orders: Order[];
};

const Orders = ({ orders = [] }: OrdersProps) => {
  const router = useRouter();


  const onGoToOrder = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div>
      {orders.map(({ _id, rating, active }, idx) => (
        <Card
          _hover={{ cursor: "pointer" }}
          onClick={() => onGoToOrder(_id)}
          key={idx}
          mt={3}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"} p={2}>
            <Box>
              <Box>Order #{idx + 1} </Box>
              <Box>Rating: {rating}</Box>
              <Box
                bg={active ? "green" : "red"}
                color={"white"}
                textAlign={"center"}
                borderRadius={"2xl"}
                px={1}
              >
                {active ? "Active" : "Completed"}
              </Box>
            </Box>
            <ArrowForwardIcon />
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
