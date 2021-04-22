import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CatCard extends React.Component {
  render() {
    const { cat } = this.props;
    return (
      <CardGroup>
        <Card>
          <Link to={`/cat/${cat.id}`}>
            <Card.Img
              style={{ width: "100%" }}
              variant="top" src={cat.url} />
          </Link>
        </Card>
      </CardGroup>
    )
  }
}

export default CatCard;