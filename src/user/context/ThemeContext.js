import { createContext, useEffect, useReducer } from "react";
import { TOGGLE_THEME } from './ActionType';
import { ThemeReducer } from "./reducer/Theme.Reducer";

const ThemeContext = createContext();

const initState = {
    theme: 'light'
}

const handleThemeClass = (themeClass) => {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(themeClass);
  };

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initState);

    useEffect(() => {
        handleThemeClass(state.theme);
    }, [state.theme]);

    const toggleTheme = (theme) => {
        handleThemeClass(theme);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch({ type: TOGGLE_THEME, payload: newTheme })
    }

    return (
        <ThemeContext.Provider value={{ ...state, toggleTheme }}>{children}</ThemeContext.Provider>
    )
}

export default ThemeContext;