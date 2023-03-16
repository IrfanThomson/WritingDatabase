import { Col, Container, Row, Spinner, Tab, Tabs } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import StoryCard from "../components/Cards/StoryCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const location = useLocation();
  const userQuery = location.pathname.split("/search/").at(-1);
  const queryRE = new RegExp(`(?:${userQuery.replaceAll("%20", "|")})`, "i");
  const client = axios.create({
    baseURL: "http://api.writingdatabase.me/search/",
  });

  // load data from query
  // this will get results for all 3 models
  const getResults = async () => {
    await client
      .get(userQuery)
      .then((response) => {
        setData(response.data);
        setLoaded(true);
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  // this will run exactly once
  useEffect(() => {
    getResults();
  }, []);

  return (
    <Container>
      <h1>Search Results</h1>
      <Tabs defaultActiveKey="Stories">
        <Tab eventKey="Stories" title="Stories">
          <Row xl={4} lg={3} md={2} sm={1} xs={1}>
            {loaded ? (
              data["stories"].map((story) => (
                <Col key={story.id}>
                  <StoryCard story={story} regex={queryRE} />
                </Col>
              ))
            ) : (
              <Spinner animation="grow" />
            )}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Search;
