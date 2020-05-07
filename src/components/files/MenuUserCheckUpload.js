import React, { useState } from 'react';
import useStyles from './StyleFiles';
import { deleteFolder } from '../../actions/folderActions';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { Checkbox, TableCell } from '@material-ui/core/';
const MenuUserCheckUpload = (props) => {
  const { folderData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [check, setCheck] = useState({
    checkedA: folderData.access_download,
    checkedB: folderData.access_upload,
  });

  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState([]);

  const handleSelectClick = (event, id, name) => {
    const selectedIndex = index.indexOf(id);
    console.log(selectedIndex);
    let newSelected = [];
    let selectIndex = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, {
        folder_name: name,
        folder_id: id,
        check_status: event.target.checked,
      });
      selectIndex = selectIndex.concat(index, id);
    } else if (selectedIndex === 0) {
      selectIndex = selectIndex.concat(index.slice(1));
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      selectIndex = selectIndex.concat(index.slice(0, -1));
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      selectIndex = selectIndex.concat(
        index.slice(0, selectedIndex),
        index.slice(selectedIndex + 1)
      );
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setIndex(selectIndex);
    setSelected(newSelected);
    console.log(selected);
  };

  return (
    <>
      <TableCell key={folderData.folder_id} align='center'>
        <Checkbox
          //name='checkedA'
          className={classes.tableMargin}
          //checked={check.checkedA}
          //onChange={handleChange}
          onClick={(event) =>
            handleSelectClick(
              event,
              folderData.folder_id,
              folderData.folder_name
            )
          }
          inputProps={{ 'aria-label': 'Allow Download' }}
        />
      </TableCell>
      <TableCell align='center'>
        <Checkbox
          //name='checkedB'
          className={classes.tableMargin}
          //={check.checkedB}
          //onChange={handleChange}
          inputProps={{ 'aria-label': 'Allow Upload' }}
        />
      </TableCell>
    </>
  );
};
export default MenuUserCheckUpload;
