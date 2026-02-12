export function AddOrderFood({ item }) {
  return (
    <div
      className="flex justify-between border-b border-dashed py-6"
      key={item.id}
    >
      <img
        src="/admin/zurg.png"
        className="w-30 h-30 object-cover rounded-xl"
      />
      <div className="flex flex-col justify-between">
        <div className="w-full flex gap-15">
          <div className="text-black w-60">
            <p className="text-[#EF4444] font-bold">{item.name}</p>
            <p className="text-xs">
              Fluffy pancakes stacked with fruits, cream, syrup, and powdered
              sugar.
            </p>
          </div>
          <button
            className="rounded-full border border-[#EF4444] flex justify-center items-center w-9 h-9"
            onClick={() => setDeletedItems()}
          >
            <XIcon />
          </button>
        </div>
        <div className="flex justify-between w-full text-black">
          <div className="flex gap-2">
            <button onClick={minus}>-</button>
            <p className="w-6 text-lg font-semibold">{item.quantity}</p>
            <button onClick={plus}>+</button>
          </div>
          <p className="font-bold">{item.price * item.quantity}</p>
        </div>
      </div>
    </div>
  );
}
