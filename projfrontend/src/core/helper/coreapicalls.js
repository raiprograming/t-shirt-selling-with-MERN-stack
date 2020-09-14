const { default: API } = require("../../backend");

export const GetProducts=()=>{
    return fetch(`${API}/products`,{method:"GET"})
    .then(response=>{
            return response.json();
        }
    )
    .catch(err=>{console.log(err)})
}