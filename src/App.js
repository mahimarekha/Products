import React from "react";
import "./App.css";
import Product from "./Components/Product/Product";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Container, Row, Col } from "reactstrap";
class App extends React.Component {
  state = {
    productList: [
      {
        id: 123,
        productName: "French Fries",
        imageURL: "https://i.ytimg.com/vi/hsteljy6H54/maxresdefault.jpg",
        price: 150,
        finalPrice: 150,
        type: "INR",
      },
      {
        id: 456,
        productName: "Frankie",
        imageURL:
          "https://i.pinimg.com/originals/19/f2/59/19f259d8cbbe6577c67404f8a8043802.jpg",
        price: 240,
        finalPrice: 240,
        type: "INR",
      },
      {
        id: 789,
        productName: "Chicken Popcorn",
        imageURL:
          "https://howtothisandthat.com/wp-content/uploads/2016/11/honey-mustard-popcorn-chicken-10-735x529.jpg",
        price: 330,
        finalPrice: 330,
        type: "INR",
      },
    ],
    dropdownOpen: false,
    rates: null,
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=INR")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            rates: result.rates,
          });
        },

        (error) => {
          console.log(error);
        }
      );
  }
  onSelect(rateType) {
    const getRates = this.state.rates[rateType];
    const finalResult = this.state.productList.map((product) => {
      return {
        id: product.id,
        productName: product.productName,
        imageURL: product.imageURL,
        price: product.price,
        finalPrice: (product.price * getRates).toFixed(2),
        type: rateType,
      };
    });
    this.setState({ productList: finalResult });
  }

  render() {
    return (
      <div className="product">
        <div className="btn-left">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.onSelect("INR")}>
                INR
              </DropdownItem>
              <DropdownItem onClick={() => this.onSelect("USD")}>
                USD
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Container>
          <Row xs="4">
            {this.state.productList.map((items) => (
              <Col>
                <Product items={items} key={items.id}></Product>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
