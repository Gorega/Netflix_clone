import React,{useState,useEffect, useRef} from "react";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [showSideBar,setShowSideBar] = useState(false);
    const searchRef = useRef();
    const [user,setUser] = useState({
        image:"",
        name:"",
        watchList:[]
    });

    useEffect(()=>{
        const user = JSON.parse(window.localStorage.getItem("user"))
        setUser(user)
    },[])

    return <AppContext.Provider value={{
        user,setUser,
        showSideBar,setShowSideBar,
        searchRef
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;