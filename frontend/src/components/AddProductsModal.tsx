import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import Products from "./Products";
import { Product } from "@/types/product.types";

const AddProductsModal = ({
  onClose,
  products = [],
  onAddCheckout,
}: {
  onClose: () => void;
  products?: Product[];
  onAddCheckout: (product: Product) => void;
}) => {
  return (
    <Modal isOpen onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={10}>
          <Products
            products={products}
            isCheckout
            onAddCheckout={onAddCheckout}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="teal">Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductsModal;
