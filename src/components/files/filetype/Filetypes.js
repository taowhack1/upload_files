import React, { useState, useEffect } from 'react'
import Document from "./document.svg";
import JPG from './jpg.svg';
import Option from './options.svg';
import PDF from './pdf.svg'
import PNG from './png.svg';
import PowerPoint from './powerpoint.svg';
import TXT from './txt.svg';
import ZIP from './zip.svg';
import xlxs from './xls.svg'
import useStyles from "../StyleFiles";

const Filetypes = (props) => {
    const classes = useStyles();
    const { filename } = props.typefile

    const [type, setType] = useState('')

    // const keepFiles = () => {
    //     let file = [] 
    //     file = file.concat(filetype, typefile)
    //     setFiletype(file)
    // }
    useEffect(() => {
        if (props.typefile.indexOf('.')) {
            //console.log(props.typefile.length)
            const type = props.typefile.split(".").pop()
            setType(type)
        }
    })
    return (
        <div>
            <div className={
                props.checktype != null
                    ? classes.filetypeUpload
                    : classes.filetype
            }>
                {type == "docx" &&
                    <img src={Document} />
                }
                {type == "xlsx" &&
                    <img src={xlxs} />
                }
                {type == "pptx" &&
                    <img src={PowerPoint} />
                }
                {type == "pdf" &&
                    <img src={PDF} />
                }
                {type == "png" &&
                    <img src={PNG} />
                    //<img src={props.src} />
                }
                {type == "jpg" &&
                    <img src={JPG} />
                    //<img src={props.src} />
                }
                {type == "txt" &&
                    <img src={TXT} />
                }
                {type == "zip" &&
                    <img src={ZIP} />
                }
                {type != "docx" && type != "xlsx" && type != "pptx" && type != "pdf" && type != "png" && type != "jpg" && type != "txt" && type != "zip" &&
                    <img src={Option} />
                }
            </div>


        </div>
    )
}

export default Filetypes;