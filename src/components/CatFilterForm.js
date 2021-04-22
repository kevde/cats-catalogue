import React from "react";
import _ from "lodash";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as CatAction from "../redux/actions/CatAction";

class CatFilterForm extends React.Component {

  async componentDidMount() {
    await this.props.getBreeds();
  }

  handleSelectBreed = async (event) => {
    const currentBreed = event.target.value;
    if (_.isEmpty(currentBreed)) {
      this.props.selectCurrentBreed();
      this.props.history.push(`/`);
    } else {
      this.props.selectCurrentBreed(currentBreed);
      this.props.history.push(`/breeds/${currentBreed}`);
    }
  }

  render() {
    const { breeds } = this.props;
    return (
      <Form>
        <Form.Group controlId="catBreeds">
          <Form.Label>Breeds:</Form.Label>
          <Form.Control as="select" value={this.props.currentBreed} onChange={this.handleSelectBreed}>
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

const mapStateToProps = (state) => ({
  breeds: state?.cats?.breeds,
  currentBreed: state?.cats?.currentBreed,
});

const mapDispatchToProps = (dispatch) => ({
  getBreeds: async () => {
    return dispatch(CatAction.getBreeds());
  },
  selectCurrentBreed: async (breedId) => {
    return dispatch(CatAction.selectCurrentBreed(breedId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatFilterForm));