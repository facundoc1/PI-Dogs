const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_DOGS":
            action.payload.forEach(element => {
                if (!element.temperaments[0]) {
                    element.temperaments[0] = "no-temperaments" 
                }
            });
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            };
        
        case "GET_TEMPERAMENTS":
            const filteresTemp = action.payload.filter((temp) => temp.name !== "" ); 
            return {
                ...state,
                temperaments: filteresTemp,
            };

        case "GET_FILTER_TEMPERAMENTS":
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if (action.payload === "Todos") {
                filteredDogs = allDogs;
            } else {
                for (let i =0; i < allDogs.length; i++) {
                    let found = allDogs[i].temperaments.find((t) => t === action.payload);
                    if (found) {
                        filteredDogs.push(allDogs[i]);
                    }
                }
            }
            return {
                ...state,
                dogs: filteredDogs,
            };
        case "GET_BREED":
            return {
                ...state,
                dogs: action.payload,
            };
        case "ORDER_BY_NAME":
                let sortedDogsByName = [...state.dogs];
                if (action.payload === "A-Z") {
                  sortedDogsByName.sort((a, b) => a.name.localeCompare(b.name));
                } else if (action.payload === "Z-A") {
                  sortedDogsByName.sort((a, b) => b.name.localeCompare(a.name));
                }
                return {
                  ...state,
                  dogs: sortedDogsByName,
                };
          
        case "ORDER_BY_WEIGHT":
                return {
        ...state,
        dogs: action.payload,
      };
      case 'FILTER_CREATED':
    const createdFilter = action.payload === 'created' ?
        state.allDogs.filter(el => el.createdInDB) : // Filtrar los perros creados en la DB
        state.allDogs.filter(el => !el.createdInDB); // Filtrar los perros NO creados en la DB
    return {
        ...state,
        dogs: createdFilter, // Actualizar el estado 'dogs' con el filtro aplicado
    };

        case "SHOW_DOG_DETAILS":
            let myDetails = action.payload
            if (!myDetails[0].temperaments[0]) {
              myDetails[0].temperaments[0] = "no-temperaments"
            }
            return {
              ...state,
              details: myDetails
            };
          default:
            return state;
        }
      };
      
      export default rootReducer;
