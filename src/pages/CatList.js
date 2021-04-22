import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
        <Row>
          <Col>
            <Button variant="flat" size="xxl" onClick={this.handleLoadMore}>Load More</Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CatList;