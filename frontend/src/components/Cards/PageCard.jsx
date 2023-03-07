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
      style= {{marginRight:30, backgroundColor: '#e07a5f'}} >
      <Card.Img variant="top" src={pageImage} />
      <Card.Body>
        <Card.Title>{pageName}</Card.Title>
        <Card.Text>{pageDescription}</Card.Text>
        <Button
          className="btn btn-primary stretched-link"
          style= {{marginRight:30, backgroundColor: '#f2cc8f'}}
          href={`${pageLink}`}
        >
          <span style={{fontSize: '20px', color: '#3d405b', font: 'Courier-Oblique' }}>More Info</span>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PageCard;
