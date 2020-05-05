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
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  background: {
    marginTop: -80,
    backgroundColor: "#1976D2",
    height: '100vh'
  },
  text: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: 'white'
  }
}));

export default useStyles;
