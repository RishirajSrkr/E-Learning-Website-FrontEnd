import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
    
   
    function findSavedTheme(){
        const savedTheme = localStorage.getItem("theme");
        if(savedTheme) return savedTheme;

        return "dark";
        // return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    const [theme, setTheme] = useState(findSavedTheme()); // 


    
    // Toggle the theme
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };


    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);



    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => useContext(ThemeContext);
