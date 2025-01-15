import { useReducer, useEffect } from "react";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InventoryItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  value: z.string(),
  quantity: z.number(),
  price: z.string(),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema> & {
  disabled?: boolean;
};

type InventoryStats = {
  totalProducts: number;
  totalStoreValue: number;
  outOfStocks: number;
  numberOfCategories: number;
};

type InventoryState = {
  inventory: InventoryItem[];
  stats: InventoryStats;
};

type InventoryAction =
  | { type: "SET_INVENTORY"; payload: InventoryItem[] }
  | { type: "EDIT_ITEM"; index: number; payload: InventoryItem }
  | { type: "TOGGLE_DISABLE_ITEM"; index: number }
  | { type: "DELETE_ITEM"; index: number }
  | { type: "UPDATE_STATS" };

const calculateStats = (items: InventoryItem[]) => {
  items = items.filter((item) => !item.disabled);

  const totalProducts = items.length;
  const totalStoreValue = items.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );
  const outOfStocks = items.filter((item) => item.quantity === 0).length;
  const numberOfCategories = new Set(items.map((item) => item.category)).size;

  return { totalProducts, totalStoreValue, outOfStocks, numberOfCategories };
};

const inventoryReducer = (state: InventoryState, action: InventoryAction) => {
  switch (action.type) {
    case "SET_INVENTORY":
      return {
        ...state,
        inventory: action.payload,
        stats: calculateStats(action.payload),
      };
    case "EDIT_ITEM":
      const updatedItems = state.inventory.map((item, idx) =>
        idx === action.index ? { ...item, ...action.payload } : item
      );
      return {
        ...state,
        inventory: updatedItems,
        stats: calculateStats(updatedItems),
      };
    case "TOGGLE_DISABLE_ITEM":
      const disabledItems = state.inventory.map((item, idx) =>
        idx === action.index
          ? { ...item, disabled: item.disabled ? false : true }
          : item
      );
      return {
        ...state,
        inventory: disabledItems,
        stats: calculateStats(disabledItems),
      };
    case "DELETE_ITEM":
      const filteredItems = state.inventory.filter(
        (_, idx) => idx !== action.index
      );
      return {
        ...state,
        inventory: filteredItems,
        stats: calculateStats(filteredItems),
      };
    case "UPDATE_STATS":
      return {
        ...state,
        ...calculateStats(state.inventory),
      };
    default:
      return state;
  }
};

export function useInventory(initialInventory: InventoryItem[] = []) {
  const initialStats = calculateStats(initialInventory);

  const initialState: InventoryState = {
    inventory: initialInventory,
    stats: initialStats,
  };

  const [state, dispatch] = useReducer(inventoryReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetch(
      //     "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      //   );
      //   const data: InventoryItem[] = InventoryItemSchema.array().parse(
      //     await response.json()
      //   );

      dispatch({
        type: "SET_INVENTORY",
        payload: [
          {
            name: "Bluetooth",
            category: "Electronic",
            value: "$150",
            quantity: 5,
            price: "$30",
          },
          {
            name: "Edifier M43560",
            category: "Electronic",
            value: "0",
            quantity: 0,
            price: "$0",
          },
          {
            name: "Sony 4k ultra 55 inch TV",
            category: "Electronic",
            value: "$1190",
            quantity: 17,
            price: "$70",
          },
          {
            name: "Samsumg 55 inch TV",
            category: "Electronic",
            value: "$600",
            quantity: 50,
            price: "$12",
          },
          {
            name: "samsumg S34 Ultra",
            category: "phone",
            value: "$0",
            quantity: 0,
            price: "$0",
          },
        ],
      });
    };

    fetchData();
  }, []);

  return {
    state,
    dispatch,
  };
}
