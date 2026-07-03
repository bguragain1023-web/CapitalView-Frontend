import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignUPForm = () => {
  return (
    <div className="from-edit">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>FUll Name</Form.Label>
          <Form.Control type="text" placeholder="eg: John Doe" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
