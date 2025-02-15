import Bills from "components/bills/bills";
import styles from "./App.module.scss";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Income from "components/income/income";
import Budget from "components/budget/budget";
import Payoff from "components/payoff/payoff";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className={styles.scrollable}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ padding: "0px" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={styles.app}>
        <Box padding={"0"} sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              position: "sticky",
              padding: "0px",
              top: 0,
              zIndex: 1000,
            }}
          >
            <Tabs
              sx={{
                bgcolor: "background.paper",
              }}
              value={value}
              onChange={handleChange}
              aria-label="main tabs"
            >
              <Tab
                sx={{
                  fontFamily: "helvetica",
                  fontWeight: "900",
                }}
                label="Budgets"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  fontFamily: "helvetica",
                  fontWeight: "900",
                }}
                label="Income"
                {...a11yProps(1)}
              />
              <Tab
                data-qa={"budget-tab"}
                sx={{
                  fontFamily: "helvetica",
                  fontWeight: "900",
                }}
                label="Bills"
                {...a11yProps(2)}
              />
              {/* <Tab
                sx={{
                  fontFamily: "helvetica",
                  fontWeight: "900",
                }}
                label="Payoff"
                {...a11yProps(3)}
              /> */}
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Budget />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Income />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <Bills />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Payoff />
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
}

export default App;
