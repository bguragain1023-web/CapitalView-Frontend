import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";

import useForm from "../hooks/useForm";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tdate: "",
};

export const TransactionForm = () => {
  const { form, handleOnChange, setForm } = useForm(initialState);

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
      name: "tdate",
      value: form.tdate,
    },
  ];
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setForm(initialState);
  };

  return (
    <div className="form-edit">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Transcation Type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange} required>
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
