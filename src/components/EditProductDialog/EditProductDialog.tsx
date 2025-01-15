import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InventoryItem } from "@/hooks";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

type EditProductProps = {
  isDisabled: boolean;
  item: InventoryItem;
  editItem: (item: InventoryItem) => void;
};

export function DialogDemo(props: EditProductProps) {
  const [open, setOpen] = useState(false);
  const { isDisabled, editItem } = props;
  const [state, setState] = useState<InventoryItem>(props.item);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: id === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editItem({
      ...state,
      value: `$${parseInt(state.price.replace("$", "")) * state.quantity}`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          disabled={isDisabled}
          className={isDisabled ? "cursor-not-allowed" : ""}
        >
          <MdEdit size={20} color={isDisabled ? "gray" : "green"} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>{state.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={state.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={state.category}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={state.price}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={state.quantity.toString()}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
