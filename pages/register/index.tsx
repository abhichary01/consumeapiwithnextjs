import { FormEvent, useState } from "react";
import Router from "next/router";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Register() {
  const [user, setPost] = useState({
    name: "",
    email: "",
    password:""
  });

  const updatePost = (e:any) => {
    setPost({ ...user, [e.target.name]: e.target.value });
  };

  const [sent, setSent] = useState(false);

  async function sendPost(data:any) {
    const saved = await fetch(window.location.origin + "/api/register/register", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        date: new Date(),
      }),
    });
  }

  function handlePostDelivery(e: FormEvent) {
    e.preventDefault();
    sendPost(user)
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
      <b>Add post</b>
      <Form>
   <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control type="email" className="form-control" placeholder="Enter email"  />
     <Form.Text className="text-muted">
       We'll never share your email with anyone else.
     </Form.Text>
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Name</Form.Label>
     <Form.Control type="name" className="form-control" placeholder="name" />
   </Form.Group>
   <Form.Group className="mb-3" controlId="formBasicCheckbox">
     <Form.Check type="checkbox" label="Check me out" />
   </Form.Group>
   <Button variant="primary" size="lg" className="btn btn-dark btn-lg btn-block text-center" href='/create'>
     Submit
   </Button>
 </Form>
    </div>
  );
}
