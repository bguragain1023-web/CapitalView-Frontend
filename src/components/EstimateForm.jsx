import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm";

export const EstimateForm = () => {
  const { form, handleOnChange } = useForm({ months: "" });
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form.months);
  };
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className=" text-white totalbalance">
            Estimate Timeframe{" "}
          </Form.Label>
          <Form.Select
            name="months"
            onChange={handleOnChange}
            value={form.months || ""}
            required
          >
            <option value="">Select</option>
            <option value={6}>6 months</option>
            <option value={12}>1 year</option>
            <option value={24}>2 year</option>
          </Form.Select>
        </Form.Group>

        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
