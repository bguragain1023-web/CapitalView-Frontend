import { useState } from "react";

const handleOnChage = ({ e, form, setForm }) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: value,
  });
};

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  return {
    form,
    setForm,
    handleOnChange: (e) => handleOnChage({ e, setForm, form }),
  };
};

export default useForm;
