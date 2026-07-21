import Modal from "react-bootstrap/Modal";
import { useUser } from "../contex/UserContex";

export const CustomModal = ({ children }) => {
  const { toggleModal, show } = useUser();

  return (
    <>
      <Modal
        show={show}
        onHide={() => toggleModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
