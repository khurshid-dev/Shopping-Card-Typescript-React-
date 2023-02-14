import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCard } from "../context/ShoppingCardContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemsProps = {
  id: number;
  price: number;
  name: string;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemsProps) {
  const { getItemQuantity, increaseQuantity, decreaseQuantity, removeQuantity } = useShoppingCard();

  const quantity = getItemQuantity(id);

  return (
    <Card style={{ cursor: "pointer" }}>
      <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />

      <Card.Body className="d-flex flex-column pt-2">
        <Card.Title className="d-flex justify-content-between align-items-center mb-2">
          <span style={{ fontSize: "20px" }}>{name}</span>
          <span style={{ fontSize: "16px" }} className="text-muted">
            {formatCurrency(price)}
          </span>
        </Card.Title>

        {quantity === 0 ? (
          <div className="d-flex justify-content-center align-item-center">
            <Button style={{ marginTop: "10px", width: "70%" }} onClick={() => increaseQuantity(id)}>
              + Add to Card
            </Button>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Button className="btn-danger" onClick={() => decreaseQuantity(id)}>
                -
              </Button>
              <div className="fs-5">
                <span className="fs-3">{quantity}</span>
              </div>
              <Button className="btn-success" onClick={() => increaseQuantity(id)}>
                +
              </Button>
            </div>
            <Button
              variant="outline-danger"
              className="mt-3 fw-semibold"
              onClick={() => removeQuantity(id)}
              style={{ padding: "5px 20px" }}
            >
              Remove
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
