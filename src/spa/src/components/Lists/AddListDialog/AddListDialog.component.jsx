import {
  Box as MuiBox,
  Dialog as MuiDialog,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { addList } from '../../../redux/modules/users/profile/lists/lists.slice';
import Editor from '../Editor/Editor.component';

function AddListDialog() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const loading = useSelector((state) =>
    selectLoadingFlag(state, 'users/lists/add'),
  );
  const { addList: param, ...otherSearchParams } = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams],
  );
  const open = param !== undefined;

  function handleClose() {
    setSearchParams({
      ...otherSearchParams,
    });
  }

  function handleSubmit({ reset, ...list }) {
    dispatch(addList(list)).then(() => {
      reset();
      handleClose();
    });
  }

  return (
    <MuiDialog onClose={handleClose} open={open}>
      <MuiDialogTitle>Add list</MuiDialogTitle>
      <MuiDialogContent>
        <MuiBox mb={1}>
          <Editor disabled={loading} onSubmit={handleSubmit} />
        </MuiBox>
      </MuiDialogContent>
    </MuiDialog>
  );
}

export default AddListDialog;
