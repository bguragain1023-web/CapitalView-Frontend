import Table from "react-bootstrap/Table";
import { getTransaction } from "../../helper/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../contex/UserContex";

export const TransactionTable = () => {
  const { allTransaction } = useUser();

  const balance = allTransaction.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Title</th>
          <th>Out</th>
          <th>In</th>
        </tr>
      </thead>
      <tbody>
        {allTransaction.map((item, i) => (
          <tr key={item._id}>
            <td>{i + 1}</td>
            <td>{item.date.slice(0, 10)}</td>
            <td>{item.title}</td>
            {item.type === "expenses" && (
              <>
                <td> -${item.amount}</td>
                <td></td>
              </>
            )}

            {item.type === "income" && (
              <>
                <td></td>
                <td>${item.amount}</td>
              </>
            )}
          </tr>
        ))}
        <tr className="fw-bold text-end">
          <td colSpan={3}>Total</td>
          <td colSpan={2}>{balance}</td>
        </tr>
      </tbody>
    </Table>
  );
};
