import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postNewUser } from "../../helper/axios";
import useForm from "../hooks/useForm";
import { useState } from "react";

const intialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignUPForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { form, handleOnChange, setForm } = useForm(intialState);

  const inputFields = [
    {
      label: "Full Name",
      type: "text",
      placeholder: "eg: John Doe",
      required: true,
      name: "name",
      value: form.name,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "eg: capital@view.com",
      required: true,
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      type: "password",
      placeholder: "********",
      required: true,
      name: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
      required: true,
      name: "confirmPassword",
      value: form.confirmPassword,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== form.password) {
      return toast.error(`Password didn't match`);
    }

    const pending = postNewUser(rest);
    toast.promise(pending, {
      pending: "please wait...",
    });
    const { status, message } = await pending;
    toast[status](message);

    status === "success" && setForm(intialState);
    setIsLoading(false);
  };
  return (
    <div className="form-edit">
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}

        <Button variant="danger" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};
