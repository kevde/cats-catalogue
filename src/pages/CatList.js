import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Masonry from "react-masonry-css";
import { connect } from "react-redux";
import CatCard from "../components/CatCard";
import CatFilterForm from "../components/CatFilterForm";
import * as CatAction from "../redux/actions/CatAction";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
}

class CatList extends React.Component {

  async componentDidMount() {
    const { breedId } = this.props.match.params;
    await this.props.selectCurrentBreed(breedId);
  }

  handleLoadMore = async () => {
    const { breedId } = this.props.match.params;
    await this.props.loadMoreBreeds(breedId, this.props.nextPage);
  }

  render() {
    const { cats } = this.props;
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

const mapStateToProps = (state) => ({
  cats: state?.cats?.list || [],
  nextPage: state?.cats?.nextPage || 0,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrentBreed: async (breedId) => {
    return dispatch(CatAction.selectCurrentBreed(breedId));
  },
  loadMoreBreeds: async (breedId) => {
    return dispatch(CatAction.loadMoreBreeds(breedId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CatList);