import React,{useState,useEffect} from "react";

export const AppContext = React.createContext();

const AppProvider = (props)=>{
    const [showSideBar,setShowSideBar] = useState(false);
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
    }}>
        {props.children}
    </AppContext.Provider>
}

export default AppProvider;