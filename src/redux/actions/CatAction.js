import * as CatConstant from "../constants/CatConstant";

import axios from "axios";
import _ from "lodash";
import { CAT_API_KEY } from "../../config";


// Pulling Branch Data Based on ID
export function getBreeds() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/breeds`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      dispatch({
        type: CatConstant.GET_BREEDS,
        breeds: response.data,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function getCatsByBreedId(breedId) {
  return async (dispatch) => {
    try {
      const urlParams = new URLSearchParams();
      if(breedId) {
        urlParams.append("breed_id", breedId);
        urlParams.append("limit", 10);
        urlParams.append("size", "thumb");
      }
      const queries = urlParams.toString();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search${queries ? `?${queries}`: "?limit=10" }`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      dispatch({
        type: CatConstant.LIST_CATS,
        cats: response.data,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function loadMoreBreeds(breedId, nextPage) {
  return async (dispatch) => {
    try {
      const urlParams = new URLSearchParams();
      if(breedId) {
        urlParams.append("breed_id", breedId);
        urlParams.append("limit", 10);
        urlParams.append("size", "thumb");
        urlParams.append("page", nextPage || 1);
      }
      const queries = urlParams.toString();
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search${queries ? `?${queries}`: "?limit=10" }`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      dispatch({
        type: CatConstant.LOAD_MORE_CATS,
        cats: response.data,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function selectCurrentBreed(currentBreed) {
  return async (dispatch) => {
    try {
      dispatch({
        type: CatConstant.SET_CURRENT_BREED,
        currentBreed: currentBreed,
      });
      getCatsByBreedId(currentBreed)(dispatch);
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

export function getCurrentCat(catId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.thecatapi.com/v1/images/${catId}`, {
        headers: {
          "x-api-key": CAT_API_KEY
        }
      }
      );
      dispatch({
        type: CatConstant.GET_CURRENT_CAT,
        currentCat: response.data,
      });
    } catch (err) {
      console.log("Error:", err);
    }
  };
}

