import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import Button from "react-bootstrap/Button";
import useForm from "../hooks/useForm";
import { loginUser } from "../../helper/axios";
import { toast } from "react-toastify";
import { useUser } from "../contex/UserContex";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const intialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const { form, handleOnChange } = useForm(intialState);
  const goTo = location?.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(goTo);
  }, [user?._id, navigate, goTo]);

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
    setIsLoading(true);

    const pendingState = loginUser(form);
    toast.promise(pendingState, {
      pending: "please wait...",
    });
    const { status, message, user, accessJWT } = await pendingState;

    toast[status](message);
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);

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
      <div className="demo-detail d-flex flex-column justify-content-center align-items-center ">
        <div>
          <mark>Demo User Login Detail</mark> <br />
        </div>
        <div className="demobox">
          <strong>Email</strong>: demo@user.com <br />
          <strong>Password</strong>: aaa
        </div>
      </div>
    </div>
  );
};
