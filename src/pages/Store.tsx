import React from "react";
import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem";

const Store = () => {
  return (
    <Row xs={1} md={2} lg={3} style={{ rowGap: "20px" }}>
      {storeItems.map((item) => (
        <Col key={item.id} gap={3}>
          <StoreItem {...item} />
        </Col>
      ))}
    </Row>
  );
};

export default Store;
