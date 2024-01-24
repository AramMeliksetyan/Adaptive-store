import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { defaultFilterValues } from "resources/constants";
import { EMainRoutes } from "routes/constants";
import AccountMenu from "shared/components/AccountMenu";
import { useAsyncDispatch } from "shared/helpers/hooks/useAsyncDispatch";
import { DynamicObject } from "shared/helpers/hooks/useFetchQuery";
import { ELocalStorage } from "store/config/constants";
import { ITabs } from "store/interfaces/common";
import { getTabs, selectTabsData } from "store/slicers/common";
import { sidebarRoutesData } from "./constants";

export const drawerWidth = 240;

const DashboardLayout = () => {
  const navigate = useNavigate();

  const dispatch = useAsyncDispatch();
  const tabsData = useSelector(selectTabsData);

  const goToPage = (item: ITabs, hasTabId: boolean) => () => {
    if (hasTabId) {
      localStorage.setItem(ELocalStorage.tabId, String(item.id));
    }
    const path = `/${EMainRoutes.DASHBOARD}${item.url}`;
    let requestParams: string = new URLSearchParams({
      ...(defaultFilterValues as DynamicObject),
    }).toString();
    navigate({
      pathname: path,
      search: requestParams,
    });
  };

  const init = useCallback(() => {
    Promise.all([dispatch(getTabs())]);
  }, [dispatch]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        sx={{
          minWidth: drawerWidth,
          flexShrink: 0,
          flex: 1,
          "& .MuiPaper-root": {
            minWidth: drawerWidth,
          },
        }}
        variant="permanent"
      >
        <Toolbar
          sx={{
            height: "60px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            "& img": {
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            },
          }}
        >
          {/* <img src={Logo} alt="logo" /> */}
        </Toolbar>
        <List>
          {tabsData.map((item) => {
            const isActive = location.pathname.includes(item.url);
            return (
              <ListItem
                onClick={goToPage(item, true)}
                key={item.id}
                sx={{
                  padding: "0px",
                  borderRight: isActive ? "3px solid " : "none",
                  borderColor: "primary.main",
                }}
              >
                <ListItemButton sx={{ display: "flex", gap: 2 }}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
          {sidebarRoutesData.map((item) => {
            const isActive = location.pathname.includes(item.url);
            return (
              <ListItem
                onClick={goToPage(item, false)}
                key={item.id}
                sx={{
                  padding: "0px",
                  borderRight: isActive ? "3px solid " : "none",
                  borderColor: "primary.main",
                }}
              >
                <ListItemButton sx={{ display: "flex", gap: 2 }}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flex: 12 }}>
        <Box
          sx={(theme) => ({
            position: "fixed",
            width: `calc(100vw - ${drawerWidth}px) `,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "primary.main",
          })}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap color="white">
              Your App Title
            </Typography>
            <AccountMenu />
          </Toolbar>
        </Box>
        <Box
          sx={{
            padding: 3,
            width: `calc(100vw - ${drawerWidth}px)`,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
