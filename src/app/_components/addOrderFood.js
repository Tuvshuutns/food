import { RedPlusIcon } from "@/app/icons/redPlusIcon";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Sonnerr } from "./sonerr";
import { useCounter } from "./count";
import { useCartStore } from "../_context/foodCartStore";
import { CorrectIcon } from "../icons/correctIcon";

export function AddOrderFood({ item }) {
  const { addToCart, cart } = useCartStore();
  const { count, minus, plus } = useCounter(1);
  const isAdded = cart.some((c) => c.id === item._id);

  const handleAdd = () => {
    addToCart({
      id: item._id,
      name: item.foodName,
      price: item.price,
      quantity: count,
      Image: item.Image,
      ingredients: item.ingredients,
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className={`rounded-full w-11 h-11 flex items-center justify-center absolute z-10 bottom-2 right-2 cursor-pointer ${
              isAdded ? "bg-black" : "bg-white"
            }`}
          >
            {isAdded ? <CorrectIcon /> : <RedPlusIcon />}
          </button>
        </DialogTrigger>
        <DialogContent className="w-[826px] h-[412px] flex gap-6">
          <div className="h-full w-[377px] relative">
            <img
              src={item.Image}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-between w-[377px]">
            <DialogHeader className={"mt-10"}>
              <DialogTitle>{item.foodName}</DialogTitle>
              <p>{item.ingredients}</p>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="grid">
                  <Label htmlFor="name-1">Total price</Label>
                  <p className="text-2xl font-semibold">
                    {count * item.price}T
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className={`w-11 h-11 border rounded-full ${
                      count === 1 ? "border-[#d1d1d1]" : "border-black"
                    }`}
                    onClick={minus}
                  >
                    -
                  </button>
                  <div className="flex items-center text-lg font-semibold w-3 justify-center">
                    {count}
                  </div>
                  <button
                    className="w-11 h-11 border border-black rounded-full"
                    onClick={plus}
                  >
                    +
                  </button>
                </div>
              </div>
              <DialogFooter>
                <div onClick={handleAdd}>
                  <Sonnerr />
                </div>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
