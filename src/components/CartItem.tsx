import { Button, Stack } from "react-bootstrap";
import { useShoppingCard } from "../context/ShoppingCardContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeQuantity } = useShoppingCard();

  const item = storeItems.find((i) => i.id === id);
  if (item === null) return null;

  return (
    <Stack direction="horizontal" gap={2} style={{ cursor: "pointer" }}>
      <img src={item.imgUrl} alt="image" style={{ width: "125px", height: "75px", objectFit: "cover" }} />

      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div style={{ fontSize: "1rem", fontWeight: "bold" }}>{formatCurrency(item.price * quantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeQuantity(item.id)}>
        &times;
      </Button>
    </Stack>
  );
}
