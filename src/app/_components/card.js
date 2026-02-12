import { XIcon } from "../icons/xIcon";
import { useCartStore } from "../_context/foodCartStore";
import { RedFoodIcon } from "../icons/redFoodIcon";
import { OrderSuccess } from "./orderSucces";

export function Card() {
  const { cart, removeFromCart, increase, decrease, clearCart } =
    useCartStore();
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return (
    <>
      <div className="w-full h-7/10 rounded-xl bg-white p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold text-[#71717A]">My cart</p>
          <div className="flex flex-col overflow-scroll h-120 gap5">
            {cart.map((item, index) => (
              <div
                className="flex justify-between border-b border-dashed py-6"
                key={index}
              >
                <img
                  src={item.Image}
                  className="w-30 h-30 object-cover rounded-xl"
                />
                <div className="flex flex-col justify-between">
                  <div className="w-full flex gap-15">
                    <div className="text-black w-60">
                      <p className="text-[#EF4444] font-bold">{item.name}</p>
                      <p className="text-xs">{item.ingredients}</p>
                    </div>
                    <button
                      className="rounded-full border border-[#EF4444] flex justify-center items-center w-9 h-9"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <XIcon />
                    </button>
                  </div>
                  <div className="flex justify-between w-full text-black">
                    <div className="flex gap-2">
                      <button onClick={() => decrease(item.id)}>-</button>
                      <p className="w-6 text-lg font-semibold">
                        {item.quantity}
                      </p>
                      <button onClick={() => increase(item.id)}>+</button>
                    </div>
                    <p className="font-bold">{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
            {cart.length === 0 && (
              <div className="h-46 w-full bg-[#F4F4F5] rounded-md px-12 py-8 flex flex-col justify-between items-center text-black">
                <RedFoodIcon />
                <p className="font-bold">Your cart is empthy </p>
                <p className="text-[#71717A] text-xs text-center">
                  Hungry? 🍔 Add some delicious dishes to your cart and satisfy
                  your cravings!
                </p>
              </div>
            )}
          </div>
        </div>
        {cart.length !== 0 && (
          <div className="h-30 flex flex-col gap-4">
            <p className="text-[#71717A] font-semibold">Delivery location</p>
            <textarea
              className="border h-full w-full text-sm text-black rounded-md p-2"
              placeholder="
            Sukhbaatar District, Gurvan gol office, 4th floor, Pinecone academy"
            />
          </div>
        )}
      </div>
      <div className="w-full h-3/10 rounded-xl bg-white flex flex-col justify-between p-4">
        <p className="text-[#71717A] font-semibold">Payment info</p>
        <div className="flex justify-between">
          <p className="text-[#71717A]">Items </p>
          <p className="font-bold text-black">
            {cart.length === 0 ? "-" : totalPrice}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#71717A]">Shipping </p>
          <p className="font-bold text-black">
            {cart.length === 0 ? "-" : 5000}
          </p>
        </div>
        <div className="border-t border-dashed border-[#d1d1d1] flex justify-between pt-5">
          <p className="text-[#71717A]">Total </p>
          <p className="font-bold text-black">
            {cart.length === 0 ? "-" : totalPrice + 5000}
          </p>
        </div>
        <OrderSuccess cart={cart} clearCart={clearCart} />
      </div>
    </>
  );
}
