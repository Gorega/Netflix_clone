import axios from "axios";
import React,{ useEffect, useState } from "react";


function useFetch(url){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

      axios.get(url)
      .then(res => setData(res.data.results))
      .catch(err => console.log(err));

    return {data}
}

export default useFetch;