import axios from "axios";
import React,{useState,useEffect} from "react";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [selectedMovies,setSelectedMovies] = useState([]);
    const [showSideBar,setShowSideBar] = useState(false);
    const [user,setUser] = useState([]);


    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user)
    },[])

    const getSelectedListMovies = async (url)=>{
        const response = await axios.get(url);
        const data = await response.data.results;
        setSelectedMovies(data);
    }


    return <AppContext.Provider value={{
        getSelectedListMovies,selectedMovies,
        user,setUser,
        showSideBar,setShowSideBar,
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;