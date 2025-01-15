import { Fab, List, ListItem, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import styles from "./budget-transaction-group.module.scss";
import { BudgetModel } from "./budget-model";
import { TransactionLine } from "./transaction-line";
import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/joy";

type InputRowProps = {
  index: number;
  column: BudgetModel;
  editRow: (name: string) => void;
};

const BudgetTransactionGroup = (props: InputRowProps): JSX.Element => {
  const { index, editRow, column } = props;

  const [editableTransactions, setEditableTransactions] = useState<TransactionLine[]>([]);

  const addTransaction = () => {
    setEditableTransactions([...editableTransactions, { name: "" } as TransactionLine]);
  };

  const rowAmountOnChange = (name: string, index: number) => {
    const updatedColumns = editableTransactions
      ? editableTransactions.map((column, i) => (i === index ? { ...column, name: name } : column))
      : [{ name: name } as TransactionLine];

    setEditableTransactions(updatedColumns);
  };
  return (
    <Accordion>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          borderBottom: "1px solid rgba(0, 0, 0, .125)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className={styles.accordionHeader}>
          <Typography component="span">{column.billName}</Typography>
          {editableTransactions && editableTransactions.length > 0 && (
            <div className={styles.addHeader}>
              <div className={styles.addHeaderWithin}>
                <Fab
                  onClick={(e) => {
                    e.stopPropagation();
                    addTransaction();
                  }}
                  size="small"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>
            </div>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0" }}>
        {(!editableTransactions || editableTransactions.length < 1) && (
          <div className={styles.accordionDetails}>
            <Fab onClick={() => addTransaction()} size="small" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        )}
        {editableTransactions && editableTransactions.length > 0 && (
          <List dense={true}>
            {editableTransactions &&
              editableTransactions.map((column, index) => (
                <ListItem sx={{ width: "100%" }} key={index}>
                  <div className={styles.listMainDisplay}>
                    <div className={styles.listHeaders}>
                      <Typography level={"body-md"}>Transaction Name</Typography>
                      <Typography level={"body-md"}>Amount</Typography>
                    </div>
                    <div className={styles.listInnerDisplay}>
                      <TextField
                        value={column.name}
                        onChange={(e) => {
                          rowAmountOnChange(e.target.value, index);
                        }}
                        id="standard-basic"
                        type="string"
                        variant="outlined"
                        size="small"
                        placeholder="Txn Name"
                      />
                      <TextField
                        sx={{ marginLeft: "10px" }}
                        value={column.amount}
                        onChange={(e) => {
                          rowAmountOnChange(e.target.value, index);
                        }}
                        id="standard-basic"
                        type="number"
                        variant="outlined"
                        size="small"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <DeleteIcon sx={{ verticalAlign: "middle", marginLeft: "5%" }} />
                </ListItem>
              ))}
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default BudgetTransactionGroup;
