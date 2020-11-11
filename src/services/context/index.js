import React, {createContext, useState} from 'react';

const Context = createContext({});

export const ContextProvider = (props)=>{
  const [user, setUser] = useState(null);


  const [refreshingHome, setRefreshingHome] = useState(false);

  const [refreshingProfile, setRefreshingProfile] = useState(false);

  return(
    <Context.Provider value={{
      user,
      setUser,
      refreshingHome,
      setRefreshingHome,
      refreshingProfile,
      setRefreshingProfile,
    }
  }>{props.children}</Context.Provider>
  
  );
}

export default Context;
