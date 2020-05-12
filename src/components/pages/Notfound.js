import React from "react"
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import useStyles from '../files/StyleFiles';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Breadcrumbs,
    Typography,
} from '@material-ui/core/';



const Notfound = () => {
    const classes = useStyles()
    return (
        <div className={classes.modal}>
            <Grid container >
                <Grid>
                    <h1>404</h1>
                </Grid>
            </Grid>
            <Grid container >
                <Grid>
                    <h1>404</h1>
                </Grid>
            </Grid>

        </div >
    )
}

export default Notfound