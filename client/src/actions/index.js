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