import axios from "axios";
import React, { createContext } from "react";
import { toast } from "react-toastify";
import { CAT_API_KEY } from "../config";

export const CatContext = createContext();

class CatContextProvider extends React.Component {
  state = {
    cats: [],
  };

  getBreeds = async () => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      this.setState({
        breeds: response.data,
      });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  getCatsByBreedId = async (breedId) => {
    try {
      const urlParams = new URLSearchParams();
      if (breedId) {
        urlParams.append("breed_id", breedId);
        urlParams.append("limit", 10);
        urlParams.append("size", "thumb");
      }
      const queries = urlParams.toString();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search${queries ? `?${queries}` : "?limit=10"}`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      });
      this.setState({ cats: response.data });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  loadMoreBreeds = async (breedId, nextPage) => {
    try {
      const urlParams = new URLSearchParams();
      if (breedId) {
        urlParams.append("breed_id", breedId);
        urlParams.append("limit", 10);
        urlParams.append("size", "thumb");
        urlParams.append("page", nextPage || 1);
      }
      const queries = urlParams.toString();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search${queries ? `?${queries}` : "?limit=10"}`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      this.setState({ cats: [...this.state.cats, ...response.data] });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  selectCurrentBreed = async (currentBreed) => {
    try {
      this.setState({
        currentBreed: currentBreed,
      });
      this.getCatsByBreedId(currentBreed);
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  getCurrentCat = async (catId) => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/${catId}`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      this.setState({
        currentCat: response.data,
      });
    } catch (err) {
      toast("Apologies but we could not load that cat for you at this time! Miau!");
    }
  }

  render() {
    return <CatContext.Provider value={{
      ...this.state,
      getBreeds: this.getBreeds,
      getCatsByBreedId: this.getCatsByBreedId,
      getCurrentCat: this.getCurrentCat,
      loadMoreBreeds: this.loadMoreBreeds,
      selectCurrentBreed: this.selectCurrentBreed,
    }}>
      {this.props.children}
    </CatContext.Provider>
  }
}

export default CatContextProvider;