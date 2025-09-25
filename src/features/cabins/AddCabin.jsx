import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import { useCabins } from "./useCabins";

export default function AddCabin() {
  const { isLoading } = useCabins();
  if (isLoading) return null;
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Show Modal</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
