"use client";
import { DialogDemo, UserRoleToggle, DeleteProductAlert } from "@/components";
import { useInventory } from "@/hooks";
import { UserRole } from "@/types";
import { useState } from "react";
import { FaShapes } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import {
  MdCurrencyExchange,
  MdLogout,
  MdRemoveShoppingCart,
  MdShoppingCart,
} from "react-icons/md";

type StatsCardProps = {
  label: string;
  value: number | string;
  icon: React.ReactNode;
};

const StatsCard = ({ label, value, icon }: StatsCardProps) => {
  return (
    <div className="flex bg-[#233325] p-4 shadow rounded-md gap-4">
      {icon}
      <div className="flex flex-col gap-2 pt-1">
        <p className="text-sm">{label}</p>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.ADMIN);
  const isUser = currentRole === UserRole.USER;

  const {
    state: { inventory, stats },
    dispatch,
  } = useInventory();

  return (
    <div className="flex flex-col p-4 gap-8">
      <div className="flex justify-end items-center gap-8">
        <UserRoleToggle currentRole={currentRole} changeRole={setCurrentRole} />
        <MdLogout size={24} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          label="Total products"
          value={stats.totalProducts}
          icon={<MdShoppingCart size={32} />}
        />
        <StatsCard
          label="Total store value"
          value={`$${stats.totalStoreValue}`}
          icon={<MdCurrencyExchange size={32} />}
        />
        <StatsCard
          label="Out of stocks"
          value={stats.outOfStocks}
          icon={<MdRemoveShoppingCart size={32} />}
        />
        <StatsCard
          label="No of categories"
          value={stats.numberOfCategories}
          icon={<FaShapes size={32} />}
        />
      </div>
      <div className="rounded-lg border border-neutral-700">
        <table className="bg-[#212124] rounded-lg table-auto divide-y divide-gray-200 dark:divide-neutral-700 w-full text-start">
          <thead>
            <tr>
              {["Name", "Category", "Price", "Quantity", "Value", "Action"].map(
                (label, index) => (
                  <th key={index} className="text-start px-3 py-6 font-medium">
                    <span className="bg-[#161718] text-[#C8DC65] px-6 py-3 rounded-lg">
                      {label}
                    </span>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {inventory.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-6">{product.name}</td>
                <td className="px-6 py-6">{product.category}</td>
                <td className="px-6 py-6">{product.price}</td>
                <td className="px-6 py-6">{product.quantity}</td>
                <td className="px-6 py-6">{product.value}</td>
                <td className="px-6 py-6 flex gap-2">
                  <DialogDemo
                    isDisabled={isUser || !!product.disabled}
                    item={product}
                    editItem={(item) =>
                      dispatch({
                        index,
                        type: "EDIT_ITEM",
                        payload: {
                          ...item,
                        },
                      })
                    }
                  />
                  <button
                    disabled={isUser}
                    className={isUser ? "cursor-not-allowed" : ""}
                    onClick={() =>
                      dispatch({
                        index,
                        type: "TOGGLE_DISABLE_ITEM",
                      })
                    }
                  >
                    <IoMdEye size={20} color={isUser ? "gray" : "purple"} />
                  </button>
                  <DeleteProductAlert
                    isDisabled={isUser}
                    deleteProduct={() =>
                      dispatch({ type: "DELETE_ITEM", index })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
