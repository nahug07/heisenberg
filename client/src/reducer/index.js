

const initialState = {
  characters: [],
  allCharacters: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "GET_CHARACTERS":
        return {
            ...state,
            characters: action.payload,
            allCharacters: action.payload
        };

    case "FILTER_BY_STATUS":
        const allCharacters = state.allCharacters
        const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
        return {
            ...state,
            characters: statusFiltered
        };

    case "FILTER_CREATED":
        const createdFilter = action.payload === 'created' ? state.allCharacters.filter(el => el.createdInDb) : state.allCharacters.filter(el => !el.createdInDb)
        return {
            ...state,
            characters: createdFilter
        };

    case "ORDER_BY_NAME":
        let sortedArr = action.payload === 'asc' ?
            state.characters.sort(function (a,b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
            state.characters.sort(function (a,b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })  
        return {
            ...state,
            characters: sortedArr
        }; 

    case "GET_NAME_CHARACTERS":
        return {
            ...state,
            characters: action.payload
        }

    default:
      return state;
  }
}


export default rootReducer;
