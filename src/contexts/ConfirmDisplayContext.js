import React, { useState, createContext } from 'react';

export const ConfirmDisplayContext = createContext();

const ConfirmDisplayContextProvider = (props) => {
  const [confirmDisplay, setConfirmDisplay] = useState({
    confirmIsDisplayed: false
  });

  const toggleConfirmDisplay = () => {
    setConfirmDisplay({
      confirmIsDisplayed: !confirmDisplay.confirmIsDisplayed
    });
  };

  return (
    <ConfirmDisplayContext.Provider value={{confirmDisplay, toggleConfirmDisplay}}>
      {props.children}
    </ConfirmDisplayContext.Provider>
  )
}

export default ConfirmDisplayContextProvider;
