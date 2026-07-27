import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import { patchTransaction, postTransaction } from "../../helper/axios";
import { useUser } from "../contex/UserContex";
import { useState } from "react";

const initialState = {
  type: "",
  title: "",
  amount: "",
  date: "",
};

const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
};

export const TransactionForm = () => {
  const { showTransaction, toggleModal, editTransaction, setEditTransaction } =
    useUser();
  const [submitting, setSubmitting] = useState(false);
  const isEdit = Boolean(editTransaction);
  const { form, handleOnChange, setForm } = useForm(
    editTransaction
      ? { ...editTransaction, date: formatDateForInput(editTransaction.date) }
      : initialState,
  );

  const inputFields = [
    {
      label: "Title",
      type: "text",
      placeholder: "eg: salary",
      required: true,
      name: "title",
      value: form.title,
    },
    {
      label: "Amount",
      type: "number",
      placeholder: "100",
      required: true,
      name: "amount",
      value: form.amount,
    },
    {
      label: "Date",
      type: "date",
      required: true,
      name: "date",
      value: form.date,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    let pending;

    if (editTransaction) {
      const editField = {};
      for (const key in form) {
        if (form[key] !== editTransaction[key]) {
          editField[key] = form[key];
        }
      }
      pending = patchTransaction(editTransaction._id, editField);
    } else pending = postTransaction(form);
    toast.promise(pending, {
      pending: "please wait ...",
    });
    const { status, message } = await pending;
    toast[status](message);
    if (status === "success") {
      setForm(initialState);
      showTransaction();
      toggleModal(false);
    }
  };

  return (
    <div className="form-edit">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Transcation Type</Form.Label>
          <Form.Select
            name="type"
            onChange={handleOnChange}
            value={form.type}
            required
          >
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>
        {inputFields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
