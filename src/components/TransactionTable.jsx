import Table from "react-bootstrap/Table";
import { useUser } from "../contex/UserContex";
import { Button, Form } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { deleteTransaction } from "../../helper/axios";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const [search, setSearch] = useState("");
  const [deleteItems, setDeleteItems] = useState([]);
  const { allTransaction, toggleModal, showTransaction, setEditTransaction } =
    useUser();

  const displayTransaction = allTransaction.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase()),
  );

  const balance = displayTransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOnChecked = (e) => {
    const { checked, value } = e.target;

    if (value === "selectAll") {
      checked
        ? setDeleteItems(displayTransaction.map((item) => item._id))
        : setDeleteItems([]);

      return;
    }

    if (checked) {
      setDeleteItems([...deleteItems, value]);
    } else {
      setDeleteItems(deleteItems.filter((id) => id !== value));
    }
    return;
  };

  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you eant to delete ${deleteItems.length} transaction(s) ?`,
      )
    ) {
      const pending = deleteTransaction(deleteItems);
      toast.promise(pending, {
        pending: "please wait....",
      });
      const { status, message } = await pending;
      toast[status](message);
      if (status === "success") {
        showTransaction();
        setDeleteItems([]);
      }
    }
  };
  const handleOnUpdate = (transaction) => {
    setEditTransaction(transaction);

    toggleModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center m-3 search-bar">
        <div className="d-flex justify-content-between align-items-center gap-2 ">
          <div>
            <Form.Control
              placeholder={
                allTransaction.length
                  ? "Search Transaction"
                  : "No transaction at all"
              }
              type="text"
              disabled={allTransaction.length === 0}
              onChange={handleOnSearch}
            />
          </div>
          <div>
            <Button
              className="addBtn"
              onClick={() => {
                toggleModal(true);
                setEditTransaction(null);
              }}
            >
              <IoMdAddCircle /> Add New Transaction
            </Button>
          </div>
        </div>
        <div className="text-white">
          {displayTransaction.length} transaction(s) found!!{" "}
        </div>
      </div>
      {allTransaction.length ? (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>
                <Form.Check
                  label={"Select ALl"}
                  value="selectAll"
                  onChange={handleOnChecked}
                  checked={
                    deleteItems.length > 0 &&
                    deleteItems.length === displayTransaction.length
                  }
                />
              </th>
              <th>Date</th>
              <th>Title</th>
              <th>Out</th>
              <th colSpan={2}>In</th>
            </tr>
          </thead>
          <tbody>
            {displayTransaction.map((item, i) => (
              <tr key={item._id}>
                <td>
                  <Form.Check
                    label={i + 1}
                    value={item._id}
                    onChange={handleOnChecked}
                    checked={deleteItems.includes(item._id)}
                  />
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
                <td>
                  <Button
                    className="updateBtn"
                    variant="outline-info"
                    onClick={() => {
                      handleOnUpdate(item);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="fw-bold text-end">
              <td colSpan={4}>Total</td>
              <td
                colSpan={2}
                className={balance > 0 ? "text-success" : "text-danger"}
              >
                {balance}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <div className="empty-div">
          No Transaction Found <br /> Add a new transaction to get started,
        </div>
      )}

      {deleteItems.length > 0 && (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {deleteItems.length} Transactions
          </Button>
        </div>
      )}
    </>
  );
};
