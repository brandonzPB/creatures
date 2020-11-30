import React, { useState, createContext } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({
    isSunset: false,
    isDay: true,
    isEvening: false,
    sunset_theme: {
      bg: '',
      syntax: '',
      btns: '',
    },
    day_theme: {
      bg: '',
      syntax: '',
      btns: '',
    },
    evening_theme: {
      bg: '',
      syntax: '',
      btns: '',
    }
  });

  return (
    <ThemeContext.Provider value={{ theme, }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;
