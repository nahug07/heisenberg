import axios from 'axios';

export function getCharacters(){
    return async function(dispatch){       // ésta es mi conexión entre el fron y back
        var json = await axios.get('http://localhost:3001/characters', {

        });
        return dispatch({
            type:'GET_CHARACTERS',
            payload: json.data
        })
    }
}

export function filterCharactersByStatus(payload){
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}