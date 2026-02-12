import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "../_context/authContext";

export function OrderSuccess({ cart, clearCart }) {
  const { user, token } = useAuth();

  const handleCheckout = async () => {
    if (cart.length === 0 || !user || !token) return;

    const userId = user?._id || user?.id;
    try {
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].quantity;
      }
      const foodOrderItems = cart.map((item) => ({
        food: item.id,
        quantity: item.quantity,
      }));
      const res = await fetch("http://localhost:8000/foodOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          user: userId,
          totalPrice: totalPrice + 5000,
          foodOrderItems: foodOrderItems,
          status: "DELIVERED",
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      if (res.ok) {
        clearCart();
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={`w-full rounded-full h-8 ${
            cart.length === 0
              ? "bg-[#EF4444]/20"
              : "bg-[#EF4444] hover:bg-[#dc2626] cursor-pointer"
          }`}
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          {cart.length === 0 ? "Cart is empty" : "Checkout"}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <p className="py-5 text-center">
            Your order has been successfully placed !
          </p>
          <img src={"success.png"} className="px-40 py-5" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className={"m-auto my-5"}>
            Back to home
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
