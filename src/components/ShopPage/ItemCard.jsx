import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";

const ItemCard = ({ products, productId }) => {
  const dispatch = useDispatch();
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const userId = meDataFromReduxStore.id;
  const quantity = 1;
  const handleAddToCart = () => {
    dispatch(addToCart(userId, productId, quantity));
    console.log(userId);
    console.log(productId);
    console.log(quantity);
  };

  return (
    <Card className="py-4 myfont h-full flex flex-col transition-transform transform hover:scale-105">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{products.name}</h4>
        <p className="text-tiny uppercase font-bold">{products.description}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-grow">
        <img
          alt="Card background"
          className="object-cover rounded-xl h-full w-full"
          src={products.imageUrl}
        />
      </CardBody>
      <div className="text-center mt-2">
        <Button
          className="mx-3 w-75"
          color="success"
          variant="ghost"
          radius="full"
          onClick={handleAddToCart}
        >
          Aggiungi al carrello
        </Button>
      </div>
    </Card>
  );
};

export default ItemCard;
