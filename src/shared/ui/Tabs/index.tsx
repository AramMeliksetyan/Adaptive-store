import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, SyntheticEvent, ReactNode, Fragment } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Fragment>{children}</Fragment>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface ITabsData {
  index: number;
  children: ReactNode;
  label: string;
}

interface ITabsProps {
  tabsData: ITabsData[];
  centered?: boolean;
  scrollable?: boolean;
  onChange?: (val: number) => void;
  Content?: () => JSX.Element;
}

const BasicTabs = ({
  tabsData,
  centered = true,
  Content,
  scrollable = false,
  onChange,
}: ITabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          {...(scrollable && {
            variant: "scrollable",
            scrollButtons: "auto",
          })}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered={centered}
        >
          {tabsData.map((item) => {
            return (
              <Tab
                key={item.index}
                label={item.label}
                {...a11yProps(item.index)}
              />
            );
          })}
        </Tabs>
        {Content && <Content />}
      </Box>
      {tabsData?.map((item) => {
        return (
          <TabPanel key={item.index} value={value} index={item.index}>
            {item.children}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default BasicTabs;
