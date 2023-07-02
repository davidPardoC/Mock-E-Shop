import { Order } from "@/pages/orders/[id]";
import { Flex, Select, Text } from "@chakra-ui/react";
import React from "react";

const OrdersFilters = ({
  orders,
  onSortOrder,
}: {
  orders: Order[];
  onSortOrder: (orders: Order[]) => void;
}) => {
  const getSortOrdersByRating = () => {
    return [...orders].sort((a, b) => b.rating || 0 - (a.rating || 0));
  };

  const getSortOrdersByStatus = () => {
    return [...orders].sort((a, b) => (a.active ? -1 : 1));
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "rating") {
      onSortOrder(getSortOrdersByRating());
    } else {
      onSortOrder(getSortOrdersByStatus());
    }
  };

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"}>
      <Text>Sort by:</Text>
      <Select
        maxWidth={"80%"}
        onChange={onSortChange}
        placeholder="Select option"
      >
        <option value="status">Status</option>
        <option value="rating">Rating</option>
      </Select>
    </Flex>
  );
};

export default OrdersFilters;
