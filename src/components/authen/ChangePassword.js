import React, { useState } from "react";
import { Modal, Typography, Container } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import FolderIcon from "@material-ui/icons/Folder";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./Styles";
import axios from "axios";

export default function AddFolder(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const handleOpen = () => {
        setOpen(true);
        props.closeMenu()
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Typography onClick={handleOpen} color="textPrimary">
                ChangePassword
            </Typography>
            <Modal
                className={classes.modal}
                disableAutoFocus={true}
                outline="none"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.modalPaper}>

                        <Container maxWidth="xs" >
                            <Typography align='center' className={classes.textPass}>เปลี่ยนพาสเวิร์ด</Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='user_name'
                                    placeholder="Current password"
                                    name='user_name'
                                    type="password"
                                    autoComplete='email'
                                    autoFocus
                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    name='user_password'
                                    placeholder="New password"
                                    type='password'
                                    id='user_password'
                                    autoComplete='current-password'

                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />
                                <TextField
                                    variant='outlined'
                                    margin='normal'
                                    required
                                    fullWidth
                                    type="password"
                                    name='user_password'
                                    placeholder="Confirm password"
                                    type='password'
                                    id='user_password'
                                    autoComplete='current-password'

                                    InputProps={{
                                        className: classes.input,
                                    }}
                                />

                                <Button
                                    type='submit'
                                    fontSize="large"
                                    fullWidth
                                    variant='contained'
                                    className={classes.form}
                                    style={{ backgroundColor: "#1976D2", color: "#FFFFF" }}
                                >
                                    <Typography color="inherit"> Submit</Typography>
                                </Button>

                            </form>
                        </Container>
                    </div>
                </Fade>
            </Modal >
        </div >
    );
}
