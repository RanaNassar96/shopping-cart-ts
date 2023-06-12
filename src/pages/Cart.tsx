import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utilities/formatCurrency';

const Cart = () => {
  const { cartItems , cartTotal } = useShoppingCart()
  return(
    <>
      <h1>cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <CartItem {...item}/>
        </div>
      ))}
      <div className="ms-auto fw-bold fs-5">
        Total{" "}
        {formatCurrency(cartTotal)}
      </div>
    </>
  ) 
}
export default Cart