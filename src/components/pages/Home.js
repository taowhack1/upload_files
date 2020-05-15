import React, { useEffect, useState } from 'react';
import ViewFolder from '../files/ViewFolder';
import { useSelector } from 'react-redux';
import ViewFolderAdmin from '../files/ViewFolderAdmin';

const Home = () => {
  const { authdata } = useSelector((state) => state.auth);
  const [page, setPage] = useState();
  useEffect(() => {
    if (authdata !== null && authdata.authorized_id === 1) {
      setPage(<ViewFolder />);
    } else {
      setPage(<ViewFolderAdmin />);
    }
  }, []);

  return <div>{page}</div>;
};
export default Home; 