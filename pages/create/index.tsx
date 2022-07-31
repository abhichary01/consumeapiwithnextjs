import Link from "next/link";
import { IPost } from "../../src/models/posts";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";

export default function Usuarios() {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const asyncGetPosts = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/create");
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
      <Table striped>
      <thead>
        <tr>
          <th>Sl</th>
          <th>Portfolio Name</th>
          <th>Fluctuation Allowance</th>
          <th>Total Value</th>
          <th>Crypto Token</th>
          <th>Mark Weight</th>
          <th>Current Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{i+1}</td>
          <td>{post.portfolioname}</td>
          <td>{post.fallowance}</td>
          <td>{post.totalvalue}</td>
          <td>{post.symbol}</td>
          <td>{post.marketWeight}</td>
          <td>{post.currentAmount}</td>
          
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
      <div className="flex space-x-4">
        <Link href="/">
          <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
            Back
          </div>
        </Link>
        <Link href="create/create">
          <div className="bg-blue-400 inline-block px-2 py-1 text-white cursor-pointer">
            Add one
          </div>
        </Link>
      </div>
      <div className="d-grid gap-2">
      <Button variant="success" size="lg">
      <Link href="/create/create">
          <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
          Add Crypto to portfolio
          </div>
        </Link>
  
      </Button>
      <Button variant="secondary" size="lg">
      <Link href="/">
          <div className="bg-red-400 inline-block px-2 py-1 text-white cursor-pointer">
            Back
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
