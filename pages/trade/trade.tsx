import { FormEvent, useState } from "react";
import Router from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown, Form } from "react-bootstrap";


export default function Trade() {
  const Crypto= ["BTC","ETH","USDT","XRP","DOGE","LTC","SHIB","POLY","LUNA","SOL","PLK","CRD"]
  const [post, setPost] = useState({
    initialPrice: "",
    amountSellable: "",
    priceToSell: "",
    symbol:Crypto[Math.floor(Crypto.length * Math.random())],
    priceToBuy: ""
  });

  const updatePost = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const [sent, setSent] = useState(false);

  async function sendPost(data: any) {
    const saved = await fetch(window.location.origin + "/api/trade/trade", {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
  }

  function handlePostDelivery(e: FormEvent) {
    e.preventDefault();
    sendPost(post)
      .then((saved) => {
        Router.push("/trade");
        setSent(typeof saved !== "undefined");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">My Trading</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/create">Portfolio</Nav.Link>
            <Nav.Link href="/trade">Trade Crypto</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <b>Add post</b>
      <form
        onSubmit={handlePostDelivery}
        className="flex flex-wrap w-full md:w-64 items-center justify-center space-y-2"
      >
        <div className="w-full">
          <Form.Control
            value={post.symbol}
            name="coin"
            onChange={updatePost}
            placeholder="Coin"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            type="text"
            value={post.initialPrice}
            name="initialPrice"
            onChange={updatePost}
            placeholder="Initial Price"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.amountSellable}
            name="amountSellable"
            onChange={updatePost}
            placeholder="Amount to sell"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.priceToSell}
            name="priceToSell"
            onChange={updatePost}
            placeholder="Price to sell"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.priceToBuy}
            name="priceToBuy"
            onChange={updatePost}
            placeholder="Price to Buy"
          />
        </div>
        <br />
        <div className="w-full text-center">
          <Button
            variant="primary"
            size="lg"
            className="btn btn-dark btn-lg btn-block text-center"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
