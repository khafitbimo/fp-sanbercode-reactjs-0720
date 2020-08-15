import React, { useState,createContext } from 'react';

export const DrawerContext = createContext();

export const DrawerProvider = props=>{
    const [open, setOpen] = useState(true);

    return(
        <DrawerContext.Provider value = {[open,setOpen]}>
            {props.children}
        </DrawerContext.Provider>
    )
}
