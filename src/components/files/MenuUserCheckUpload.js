import React, { useState } from 'react';
import useStyles from './StyleFiles';
import { useDispatch } from 'react-redux';
import { Checkbox, TableCell } from '@material-ui/core/';
import { updateAccessFolder } from '../../actions/authActions';
const MenuUserCheckUpload = (props) => {
  const { userData, folderData } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  let click = '';
  const [folder, setFolder] = useState({
    user_id: parseInt(userData),
    folder_id: folderData.folder_id,
    access_download: folderData.access_download,
    access_upload: folderData.access_upload,
  });

  const [switchstatus, setSwitchstatus] = useState({
    checkedDownload: folderData.access_download,
    checkedUpload: folderData.access_upload,
  });

  const { user_id, folder_id, access_download, access_upload } = folder;
  const { checkedDownload, checkedUpload } = switchstatus;
  const handleChange = (event) => {
    setSwitchstatus({ access_download: event.target.checked });
  };

  const handleDownloadClick = async (accessDownload) => {
    click = 'download';
    console.log(click);
    if (accessDownload === true) {
      await dispatch(
        updateAccessFolder(
          {
            user_id: parseInt(userData),
            folder_id: folderData.folder_id,
            access_download: false,
            access_upload: access_upload,
          },
          props.snackAlert,
          click
        )
      );
      setFolder({ ...folder, access_download: false });
      setSwitchstatus({
        ...switchstatus,
        checkedDownload: !access_download,
      });
    }
    if (accessDownload === false) {
      await dispatch(
        updateAccessFolder(
          {
            user_id: parseInt(userData),
            folder_id: folderData.folder_id,
            access_download: true,
            access_upload: access_upload,
          },
          props.snackAlert,
          click
        )
      );
      setFolder({ ...folder, access_download: true });
      setSwitchstatus({
        ...switchstatus,
        checkedDownload: !access_download,
      });
    }
  };

  const handleUploadClick = async (accessUpload) => {
    click = 'upload';
    console.log(click);
    if (accessUpload === true) {
      await dispatch(
        updateAccessFolder(
          {
            user_id: parseInt(userData),
            folder_id: folderData.folder_id,
            access_download: access_download,
            access_upload: false,
          },
          props.snackAlert,
          click
        )
      );
      setFolder({ ...folder, access_upload: false });
      setSwitchstatus({
        ...switchstatus,
        checkedUpload: !access_upload,
      });
    }
    if (accessUpload === false) {
      await dispatch(
        updateAccessFolder(
          {
            user_id: parseInt(userData),
            folder_id: folderData.folder_id,
            access_download: access_download,
            access_upload: true,
          },
          props.snackAlert,
          click
        )
      );
      setFolder({ ...folder, access_upload: true });
      setSwitchstatus({
        ...switchstatus,
        checkedUpload: !access_upload,
      });
    }
  };

  return (
    <>
      <TableCell key={folderData.folder_id} align='center'>
        <Checkbox
          className={classes.tableMargin}
          checked={checkedDownload}
          onChange={(event) => handleDownloadClick(access_download)}
          inputProps={{ 'aria-label': 'Allow Download' }}
        />
      </TableCell>
      <TableCell align='center'>
        <Checkbox
          className={classes.tableMargin}
          checked={checkedUpload}
          onChange={(event) => handleUploadClick(access_upload)}
          inputProps={{ 'aria-label': 'Allow Upload' }}
        />
      </TableCell>
    </>
  );
};
export default MenuUserCheckUpload;
