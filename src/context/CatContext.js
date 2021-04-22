import axios from "axios";
import React, { createContext } from "react";
import { toast } from "react-toastify";
import { CAT_API_KEY } from "../config";

const TOTAL_LIMIT = 10;

export const CatContext = createContext();

class CatContextProvider extends React.Component {
  state = {
    cats: [],
    nextPage: 0,
  };

  getBreeds = async () => {
    try {
      this.setState({ loading: true })
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      this.setState({
        breeds: response.data,
        isEnd: response.data.length < TOTAL_LIMIT,
      });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    } finally {
      this.setState({ loading: false })
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
      this.setState({ cats: response.data, isEnd: response.data.length < TOTAL_LIMIT });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  loadMoreBreeds = async (breedId) => {
    if (this.state.isEnd) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
      return;
    }

    try {
      const urlParams = new URLSearchParams();
      if (breedId) {
        urlParams.append("breed_id", breedId);
        urlParams.append("limit", TOTAL_LIMIT);
        urlParams.append("size", "thumb");
        urlParams.append("page", this.state.nextPage || 1);
      }
      const queries = urlParams.toString();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search${queries ? `?${queries}` : `?limit=${TOTAL_LIMIT}`}`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      this.setState({ cats: [...this.state.cats, ...response.data], nextPage: this.state.nextPage + 1, isEnd: response.data.length < TOTAL_LIMIT });
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    }
  }

  selectCurrentBreed = async (currentBreed) => {
    try {
      this.setState({
        currentBreed: currentBreed,
        loading: true,
      });
      await this.getCatsByBreedId(currentBreed);
    } catch (err) {
      toast("Apologies but we could not load new cats for you at this time! Miau!");
    } finally {
      this.setState({ loading: false })
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