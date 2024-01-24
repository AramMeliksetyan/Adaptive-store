import { Chip, Typography } from "@mui/material";
import { IColumn } from "shared/ui/DataTable/constants";

export const columns: IColumn[] = [
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Description",
    field: "description",
  },
  {
    label: "Position ",
    field: "positionInView",
  },
];
