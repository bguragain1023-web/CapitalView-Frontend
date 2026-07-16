import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { postNewUser } from "../../helper/axios";
import useForm from "../hooks/useForm";

const intialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export const SignUPForm = () => {
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
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== form.password) {
      return toast.error(`Password didn't match`);
    }
    const { status, message } = await postNewUser(rest);
    toast[status](message);

    status === "success" && setForm(intialState);
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
