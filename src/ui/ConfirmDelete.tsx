import Button from "./Button";

type ConfirmDeleteProps = {
  deleteItem: () => void;
  item: string;
  closeModal: () => void;
};

export default function ConfirmDelete({
  deleteItem,
  item,
  closeModal,
}: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="font-bold text-2xl capitalize"> {item} </h1>
      <h2>Are you sure you want to delete?</h2>
      <div className="flex gap-4">
        <Button onClick={closeModal} type="primary">
          Cancel
        </Button>
        <Button onClick={deleteItem} type="secondary">
          Delete
        </Button>
      </div>
    </div>
  );
}
