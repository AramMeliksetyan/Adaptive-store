import { ERoutes } from "routes/constants";
import { ITabs } from "store/interfaces/common";

export const sidebarRoutesData: ITabs[] = [
  {
    id: 11,
    name: "Companies",
    url: `/${ERoutes.COMPANIES}`,
    isEnabled: true,
    order: 5,
  },
  {
    id: 12,
    name: "Orders",
    url: `/${ERoutes.ORDERS}`,
    isEnabled: true,
    order: 6,
  },
];
