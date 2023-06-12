
import { Stack , Button } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type cartItemsProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string,
  quantity: number,
}

const CartItem = (item:cartItemsProps) => {

  const { removeFromCart } = useShoppingCart()
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        alt={item.name}
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {item.quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{item.quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * item.quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  )
}
export default CartItem