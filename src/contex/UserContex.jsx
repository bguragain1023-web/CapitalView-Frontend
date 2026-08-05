import { createContext, useContext, useState } from "react";
import { getTransaction } from "../../helper/axios";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [allTransaction, setAllTransaction] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);
  const [show, setShow] = useState(false);
  const toggleModal = (value) => {
    setShow(value);
  };
  const [estimate, setEstimate] = useState(null);
  const [localEstimate, setLocalEstimate] = useState(null);

  const showTransaction = async () => {
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
        show,
        toggleModal,
        editTransaction,
        setEditTransaction,
        estimate,
        setEstimate,
        setLocalEstimate,
        localEstimate,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
