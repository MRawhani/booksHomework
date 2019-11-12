

    export default function apiUrl() {
        let apiUri = process.env.REACT_APP_API_URL 
        if(process.env.NODE_ENV === 'production'){
            apiUri ="https://shaibanihomework.herokuapp.com/api/v1"}
            else{
                apiUri="http://localhost:3001/api/v1"
            }
            return apiUri;
    }
 