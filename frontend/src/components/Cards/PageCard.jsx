import React from "react";
import Button from "react-bootstrap/Button";

import Card from "react-bootstrap/Card";

const PageCard = (props) => {
  const {
    pageName,
    pageImage,
    pageDescription,
    pageLink
  } = props.pageInfo;
  return (
    <Card
      style= {{marginRight:30, backgroundColor: '#3d405b'}} >
      <Card.Img variant="top" src={pageImage} />
      <Card.Body>
        <Card.Title style={{color: '#f4f1de'}}>{pageName}</Card.Title>
        <Card.Text style={{color: '#f4f1de'}}>{pageDescription}</Card.Text>
        <Button
          className="btn btn-primary stretched-link"
          style= {{marginRight:30, backgroundColor: '#000000'}}
          href={`${pageLink}`}
        >
          <span style={{fontSize: '20px', color: '#f4f1de', font: 'Courier-Oblique' }}>More Info</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PageCard;
