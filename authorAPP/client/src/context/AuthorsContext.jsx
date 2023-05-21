import { createContext, useState, useContext } from "react";

const AuthorsContext = createContext();

export const AuthorsContextProvider = ({ children }) => {
  const [authors, setAuthors] = useState([]);
  return (
    <AuthorsContext.Provider value={[authors, setAuthors]}>
      {children}
    </AuthorsContext.Provider>
  );
};
export const useAuthorsContext = () => useContext(AuthorsContext);
