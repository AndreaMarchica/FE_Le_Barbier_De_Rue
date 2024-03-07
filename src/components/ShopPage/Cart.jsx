import { Badge } from "@nextui-org/react";
import { CartIcon } from "./CartIcon";
import { getCartProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Cart = ({ onCartClick }) => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const dispatch = useDispatch();

  const handleCartClick = () => {
    onCartClick();
    dispatch(getCartProducts(meDataFromReduxStore.id));
  };

  return (
    <div
      onClick={handleCartClick}
      className="flex items-center gap-3 transition-transform transform hover:scale-105"
    >
      <Badge color="danger" content={0} shape="circle">
        <CartIcon size={30} />
      </Badge>
    </div>
  );
};
export default Cart;
