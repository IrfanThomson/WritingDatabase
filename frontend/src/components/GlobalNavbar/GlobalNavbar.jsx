import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


function BoldText({ children }) {
  return (
    <span style={{  fontSize: '15px', color: '#f4f1de', font: 'Courier-Oblique', fontWeight: 400  }}>{children}</span>
  );
}

const GlobalNavbar = () => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    console.log(`search query: ${form.query.value}`)
    window.location.assign(`/search/${form.query.value}`)
  }

  return (
    <Navbar variant="dark" expand="lg"
    style= {{backgroundColor: '#000000'}}>
      <Container>
        <Navbar.Brand href="/">
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link href="/"><BoldText>Home</BoldText></Nav.Link>
            <Nav.Link href="/about"><BoldText>About</BoldText></Nav.Link>
            <Nav.Link href="/jobs"><BoldText>Stories</BoldText></Nav.Link>
            <Nav.Link href="/cities"><BoldText>Ideas</BoldText></Nav.Link>
            <Nav.Link href="/apartments"><BoldText>Notes</BoldText></Nav.Link>
            <Nav.Link href="/visualizations"><BoldText>References</BoldText></Nav.Link>
          </Nav>
          <Container className="d-flex justify-content-end">
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                style={{ width: "20vw" }}
                type="search"
                name="query"
                placeholder="Search for files across the archive"
                className="me-2"
                aria-label="Search"
              />
              <Button type="submit" variant="outline-secondary" style={{color: '#3d405b'}}>Search</Button>
            </Form>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GlobalNavbar;
