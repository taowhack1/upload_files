import React from "react"
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import useStyles from '../files/StyleFiles';
import { useDispatch, useSelector } from 'react-redux';
import './Notfound'
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

    const { authenticated, authdata } = useSelector((state) => state.auth);

    return (
        <div className={classes.modal}>
            <div>
                <div>
                    <Typography variant="h1">404</Typography>
                </div>
                <h2>อ๊ะ! ไม่พบหน้านี้</h2>
                <p>ขออภัยไม่มีหน้าที่ลบอยู่หน้าถูกลบไปแล้ว เปลี่ยนชื่อหรือไม่สามารถใช้งานได้ชั่วคราว</p>
                {authenticated &&
                    <div>
                        {authdata.authorized_id == 1
                            ?
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={'/'}
                            >
                                กลับไปหน้าหลัก
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={'/viewfolderadmin'}
                            >
                                กลับไปหน้าหลัก
                            </Button>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Notfound