import { Chip } from "@mui/material";
import { IColumn } from "shared/ui/DataTable/constants";
import { ICompany } from "store/interfaces/company";

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
    label: "State",
    field: "isEnabled",
    layout: (row: ICompany) => {
      if (row.isEnabled) {
        return <Chip label="Enabled" color="success" variant="outlined" />;
      } else {
        return <Chip label="Disabled" color="error" variant="outlined" />;
      }
    },
  },
  {
    label: "Position ",
    field: "positionInView",
  },
];
