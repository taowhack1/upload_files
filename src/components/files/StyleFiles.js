import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import { yellow, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0, 1, 0),
  },
  paper: {
    width: "90%",
    boxShadow: "0 0 0 0",
    color: "white",
  },
  table: {
    width: "100%",
    height: "150",
  },
  //icon
  iconFolderTable: {
    fontSize: 40,
    color: "#FCD462",
    verticalAlign: "middle",
  },
  iconFilesTable: {
    fontSize: 40,
    color: "#1976D2",
    verticalAlign: "middle",
  },
  iconPersonTable: {
    color: "#FDC8A2",
    fontSize: 40,
    verticalAlign: "middle",
  },
  iconPersonTableUnActive: {
    color: "#DDDBDB",
    fontSize: 40,
    verticalAlign: "middle",
  },
  iconFolder: {
    fontSize: 40,
    color: "#FCD462",
    verticalAlign: "middle",
    margin: theme.spacing(0, 0, 0, -2),
  },
  iconFiles: {
    fontSize: 40,
    color: "#1976D2",
    verticalAlign: "middle",
    margin: theme.spacing(0, 0, 0, -2),
  },
  iconPerson: {
    margin: theme.spacing(0, 0, 0, -2),
    color: "#FDC8A2",
    fontSize: 40,
    verticalAlign: "middle",
  },
  iconCheck: {
    margin: theme.spacing(0.5, 0, 0, -1),
    fontSize: 40,
  },
  iconStar: {
    color: '#FFC107',
  },
  NavigateNextIcon: {
    fontSize: 20,
  },
  breadcrumbs: {
    margin: theme.spacing(2, 0, 2, 0),
  },
  text: {
    fontSize: 20,
    color: "#000000",
  },

  menu: {
    display: "flex",
    width: 250,
  },
  menuItem: {
    margin: theme.spacing(0, 0, 0, -2),
  },
  tableMargin: {
    margin: theme.spacing(-1, 0, -1, 0),
  },

  opacity: {
    color: "#000000",
    fontSize: 20,
    opacity: 0.7,
  },
  tableCellName: {
    width: "50%",
    textAlign: "center",
  },
  gridContainer: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconAlign: {
    direction: "row",
    alignItems: "center",
    padding: theme.spacing(0, 0, 0, 0),
    margin: theme.spacing(-0.5, 0, -0.5, 0),
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(8),
    height: 100,
    width: 100,
    backgroundColor: "#1976D2",
  },
  icon: {
    fontSize: 50,
  },
  grid: {
    marginTop: 25,
  },
  textField: {
    width: "100%",
    backgroundColor: grey[300],
    outline: "none",
  },

  //modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: 4,
    outline: "none",
    padding: theme.spacing(1, 5, 4),
  },
  modalIconAlign: {
    direction: "row",
    alignItems: "center",
    margin: theme.spacing(3, 0, 0, 0),
  },

  modalBtn: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },

  modalBtnUpload: {
    "& > *": {
      margin: theme.spacing(1),
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(-5),
  },
  modalbtnOk: {
    padding: theme.spacing(1, 7, 1),
  },
  modalbtnDownload: {
    padding: theme.spacing(1, 2, 1),
  },
  modalbtnCancel: {
    padding: theme.spacing(1, 4.5, 1),
  },
  modalbtnDel: {
    padding: theme.spacing(1, 4.5, 1),
  },
  modalbtnSave: {
    padding: theme.spacing(1, 6, 1),
  },

  upload: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  uploadFilesDropArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadFilesDropAreaHighlight: {
    backgroundColor: "#1976D2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadPreview: {
    overflowY: "auto",
    height: 200,
    marginTop: 20,
  },
  uploadPreviewDisable: {
    overflowY: "auto",
    marginTop: 20,
  },
  uploadPreviewList: {
    alignItems: "center",
  },
  uploadPreviewListIcon: {
    margin: theme.spacing(0, 3, 0, 1),
    fontSize: "20px",
    alignItems: "center",
    padding: 8,
    color: "#707070",
    cursor: "pointer",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
    zIndex: 999,
  },

  uploadPreviewListName: {
    fontFamily: "Sarabun",
    margin: theme.spacing(-1, 3, -1, 3),
    alignItems: "center",
    width: 270,
    fontSize: 20,
  },
  uploadPreviewCard: {
    margin: theme.spacing(1, 2, 1, 2),
    padding: theme.spacing(-1, 0, -1, 0),
  },
  uploadPreviewBox: {
    width: 300,
    whiteSpace: "nowrap",
  },

  loading: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30,
  },
  removeBorder: {
    borderBottom: "0px",
  },
  errorText: {
    fontSize: 13,
    color: 'red',
    margin: theme.spacing(0, 0, 0, 2),
  },
  errorTextRegistor: {
    fontSize: 13,
    color: 'red',
    margin: theme.spacing(1, 0, 0, 2),
  },

  input: {
    "&::placeholder": {
      fontSize: 20,
    },
  },
}));

export default useStyles;
