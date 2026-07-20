import { createContext, useContext, useState } from "react";
import { getTransaction } from "../../helper/axios";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allTransaction, setAllTransaction] = useState([]);

  const showTransaction = async () => {
    const result = await getTransaction();
    console.log("RAW result:", result);
    const { status, transaction } = await getTransaction();
    status === "success" && setAllTransaction(transaction);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        showTransaction,
        allTransaction,
        setAllTransaction,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
