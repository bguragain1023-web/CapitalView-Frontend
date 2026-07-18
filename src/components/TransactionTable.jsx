import Table from "react-bootstrap/Table";
import { getTransaction } from "../../helper/axios";
import { useState } from "react";
import { useEffect } from "react";

export const TransactionTable = () => {
  const [allTransaction, setAllTransaction] = useState([]);

  useEffect(() => {
    const showTransaction = async () => {
      const { status, message, transaction } = await getTransaction();
      console.log(status, transaction, message);
      setAllTransaction(transaction);
    };

    showTransaction();
  }, []);
  console.log(allTransaction);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Type</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {allTransaction.map((item, i) => (
          <tr key={item._id}>
            <td>{i + 1}</td>
            <td>{new Date(item.date).toISOString().split("T")[0]}</td>
            <td>{item.title}</td>
            <td>{item.type}</td>
            <td>AUD{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
