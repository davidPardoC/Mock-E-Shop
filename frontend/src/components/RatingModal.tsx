import { OrdersService } from "@/services/orders.services";
import { useGlobalStore } from "@/stores/globalStore";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import ReactStars from "react-stars";

const RatingModal = ({
  onClose,
  orderId,
}: {
  onClose: () => void;
  orderId: string;
}) => {
  const { showError } = useGlobalStore();
  const router = useRouter();

  const ratingChanged = async (newRating: number) => {
    try {
      await OrdersService.rateOrder(axios, orderId, newRating);
      router.push("/?tab=1");
    } catch (error: any) {
      showError(error.message);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={10}>
          <Text>Rate the order: {orderId}</Text>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={50}
            color2={"#ffd700"}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RatingModal;
