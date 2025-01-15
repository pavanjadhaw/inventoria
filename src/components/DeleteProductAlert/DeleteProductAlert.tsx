import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MdDelete } from "react-icons/md";

type DeleteProductAlertProps = {
  isDisabled: boolean;
  deleteProduct: () => void;
};

export const DeleteProductAlert = (props: DeleteProductAlertProps) => {
  const { isDisabled, deleteProduct } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={isDisabled}
          className={isDisabled ? "cursor-not-allowed" : ""}
        >
          <MdDelete size={20} color={isDisabled ? "gray" : "red"} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProduct}>
            Delete Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
