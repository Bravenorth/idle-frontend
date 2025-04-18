import { useAtomValue } from "jotai";
import { inventoryAtom } from "../../atoms/inventory";
import { getItemById } from "../../constants/items";

import "./Inventory.css";

export default function Inventory() {
  const inventory = useAtomValue(inventoryAtom);

  // Compte les objets par id
  const grouped = inventory.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="inventory-wrapper">
      {Object.entries(grouped).map(([id, count]) => {
        const item = getItemById(id);
        return (
          <div key={id} className="inventory-slot" title={item.name}>
            <span className="inventory-icon">{item.icon}</span>
            <span className="inventory-count">x{count}</span>
          </div>
        );
      })}
    </div>
  );
}
