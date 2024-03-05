import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

const ItemCard = ({ products }) => {
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
      <Button className="mx-3" color="success" variant="ghost">
        Aggiungi al carrello
      </Button>
    </Card>
  );
};

export default ItemCard;
