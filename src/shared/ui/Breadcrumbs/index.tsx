import { Breadcrumbs, Typography, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const SharedBreadcrumbs = () => {
  const { id } = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x && x !== id);

  return (
    <Stack spacing={2}>
      <Breadcrumbs>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography
              color="text.primary"
              key={to}
              sx={{ textTransform: "capitalize" }}
            >
              {value}
            </Typography>
          ) : (
            <Link to={to} key={to}>
              <Typography
                color="text.primary"
                key={to}
                sx={{ textTransform: "capitalize" }}
              >
                {value}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
};

export default SharedBreadcrumbs;
