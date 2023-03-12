import React, { useState, useEffect, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import axios from "axios";
import StoryCard from "../components/Cards/StoryCard";
import Pagination from "react-bootstrap/Pagination";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FilterDropdown from "../components/FilterDropdown";

const client = axios.create({
  baseURL: "http://127.0.0.1:5000/",
});

var queryRE = null;

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const searchQuery = useRef("");

  const [sort, setSort] = useState("sort");
  const [ascending, setAscending] = useState(false);
  const [rating, setRating] = useState("Rating");
  const [genre, setGenre] = useState("Genre");
  const [length, setLength] = useState("Length");

  const handleSortFilter = (value) => {
    setSort(value.toLowerCase().replace(" ", "_"));
  };
  const handleOrderFilter = (value) => {
    setAscending(value == "Ascending");
  };
  const HandleRatingFilter = (value) => {
    setRating(value);
  };
  const HandleGenreFilter = (value) => {
    setGenre(value);
  };
  const HandleLengthFilter = (value) => {
    setLength(value);
  };

  function handleClick(number) {
    setActivePage(number);
    setLoaded(false);
  }

  useEffect(() => {
    const fetchStories = async () => {
      if (!loaded) {
        var query = `stories?page=${activePage}&perPage=20`;
        if (searchQuery.current.value != "") {
          query = `search/story/${searchQuery.current.value}`;
          queryRE = new RegExp(
            `(?:${searchQuery.current.value.replaceAll(" ", "|")})`,
            "i"
          );
        } else {
          queryRE = null;
          if (sort != "sort") {
            query += `&sort=${sort}`;
          }
          if (ascending && sort != "sort") {
            query += "&asc";
          }
          if (rating != "Rating") {
            query += `&rating=${rating}`;
          }
          if (genre != "Genre") {
            query += `&genre=${genre}`;
          }
          if (length != "Length") {
            query += `&length=${length}`;
          }
        }

        console.log(query);
        await client
          .get(query)
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
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          setLoaded(false);
        }}
        className="d-flex pb-5 justify-content-center"
      >
        <Form.Control
          ref={searchQuery}
          style={{ width: "20vw" }}
          type="search"
          placeholder="Search stories"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="dark" onClick={() => setLoaded(false)}>
          Search
        </Button>
      </Form>
      <Form className="filter-form" >
        <Row className="mx-auto text-center w-50 mb-4">
          <Col>
            <FilterDropdown
              variant="Secondary"
              title="Sort"
              items={[
                "Sort",
                "Title",
                "Rating",
                "Date",
              ]}
              onChange={handleSortFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Order"
              items={["Ascending", "Descending"]}
              onChange={handleOrderFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Rating"
              items={[
                "Rating",
                "Awesome",
                "Good",
                "Mid",
                "Pretty bad",
                "Yikes"
              ]}
              scroll
              onChange={HandleRatingFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Genre"
              items={[
                "Genre",
                "Sci-fi",
                "Fantasy"
              ]}
              scroll
              onChange={HandleGenreFilter}
            />
          </Col>
          <Col>
            <FilterDropdown
              title="Length"
              items={[
                "Length",
                "Novel",
                "Novella",
              ]}
              scroll
              onChange={HandleLengthFilter}
            />
          </Col>
        </Row>
        <Row className="mx-auto text-center my-4">
          <Col>
            <Button
              variant="dark"
              onClick={() => setLoaded(false)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

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
        className="d-flex g-4 p-5 justify-content-center"
      >
        {loaded ? (
          stories["data"].map((story) => {
            return (
              <Col key={story.id} className="d-flex align-self-stretch">
                <StoryCard story={story} regex={queryRE} />
              </Col>
            );
          })
        ) : (
          <Spinner animation="grow" />
        )}
      </Row>
      <Pagination className="justify-content-center pt-5">
        {activePage > 3 && (
          <Pagination.Item
            key={1}
            onClick={() => handleClick(1)}
            active={1 === activePage}
            first={true}
          >
            1
          </Pagination.Item>
        )}
        {activePage > 4 && <Pagination.Ellipsis />}
        {items}
        {activePage < numPages - 3 && <Pagination.Ellipsis />}
        {activePage < numPages - 2 && (
          <Pagination.Item
            key={numPages}
            onClick={() => handleClick(numPages)}
            active={numPages === activePage}
            last={true}
          >
            {numPages}
          </Pagination.Item>
        )}
      </Pagination>
    </Container>
  );
};

export default Stories;
