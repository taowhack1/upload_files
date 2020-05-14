import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  modalPaper: {
    width: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: 4,
    outline: "none",
    padding: theme.spacing(1, 5, 4),
  },
  form: {
    width: '100%',
    margin: theme.spacing(3, 0, 0),
    padding: theme.spacing(1, 0, 1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background: {
    marginTop: -80,
    backgroundColor: "#1976D2",
    height: '100vh',
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      height: '130vh',
    },
  },
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
    padding: theme.spacing(5, 5, 5, 5)
  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  textPass: {
    fontSize: 25,
  },
  textColor: {
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: 'white'
  }
}));

export default useStyles;
