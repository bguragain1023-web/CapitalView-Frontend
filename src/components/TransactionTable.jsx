import Table from "react-bootstrap/Table";
import { useUser } from "../contex/UserContex";
import { Button, Form } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { useEffect } from "react";

export const TransactionTable = () => {
  const [displayTransaction, setDisplayTransaction] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);
  const { allTransaction, toggleModal } = useUser();

  useEffect(() => {
    setDisplayTransaction(allTransaction);
  }, [allTransaction]);

  const balance = displayTransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSearch = (e) => {
    const { value } = e.target;
    const searched = allTransaction.filter(({ title }) => {
      return title.toLowerCase().includes(value.toLowerCase());
    });
    setDisplayTransaction(searched);
  };

  const handleOnChecked = (e) => {
    const { checked, value } = e.target;
    let tempArg = [];

    if (value === "selectAll") tempArg = displayTransaction;

    if (checked) {
      if (value === "selectAll") {
        const ids = tempArg.map((item) => item._id);
        console.log(ids);
        const uniqueIds = [...new Set([...deleteItems, ...ids])];
        setDeleteItems(uniqueIds);
        return;
      }
      setDeleteItems([...deleteItems, value]);
    } else {
      if (value === "selectAll") {
        const ids = tempArg.map((item) => item._id);
        setDeleteItems(deleteItems.filter((id) => !ids.includes(id)));
        return;
      }

      setDeleteItems(deleteItems.filter((id) => id !== value));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-3">
        <div>{displayTransaction.length} transaction(s) found!! </div>
        <div>
          <Form.Control type="text" onChange={handleOnSearch} />
        </div>
        <div>
          <Button onClick={() => toggleModal(true)}>
            <IoMdAddCircle /> Add New Transaction
          </Button>
        </div>
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                value="selectAll"
                id="select-all"
                onChange={handleOnChecked}
                checked={
                  displayTransaction.length > 0 &&
                  displayTransaction.every((item) =>
                    deleteItems.includes(item._id),
                  )
                }
              />
              <label htmlFor="select-all">select all</label>
            </th>
            <th>Date</th>
            <th>Title</th>
            <th>Out</th>
            <th>In</th>
          </tr>
        </thead>
        <tbody>
          {displayTransaction.map((item, i) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  value={item?._id}
                  onChange={handleOnChecked}
                  checked={deleteItems.includes(item?._id)}
                />{" "}
                {i + 1}
              </td>
              <td>{item.date.slice(0, 10)}</td>
              <td>{item.title}</td>
              {item.type === "expenses" && (
                <>
                  <td className="text-danger"> -${item.amount}</td>
                  <td></td>
                </>
              )}

              {item.type === "income" && (
                <>
                  <td></td>
                  <td className="text-success">${item.amount}</td>
                </>
              )}
            </tr>
          ))}
          <tr className="fw-bold text-end">
            <td colSpan={3}>Total</td>
            <td
              colSpan={2}
              className={balance > 0 ? "text-success" : "text-danger"}
            >
              {balance}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
