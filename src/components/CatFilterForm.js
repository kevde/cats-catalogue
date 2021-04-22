import React from "react";
import _ from "lodash";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { CatContext } from "../context/CatContext";

class CatFilterForm extends React.Component {

  static contextType = CatContext;

  async componentDidMount() {
    await this.context.getBreeds();
  }

  handleSelectBreed = async (event) => {
    const currentBreed = event.target.value;
    if (_.isEmpty(currentBreed)) {
      this.context.selectCurrentBreed();
      this.props.history.push(`/`);
    } else {
      this.context.selectCurrentBreed(currentBreed);
      this.props.history.push(`/breeds/${currentBreed}`);
    }
  }

  render() {
    const { breeds } = this.context;
    return (
      <Form>
        <Form.Group controlId="catBreeds">
          <Form.Label>Breeds:</Form.Label>
          <Form.Control as="select" value={this.context.currentBreed} onChange={this.handleSelectBreed}>
            <option value="">Select a breed...</option>
            {breeds && breeds.map((breed) => {
              return <option value={breed.id}>{breed.name}</option>
            })}
          </Form.Control>
        </Form.Group>
      </Form>
    )
  }
}

export default withRouter(CatFilterForm);