import React,{useState} from "react";
import "./upload_style.css";
import "./style.css";
import { Modal, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import FolderIcon from "@material-ui/icons/Folder";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./StyleFiles";
import axios from "axios";

export default function AddFolder() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const handleAddFolderOpen = () => {
    setOpen(true);
  };

  const handleAddFolderClose = () => {
    setOpen(false);
  };
  const handleChangeFolderName = (e) => {
    setFolderName(e.target.value.trim());
  };
  const handleCreateFolder = () => {
    const folder_name = folderName;
    if (folder_name) {
      axios.post("http://192.168.5.230:8080/upload/folder",{folder_name}).then((res) => {
          if (res.data.folder_name) {
            alert(`สร้างโฟลเดอร์ ${res.data.folder_name} เรียบร้อยแล้ว`);
            handleAddFolderClose();
          } else {
            alert(`เกิดข้อผิดพลาด`);
          }
      });
    } else {
      alert("กรุณาระบุชื่อโฟลเดอร์ที่ต้องการสร้าง");
    }
  };
  return (
    <div>
      <Tooltip
        onClick={handleAddFolderOpen}
        title="เพิ่มโฟลเดอร์"
        aria-label="add"
      >
        <Fab color="primary" className={classes.absolute}>
          <AddIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Modal
        className={classes.modal}
        disableAutoFocus={true}
        outline="none"
        open={open}
        onClose={handleAddFolderClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.modalPaper}>
            <div className={classes.root}>
              <Typography className={classes.text} color="textPrimary">
                สร้างโฟลเดอร์
              </Typography>
              <div className={classes.modalIconAlign}>
                <Grid container className={classes.iconAlign}>
                  <Grid item xs>
                    {" "}
                  </Grid>
                  <Grid item sm={1}>
                    <FolderIcon className={classes.iconFolder} />
                  </Grid>
                  <Grid item> </Grid>
                  <Grid item xs={7}>
                    <TextField
                      placeholder="ชื่อโฟลเดอร์"
                      type="search"
                      variant="outlined"
                      className={classes.textField}
                      onChange={handleChangeFolderName}
                      value={folderName}
                      InputProps={{
                        classes: { input: classes.input },
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    {" "}
                  </Grid>
                </Grid>
              </div>
            </div>

            <div className={classes.modalBtn}>
              <Button variant="contained" className={classes.modalbtnOk}>
                <Typography
                  className={classes.text}
                  color="textPrimary"
                  elevation={0}
                  onClick={handleCreateFolder}
                >
                  OK
                </Typography>
              </Button>
              <Button color="primary" className={classes.modalbtnCancel}>
                <Typography
                  className={classes.text}
                  color="textPrimary"
                  onClick={handleAddFolderClose}
                >
                  Cancel
                </Typography>
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
