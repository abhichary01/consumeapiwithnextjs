import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { ITrade } from "../../src/models/trade";

export default function Usuarios() {
  const [posts, setPosts] = useState<ITrade[]>([]);
  useEffect(() => {
    const asyncGetPosts = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/trade");
      const posts = await data.json();
      return posts;
    };
    if (window) {
      asyncGetPosts()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const mappedPosts = posts.reverse().map((post, i) => (
    <div
      style={{
        transition: "0.12s",
      }}
      className="break-words p-4 rounded-md text-sm w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/6 border-2 hover:bg-gray-100 m-1 cursor-pointer"
      key={Math.random()}
    >
      {/* <Container>
        <Row>
          <Col>{post.symbol}</Col>
          <Col>{post.initialPrice}</Col>
          <Col>{post.amountSellable}</Col>
          <Col>{post.priceToSell}</Col>
          <Col>{post.priceToBuy}</Col>
        </Row>
      </Container> */}
      <Table striped>
      <thead>
        <tr>
          <th>Sl</th>
          <th>Crypto Token</th>
          <th>Initial price</th>
          <th>Amount Sellable</th>
          <th>Price to Sell</th>
          <th>Price to Buy</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{i+1}</td>
          <td>{post.symbol}</td>
          <td>{post.initialPrice}</td>
          <td>{post.amountSellable}</td>
          <td>{post.priceToSell}</td>
          <td>{post.priceToBuy}</td>
        </tr>
      </tbody>
    </Table>
    </div>
  ));

  return (
    // <Navbar></Navbar>
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
      <b>Total posts: {posts.length}</b>
      <div className="d-grid gap-2">
        <Button variant="success" size="lg">
          <Link href="/trade/trade">
            <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
              Start Trading
            </div>
          </Link>
        </Button>
        <Button variant="secondary" size="lg">
          <Link href="/">
            <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
              Go Back
            </div>
          </Link>
        </Button>
      </div>
      <div className="py-4 flex flex-wrap overflow-y-scroll h-96 md:h-72 my-4 border-4 rounded-md">
        {mappedPosts}
      </div>
    </div>
  );
}
