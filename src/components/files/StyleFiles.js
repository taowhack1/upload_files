import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import MuiTableCell from "@material-ui/core/TableCell";
import { createMuiTheme } from '@material-ui/core/styles';
import { yellow, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0, 1, 0),
  },
  paper: {
    width: "90%",
    alignItems: 'center',
    boxShadow: "0 0 0 0",
    color: "white",
    ['@media (max-width:600px)']: {
      width: "100%",
      padding: theme.spacing(0, 0, 0, 0),
    },
  },

  table: {
    width: "100%",
    //padding: theme.spacing(0, 0, 0, 0),
  },
  emptyTable: {
    textAlign: "center",
    color: "#a0a0a0",
  },
  //icon
  iconFolderTable: {
    fontSize: 35,
    color: "#FCD462",
    verticalAlign: "middle",
    marginRight: 8
  },
  iconFilesTable: {
    fontSize: 35,
    color: "#1976D2",
    verticalAlign: "middle",
    marginRight: 8
  },
  iconPersonTable: {
    color: "#FDC8A2",
    fontSize: 35,
    verticalAlign: "middle",
    marginRight: 8
  },
  iconPersonTableUnActive: {
    color: "#DDDBDB",
    fontSize: 35,
    verticalAlign: "middle",
    marginRight: 8
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
    color: "#FFC107",
    marginTop: 3
  },
  iconButton: {
    padding: theme.spacing(0, 0, 0, 0),
  },
  iconSwitch: {
    padding: theme.spacing(10, 0, 10, 0),
  },
  iconCheckBox: {
    margin: theme.spacing(0, 0, 0, 0),
    padding: theme.spacing(0, 0, 0, 1)
  },
  NavigateNextIcon: {
    fontSize: 20,
  },
  breadcrumbs: {
    margin: theme.spacing(2, 0, 2, 0),
    ['@media (max-width:600px)']: {
      margin: theme.spacing(2, 0, 2, 2),
    },
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
  textDate: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.7,
    ['@media (max-width:321px)']: { // eslint-disable-line no-useless-computed-key
      fontSize: 11,
    },
  },

  menu: {
    display: "flex",
    width: 250,
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: 300,
    },
  },
  menuItem: {
    margin: theme.spacing(0, 0, 0, -2),
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      padding: theme.spacing(0, 0, 0, 0),
    },
  },
  tableMargin: {
    margin: theme.spacing(-1, 0, -1, 0),
  },

  opacity: {
    color: "#000000",
    fontSize: 16,
    opacity: 0.7,
  },
  tableCellName: {
    width: "50%",
    textAlign: "center",
  },
  tablePadding: {
    padingTop: -100
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
    ['@media (max-width:600px)']: {
      bottom: theme.spacing(4),
      right: theme.spacing(4),
      height: 80,
      width: 80,
    },
  },
  icon: {
    fontSize: 50,
    ['@media (max-width:600px)']: {
      fontSize: 40,
    },
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
    ['@media (max-width:730px)']: { // eslint-disable-line no-useless-computed-key
      width: 400
    },
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      width: 260,
    },
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      width: 240
    },
    ['@media (max-width:350px)']: { // eslint-disable-line no-useless-computed-key
      width: 230
    },
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
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      display: "flex",
    },
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
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      height: 150,
    },
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
    color: "red",
    margin: theme.spacing(0, 0, 0, 2),
  },
  errorTextRegistor: {
    fontSize: 13,
    color: "red",
    margin: theme.spacing(1, 0, 0, 2),
  },
  AppBar: {
    backgroundColor: '#1976D2',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 20,
    marginRight: 30,
    ['@media (max-width:1050px)']: { // eslint-disable-line no-useless-computed-key
      marginRight: 20,
    },
  },
  filetype: {
    width: 30,
    verticalAlign: 'middle',
    marginRight: 8,
    marginTop: 2
  },
  filetypeUpload: {
    width: 35,
    verticalAlign: 'middle'
  },
  nowrapText: {
    fontSize: 16,
    width: 400,
    color: "#000000",
    ['@media (max-width:1083px)']: {
      width: 350,
    },
    ['@media (max-width:600px)']: {
      width: 200,
    },
    ['@media (max-width:400px)']: {
      width: 140,
    },
    ['@media (max-width:321px)']: { // eslint-disable-line no-useless-computed-key
      width: 100,
    },
  },
  nowrap: {
    width: 410,
    whiteSpace: "nowrap",
    ['@media (max-width:1083px)']: {
      width: 360,
    },
    ['@media (max-width:600px)']: {
      width: 210,
    },
    ['@media (max-width:400px)']: {
      width: 150,
    },
    ['@media (max-width:321px)']: { // eslint-disable-line no-useless-computed-key
      width: 110,
    },
  },
  nowrapTextMany: {
    fontSize: 16,
    width: 400,
    color: "#000000",
    ['@media (max-width:1083px)']: {
      width: 350,
    },
    ['@media (max-width:650px)']: {
      width: 200,
    },
    ['@media (max-width:450px)']: {
      width: 140,
    },
    ['@media (max-width:321px)']: { // eslint-disable-line no-useless-computed-key
      width: 90,
    },
  },
  nowrapMany: {
    width: 410,
    whiteSpace: "nowrap",
    ['@media (max-width:1083px)']: {
      width: 360,
    },
    ['@media (max-width:650px)']: {
      width: 210,
    },
    ['@media (max-width:450px)']: {
      width: 150,
    },
    ['@media (max-width:371px)']: { // eslint-disable-line no-useless-computed-key
      width: 100,
    },
  },

  formStyle: {
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    ['@media (max-width:600px)']: {
      marginRight: -20,
      marginLeft: -20,
    },
  },


  input: {
    "&::placeholder": {
      fontSize: 16,
    },
  },
}));


export default useStyles;
