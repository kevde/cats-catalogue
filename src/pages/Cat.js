import React from "react";
import { toast } from 'react-toastify';
import _ from "lodash";
import { CardGroup, Card, Row, Col, Spinner, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CatContext } from "../context/CatContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

class Cat extends React.Component {
  state = {
    loading: false,
  };

  static contextType = CatContext;

  async componentDidMount() {
    const { catId } = this.props.match.params;
    try {
      this.setState({ loading: true })
      await this.context.getCurrentCat(catId);

    } catch (error) {
      console.log(error);
      toast('“Apologies but we could not load this cat for you at this time! Miau!”');
      this.props.history.push("/");
    } finally {
      this.setState({ loading: false })
    }

  }

  renderLoaded() {
    const { currentCat } = this.context;
    const currentBreedId = _.get(currentCat, 'breeds.0.id');
    const currentBreed = _.get(currentCat, 'breeds.0.name');
    const temperament = _.get(currentCat, 'breeds.0.temperament');
    const origin = _.get(currentCat, 'breeds.0.origin');
    const description = _.get(currentCat, 'breeds.0.description');
    return (
      <Row className="justify-content-md-center align-items-center">
        <Col md="10">
          <CardGroup>
            <Card>
              <Card.Body>
                <Row>
                  <Col md="8">
                    {currentCat && (
                      <LazyLoadImage
                        effect="blur"
                        width="100%"
                        variant="top" src={currentCat.url} />
                    )}
                  </Col>
                  <Col md="4">
                    {currentBreed && (
                      <Card.Title>
                        <Row>
                          <Col>{currentBreed}</Col>
                        </Row>
                      </Card.Title>
                    )}
                    <Container>
                      {origin && (
                        <Row>
                          <Col md="12">
                            <b>
                              Origin
                    </b>
                          </Col>
                          <Col>{origin}</Col>
                        </Row>
                      )}
                      {temperament && (
                        <Row className="my-4">
                          <Col md="12">
                            <b>Temperament</b>
                          </Col>
                          <Col>{temperament}</Col>
                        </Row>
                      )}
                      {description && (
                        <Row>
                          <Col md="12">
                            <b>Description</b>
                          </Col>
                          <Col>{description}</Col>
                        </Row>
                      )}
                    </Container>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Link to={currentBreedId ? `/breeds/${currentBreedId}` : ""}>
                  <Button variant="flat" size="xxl">Back</Button>
                </Link>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <Container className="">
          <Row className="height-100 justify-content-md-center align-items-center">
            <Col>
              <Spinner animation="border" />
            </Col>
          </Row>
        </Container>
      );
    }

    return this.renderLoaded();
  }
}

export default Cat;