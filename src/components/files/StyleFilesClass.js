export default theme => ({
    root: {
        margin: theme.spacing(4, 0, 1, 0),
    },
    absolute: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(8),
        height: 100,
        width: 100,
        backgroundColor: "#1976D2",
    },
    icon: {
        fontSize: 50,
    },
    text: {
        fontSize: 20,
        color: '#000000',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalIconAlign: {
        direction: "row",
        alignItems: 'center',
        margin: theme.spacing(5, 10, 5, 10),
    },
    modalPaper: {
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        borderRadius: 4,
        outline: 'none',
        padding: theme.spacing(1, 5, 4),
    },
});