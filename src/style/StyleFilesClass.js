export default (theme) => ({
  root: {
    margin: theme.spacing(4, 0, 1, 0),
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
  text: {
    fontSize: 20,
    color: "#000000",
  },
  modal: {
    overflowY: "scroll",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalIconAlign: {
    direction: "row",
    alignItems: "center",
    margin: theme.spacing(5, 5, 5, 5),
    ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
      margin: theme.spacing(5, 0, 5, 0),
    }
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

});
