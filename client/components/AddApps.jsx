import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  updateAppActionCreator,
  clearAppStateActionCreator,
  setApplicationPostsActionCreator,
} from '../actions/actions';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';

const mapDispatchToProps = (dispatch) => ({
  updateApp: (appProperty) => dispatch(updateAppActionCreator(appProperty)),
  clearAppState: () => dispatch(clearAppStateActionCreator()),
  setApplicationPosts: (applicationPosts) =>
    dispatch(setApplicationPostsActionCreator(applicationPosts)),
});

const mapStateToProps = (state) => ({
  application: state.apps.application,
  applicationPosts: state.apps.applicationPosts,
  email: state.auth.email,
});

const AddApps = ({
  application,
  updateApp,
  clearAppState,
  email,
  setApplicationPosts,
}) => {
  const [open, setOpen] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    let activateCreateButton = false;
    if (application.company) activateCreateButton = true;
    setDisableButton(!activateCreateButton);
  }, [application.company]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    clearAppState();
  };
  const handleChange = (event) => {
    const newApplication = { ...application };
    newApplication[event.target.id] = event.target.value;
    updateApp(newApplication);
  };
  const handleClickCreate = () => {
    fetch('/addapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        application,
      }),
    })
      .then((data) => data.json())
      .then((results) => {
        setApplicationPosts(results.applicationPosts);
        handleClose();
      })
      .catch((error) => {
        console.log(
          'Error in AddApps handleClickCreate fetch request: ',
          error
        );
      });
  };

  return (
    <div className='add-apps'>
      <Button onClick={handleClickOpen}>Add New Application</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='form-dialog-title'>Add New Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add your application details below:
          </DialogContentText>
          <TextField
            size='small'
            required
            fullWidth
            margin='normal'
            label='Company'
            id='company'
            variant='outlined'
            value={application.company}
            onChange={handleChange}
          />
          <TextField
            size='small'
            fullWidth
            margin='normal'
            label='Location'
            id='location'
            variant='outlined'
            value={application.location}
            onChange={handleChange}
          />
          <TextField
            size='small'
            fullWidth
            margin='normal'
            label='Position'
            id='position'
            variant='outlined'
            value={application.position}
            onChange={handleChange}
          />
          <TextField
            size='small'
            fullWidth
            margin='normal'
            label='Resume'
            id='resume'
            variant='outlined'
            value={application.resume}
            onChange={handleChange}
          />
          <TextField
            size='small'
            fullWidth
            margin='normal'
            label='Cover Letter'
            id='coverLetter'
            variant='outlined'
            value={application.coverLetter}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={handleClickCreate}
            disabled={disableButton}
            color='primary'
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddApps);
