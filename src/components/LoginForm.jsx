import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import Button from "react-bootstrap/Button";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helper/axios";
import { toast } from "react-toastify";

const intialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginForm = () => {
  const { form, handleOnChange } = useForm(intialState);

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const pendingState = loginUser(form);
    toast.promise(pendingState, {
      pending: "please wait...",
    });
    const { status, message, user, accessJWT } = await pendingState;

    toast[status](message);
    console.log(user, accessJWT);
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
