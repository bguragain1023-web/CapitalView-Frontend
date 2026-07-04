import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";

export const SignUPForm = () => {
  const [form, setForm] = useState({});

  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      placeholder: "eg: John Doe",
      required: true,
      name: "name",
    },
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
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
      required: true,
      name: "confirmPassword",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== form.password) {
      return toast.error(`Password didn't match`);
    }
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
