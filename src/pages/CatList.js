import React from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Masonry from "react-masonry-css";
import CatCard from "../components/CatCard";
import CatFilterForm from "../components/CatFilterForm";
import { CatContext } from "../context/CatContext";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}

class CatList extends React.Component {
  static contextType = CatContext;

  async componentDidMount() {
    const { breedId } = this.props.match.params;
    await this.context.selectCurrentBreed(breedId);
  }

  handleLoadMore = async () => {
    const { breedId } = this.props.match.params;
    await this.context.loadMoreBreeds(breedId, this.context.nextPage);
  }

  render() {
    const { cats } = this.context;
    return (
      <Container className="mx-4">
        <Row>
          <Col>
            <CatFilterForm />
          </Col>
        </Row>
        {this.context.loading && (
          <Container className="">
            <Row className="height-100 justify-content-md-center align-items-center">
              <Col>
                <Spinner animation="border" />
              </Col>
            </Row>
          </Container>
        )}
        {!this.context.loading && (
          <LazyLoadComponent>
            <Row>
              <Col>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column">
                  {cats && cats.map((cat, key) => (<CatCard cat={cat} key={key} />))}
                </Masonry>
              </Col>
            </Row>
          </LazyLoadComponent>
        )}
        {!this.context.loading && (
          <Row>
            <Col>
              <Button variant="flat" size="xxl" onClick={this.handleLoadMore}>Load More</Button>
            </Col>
          </Row>
        )}
      </Container>
    )
  }
}

export default CatList;