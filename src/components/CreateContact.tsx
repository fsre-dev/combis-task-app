import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import { createContact } from "../service/BackendServices";



const CreateContactRoot = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const CustomForm = styled(Form)`
  width: 100%;
`

interface Contact {
  firstName: string,
  lastName: string,
  email: string,
  mobile?: string,
  address?: string
}
const CreateContact: React.FunctionComponent = (props) => {

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [mobile, setMobile] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [message,setMessage] = useState<string>("")

  function resetForm() {
    setFirstName("")
    setLastName("")
    setEmail("")
    setMobile("")
    setAddress("")
  }

  function handleSubmit(event: any) {
    
    event.preventDefault()
    
    let contact: Contact = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      address: address
    };
    
    createContact(contact).then(data => {
      resetForm()

      if(data.status >= 400) {
        setMessage(data.content.message) 
      } else if (data.status >= 200 && data.status <= 300) {
        setMessage("Contact succesfully created")
      }
        
      setTimeout(() => {
          setMessage("")
        }, 5000);
    })
  }

  return <CreateContactRoot>
    <CustomForm onSubmit={handleSubmit}>
    <Row className="mb-3">
    <Form.Group as={Col}>
      <Form.Label>First Name</Form.Label>
      <Form.Control value={firstName} placeholder="Enter email" required onChange={(e) => setFirstName(e.currentTarget.value)}/>
    </Form.Group>

    <Form.Group as={Col}>
      <Form.Label>Last Name</Form.Label>
      <Form.Control value={lastName} placeholder="Password" required onChange={(e) => setLastName(e.currentTarget.value)}/>
    </Form.Group>
  </Row>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control  value={email} type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.currentTarget.value)}/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridMobile">
    <Form.Label>Mobile</Form.Label>
    <Form.Control  value={mobile} placeholder="Enter mobile " onChange={(e) => setMobile(e.currentTarget.value)}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress">
    <Form.Label>Address</Form.Label>
    <Form.Control  value={address} placeholder="Enter address" onChange={(e) => setAddress(e.currentTarget.value)}/>
  </Form.Group>
  

  <Button variant="primary" type="submit">
    Create
  </Button>
  <div>{message}</div>
</CustomForm>
  </CreateContactRoot>
}

export default CreateContact