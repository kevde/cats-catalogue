import React from "react";
import { toast } from 'react-toastify';
import _ from "lodash";
import { CardGroup, Card, Row, Col, Spinner, Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as CatAction from "../redux/actions/CatAction";
import { Link } from "react-router-dom";
class Cat extends React.Component {
  state = {
    loading: false,
  };

  async componentDidMount() {
    const { catId } = this.props.match.params;
    try {
      this.setState({ loading: true })
      await this.props.getCurrentCat(catId);

    } catch (error) {
      console.log(error);
      toast('“Apologies but we could not load this cat for you at this time! Miau!”');
      this.props.history.push("/");
    } finally {
      this.setState({ loading: false })
    }

  }

  renderLoaded() {
    const { cat } = this.props;
    const currentBreed = _.get(cat, 'breeds.0.id');
    return (
      <CardGroup>
        <Card>
          <Card.Img
            style={{ width: "100%" }}
            variant="top" src={cat.url} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              <Row>
                <Col>
                  Breed Name
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  Origin
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  Temperament
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>
                  Description
                </Col>
                <Col></Col>
              </Row>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Link to={currentBreed ? `/breeds/${currentBreed}` : ""}>
              <Button>Back</Button>
            </Link>
          </Card.Footer>
        </Card>
      </CardGroup>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <Row>
          <Col>
            <Spinner />
          </Col>
        </Row>
      );
    }

    return this.renderLoaded();
  }
}

const mapStateToProps = (state) => ({
  cat: state?.cats?.currentCat || {},
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentCat: async (catId) => {
    return dispatch(CatAction.getCurrentCat(catId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cat);