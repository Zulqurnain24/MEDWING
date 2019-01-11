//import {fetch} from 'isomorphic-fetch';
class ApiCall {
   static callApi() {
        return fetch('http://localhost:3000/api/nurse')
        .then((response)=>{
            return response.json();
        });
    }
}

export default ApiCall;