"use client";
import { DropdownMenuq } from "./dropDawnMenu";
import { DropStatusq } from "./dropStatus";

export const OrderCards = ({
  item,
  index,
  selectedOrders,
  setSelectedOrders,
}) => {
  const checked = selectedOrders.includes(item._id);

  const handleCheck = () => {
    if (checked) {
      setSelectedOrders(selectedOrders.filter((id) => id !== item._id));
    } else {
      setSelectedOrders([...selectedOrders, item._id]);
    }
  };

  return (
    <div
      className={`border-b border-l border-r h-[56px] border-[#d1d1d1] flex items-center justify-around ${
        checked ? "bg-[#F4F4F5]" : "bg-white"
      }`}
      key={index}
    >
      <div className="w-[52px] h-full p-4">
        <input
          checked={checked}
          onChange={handleCheck}
          id="terms"
          type="checkbox"
          className="h-4 w-4 border-[#8d8888] rounded-[2.5px]"
        />
      </div>
      <div className="w-[56px] h-full flex items-center">
        <h3 className="text-[14px]">{index + 1}</h3>
      </div>
      <div className="h-full w-[213px] p-4">
        <p className="text-sm text-gray-600">{item.user?.email}</p>
      </div>
      <div className="h-full">
        <DropdownMenuq item={item} />
      </div>
      <div className="h-full w-60 p-4 ">
        <p className="text-sm text-gray-600">{item.createdAt}</p>
      </div>
      <div className="h-full w-40 p-4">
        <p className="text-sm text-gray-600">{item.totalPrice}₮</p>
      </div>
      <div className="h-full w-1/5 flex items-center p-4">
        <p className="text-[12px] text-gray-600 line-clamp-2">
          {/* {item.user.address} */}СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd
          negdsen em...
        </p>
      </div>
      <div className="h-full w-40 flex items-center px-7">
        <DropStatusq item={item} />
      </div>
    </div>
  );
};
