import React from "react";
import { Card, CardImg, CardBody, Col } from "reactstrap";
function Products(props) {
  const products = props.items;
  return (
    <Col>
      <Card>
        <CardImg
          top
          width="30px"
          height="100px"
          src={products.imageURL}
          alt="Card image cap"
        />
        <CardBody>
          <div>
            <h5>{products.productName}</h5>
            <h5>
              {" "}
              {products.finalPrice} {products.type}
            </h5>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default Products;
