"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBreeds = getBreeds;
exports.getCatsByBreedId = getCatsByBreedId;
exports.loadMoreBreeds = loadMoreBreeds;
exports.selectCurrentBreed = selectCurrentBreed;
exports.getCurrentCat = getCurrentCat;

var CatConstant = _interopRequireWildcard(require("../constants/CatConstant"));

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Pulling Branch Data Based on ID
function getBreeds() {
  return function _callee(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("https://api.thecatapi.com/v1/breeds", {
              headers: {
                "x-api-key": _config.CAT_API_KEY
              }
            }));

          case 3:
            response = _context.sent;
            dispatch({
              type: CatConstant.GET_BREEDS,
              breeds: response.data
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("Error:", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}

function getCatsByBreedId(breedId) {
  return function _callee2(dispatch) {
    var urlParams, queries, response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            urlParams = new URLSearchParams();

            if (breedId) {
              urlParams.append("breed_id", breedId);
              urlParams.append("limit", 10);
              urlParams.append("size", "thumb");
            }

            queries = urlParams.toString();
            _context2.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("https://api.thecatapi.com/v1/images/search".concat(queries ? "?".concat(queries) : "?limit=10"), {
              headers: {
                "x-api-key": _config.CAT_API_KEY
              }
            }));

          case 6:
            response = _context2.sent;
            dispatch({
              type: CatConstant.LIST_CATS,
              cats: response.data
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log("Error:", _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
}

function loadMoreBreeds(breedId, nextPage) {
  return function _callee3(dispatch) {
    var urlParams, queries, response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            urlParams = new URLSearchParams();

            if (breedId) {
              urlParams.append("breed_id", breedId);
              urlParams.append("limit", 10);
              urlParams.append("size", "thumb");
              urlParams.append("page", nextPage || 1);
            }

            queries = urlParams.toString();
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("https://api.thecatapi.com/v1/images/search".concat(queries ? "?".concat(queries) : "?limit=10"), {
              headers: {
                "x-api-key": _config.CAT_API_KEY
              }
            }));

          case 6:
            response = _context3.sent;
            dispatch({
              type: CatConstant.LOAD_MORE_CATS,
              cats: response.data
            });
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            console.log("Error:", _context3.t0);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
}

function selectCurrentBreed(currentBreed) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              dispatch({
                type: CatConstant.SET_CURRENT_BREED,
                currentBreed: currentBreed
              });
              getCatsByBreedId(currentBreed)(dispatch);
            } catch (err) {
              console.log("Error:", err);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
}

function getCurrentCat(catId) {
  return function _callee5(dispatch) {
    var response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("https://api.thecatapi.com/v1/images/".concat(catId), {
              headers: {
                "x-api-key": _config.CAT_API_KEY
              }
            }));

          case 3:
            response = _context5.sent;
            dispatch({
              type: CatConstant.GET_CURRENT_CAT,
              currentCat: response.data
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log("Error:", _context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
}