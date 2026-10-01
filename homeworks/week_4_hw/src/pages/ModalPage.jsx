import Modal from "../components/Modal";
import Button from "../components/Button";

const ModalPage = () => {
  return (
    <div>
        <Button success rounded onClick = {handleClick}>Open Modal</Button>
      <Modal />
    </div>
  );
};

export default ModalPage;