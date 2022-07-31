import { FormEvent, useState } from "react";
import Router from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown, Form } from "react-bootstrap";


export default function Create() {
  const Crypto= ["BTC","ETH","USDT","XRP","DOGE","LTC","SHIB","POLY","LUNA","SOL","PLK","CRD"]
  const [post, setPost] = useState({
    portfolioname: "",
    fallowance: "",
    totalvalue: "",
    symbol:Crypto[Math.floor(Crypto.length * Math.random())],
    marketWeight: "",
    currentAmount: "",
  });

  const updatePost = (e: any) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const [sent, setSent] = useState(false);

  async function sendPost(data: any) {
    const saved = await fetch(window.location.origin + "/api/create/create", {
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
        Router.push("/create");
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
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
            type="text"
            value={post.portfolioname}
            name="portfolioname"
            onChange={updatePost}
            placeholder="Portfolio Name"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.totalvalue}
            name="totalvalue"
            onChange={updatePost}
            placeholder="Total value"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.symbol}
            name="symbol"
            onChange={updatePost}
            placeholder="Select Coin"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.fallowance}
            name="fallowance"
            onChange={updatePost}
            placeholder="Fluctuation Allowance"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.marketWeight}
            name="marketWeight"
            onChange={updatePost}
            placeholder="Mark Weight"
          />
        </div>
        <br />
        <div className="w-full">
          <Form.Control
            value={post.currentAmount}
            name="currentAmount"
            onChange={updatePost}
            placeholder="Current Amount"
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
