import React, { useState } from 'react';
import useStyles from './StyleFiles';
import { deleteFolder } from '../../actions/folderActions';
import { useDispatch } from 'react-redux';
import { Switch } from '@material-ui/core/';
import { Checkbox, TableCell } from '@material-ui/core/';
const MenuUserCheckUpload = (props) => {
  const { userData, folderData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [check, setCheck] = useState({
    checkedA: folderData.access_download,
    checkedB: folderData.access_upload,
  });
  console.log(userData);
  const [folder, setFolder] = useState({
    user_id: parseInt(userData),
    folder_id: folderData.folder_id,
    access_download: folderData.access_download,
    access_upload: folderData.access_upload,
  });
  const { access_download, access_upload } = folder;
  console.log(folder);

  const [selected, setSelected] = useState([]);
  const [index, setIndex] = useState([]);

  const [checked, setChecked] = useState({
    access_download: folderData.access_download,
  });
  const handleChange = (event) => {
    setChecked({ access_download: event.target.checked });
  };

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
          checked={checked.access_download}
          onChange={handleChange}
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
          checked={access_upload}
          //onChange={handleChange}
          inputProps={{ 'aria-label': 'Allow Upload' }}
        />
      </TableCell>
    </>
  );
};
export default MenuUserCheckUpload;
