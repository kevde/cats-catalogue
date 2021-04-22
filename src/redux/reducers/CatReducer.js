import * as CatConstant from "../constants/CatConstant"

const defaultState = {

}

export default function (state = defaultState, action) {
  switch (action.type) {
    case CatConstant.GET_BREEDS:
      return {
        ...state,
        breeds: action.breeds,
      };
    case CatConstant.LIST_CATS:
      return {
        ...state,
        list: action.cats,
      };
    case CatConstant.LOAD_MORE_CATS:
      const originalCats = state.list;
      return {
        ...state,
        nextPage: (state.nextPage || 1) + 1,
        list: [...originalCats, ...action.cats],
      };
    case CatConstant.SET_CURRENT_BREED:
      return {
        ...state,
        nextPage: 1,
        currentBreed: action.currentBreed,
      };
    case CatConstant.GET_CURRENT_CAT:
      return {
        ...state,
        currentCat: action.currentCat,
      };

    default:
      return state;
  }
}