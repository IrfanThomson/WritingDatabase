import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import axios from "axios";
import StoryCard from "../components/Cards/StoryCard";
import Pagination from "react-bootstrap/Pagination";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activePage, setActivePage] = useState(1);

  function handleClick(number) {
    console.log("Clicked page ", number);
    setActivePage(number);
    setLoaded(false);
  }

  useEffect(() => {
    const fetchStories = async () => {
      if (!loaded) {
        await client
          .get(`stories?page=${activePage}&perPage=20`)
          .then((response) => {
            setStories(response.data);
          })
          .catch((err) => console.log(err));
        setLoaded(true);
      }
    };
    fetchStories();
  }, [stories, loaded]);

  let numPages = 1000 / 20;
  let items = [];
  for (let number = activePage - 2; number <= activePage + 2; number++) {
    if (number > 0 && number <= numPages) {
      items.push(
        <Pagination.Item
          key={number}
          onClick={() => handleClick(number)}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  return (
    <Container>
      <h1 className="p-5 text-center">Stories</h1>
      <Pagination className="justify-content-center">
        {activePage > 3 && (
          <Pagination.Item
            first
            key={1}
            onClick={() => handleClick(1)}
            active={1 === activePage}
          >
            1
          </Pagination.Item>
        )}
        {activePage > 4 && <Pagination.Ellipsis />}
        {items}
        {activePage < numPages - 3 && <Pagination.Ellipsis />}
        {activePage < numPages - 2 && (
          <Pagination.Item
            last
            key={numPages}
            onClick={() => handleClick(numPages)}
            active={numPages === activePage}
          >
            {numPages}
          </Pagination.Item>
        )}
      </Pagination>
      <Row
        xl={4}
        lg={3}
        md={2}
        sm={1}
        xs={1}
        className="d-flex g-4 p-4 justify-content-center"
      >
        {loaded ? (
          stories["data"].map((story) => {
            return (
              <Col className="d-flex align-self-stretch">
                <StoryCard story={story} />
              </Col>
            );
          })
        ) : (
          <Spinner animation="grow" />
        )}
      </Row>
    </Container>
  );
};

export default Stories;
