import {
  Button,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import db from "../firebase";

function getModalStyle() {
  const top = 31;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-50%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(todo.todo);
  const [openAlert, setOpenAlert] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const updateTodo = (e) => {
    e.preventDefault();
    console.log(todo);
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  const handleDisagreeDelete = () => {
    setOpenAlert(false);
  };

  const handleAgreeDelete = () => {
    setOpenAlert(false);
    db.collection("todos").doc(todo.id).delete();
  };

  const deleteTodo = () => {
    setOpenAlert(true);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" align="center">
        Update Todo Item
      </h2>

      <Box display="flex" justifyContent="center">
        <form noValidate autoComplete="off">
          <TextField
            type="text"
            placeholder={todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
        </form>
        <Box ml={2}>
          <Button onClick={updateTodo} variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </div>
  );

  return (
    <>
      <div>
        {
          <ListItem>
            <ListItemText primary={todo.todo} />
            <Box mr={2}>
              <Button
                onClick={deleteTodo}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </Box>

            <Button
              type="button"
              onClick={handleOpen}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
          </ListItem>
        }

        {/* <li>{todo}</li> */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
        <Dialog
          className="deleteDialog"
          open={openAlert}
          onClose={handleCloseAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Todo Item Delete Confirm"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDisagreeDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAgreeDelete}
              color="primary"
              variant="contained"
              color="secondary"
            >
              Yes. Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Todo;
