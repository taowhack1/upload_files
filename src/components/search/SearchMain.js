import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFiles, clearSearchFiles } from '../../actions/searchActions';
import {
  Button,
  TextField,
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
import useStyles from '../files/StyleFiles';
const SearchMain = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchfiles } = useSelector((state) => state.search);
  const { authdata } = useSelector((state) => state.auth);
  const [text, setText] = useState('');

  const onChange = (e) => {
    //e.preventDefault();
    setText(e.target.value);
    // if (text === '') {
    //   alert('Please enter something', 'light');
    // } else {
    //dispatch(searchFiles(authdata.user_id, text));
    //setText('');
  };
  useEffect(() => {
    if (text !== '') {
      dispatch(searchFiles(authdata.user_id, text));
    } else {
      dispatch(clearSearchFiles());
    }
  }, [text]);

  const onSubmit = (e) => setText(e.target.value);

  const handleClearSearchFiles = () => {
    setText('');
    dispatch(clearSearchFiles());
  };

  return (
    <Grid container className={classes.gridContainer}>
      <form onSubmit={onSubmit} className='form'>
        <TextField
          type='search'
          name='text'
          placeholder='ชื่อไฟล์'
          variant='outlined'
          onChange={onChange}
          value={text}
        />
        {/* <Button
          type='submit'
          value='Search'
          variant='contained'
          color='primary'
        >
          ค้นหา
        </Button>

        {searchfiles !== null && (
          <Button
            variant='contained'
            color='secondary'
            onClick={handleClearSearchFiles}
          >
            Clear
          </Button> */}
        )}
      </form>
    </Grid>
  );
};

export default SearchMain;
