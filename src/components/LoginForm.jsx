import { useState } from "react";

import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import Button from "react-bootstrap/Button";

export const LoginForm = () => {
  const [form, setForm] = useState({});
  const inputFields = [
    {
      label: "Email",
      type: "email",
      placeholder: "eg: capital@view.com",
      required: true,
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "********",
      required: true,
      name: "password",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="form-edit">
      <Form onSubmit={handleOnSubmit}>
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
