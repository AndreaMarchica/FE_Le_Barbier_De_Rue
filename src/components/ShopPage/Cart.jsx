import { Badge } from "@nextui-org/react";
import { CartIcon } from "./CartIcon";

const Cart = ({ onCartClick }) => {
  const handleCartClick = () => {
    console.log("Cart clicked!");
    onCartClick();
  };

  return (
    <div
      onClick={handleCartClick}
      className="flex items-center gap-3 transition-transform transform hover:scale-105"
    >
      <Badge color="danger" content={50} shape="circle">
        <CartIcon size={30} />
      </Badge>
    </div>
  );
};
export default Cart;
