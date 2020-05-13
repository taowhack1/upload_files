import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {  //This can be referred from Material UI API documentation. 
                padding: '100px 100px',
                backgroundColor: "#eaeaea",
            },
        },
    },
}); 