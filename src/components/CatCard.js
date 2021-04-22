import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';

class CatCard extends React.Component {
  render() {
    const { cat } = this.props;
    return (
      <CardGroup>
        <Card>
          <Link to={`/cat/${cat.id}`}>
            <LazyLoadImage
              width="100%"
              effect="blur"
              src={cat.url}
            />
          </Link>
        </Card>
      </CardGroup>
    )
  }
}

export default CatCard;