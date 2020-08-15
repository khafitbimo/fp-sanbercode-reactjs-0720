import React, { useState,createContext,useEffect } from 'react';
import axios from 'axios'

export const DrawerContext = createContext();

export const DrawerProvider = props=>{
    const [open, setOpen] = useState(true);

    return(
        <DrawerContext.Provider value = {[open,setOpen]}>
            {props.children}
        </DrawerContext.Provider>
    )
}
