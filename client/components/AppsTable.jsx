import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setApplicationPostsActionCreator } from '../actions/actions';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Edit from '@material-ui/icons/Edit';

const Row = (props) => {
  const { row, id } = props;
  const [open, setOpen] = useState(false);

  const editApplication = () => {};

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: '14px' }}>
          {row.company}
        </TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: '14px' }}>
          {row.position}
        </TableCell>
        <TableCell align='center' style={{ fontSize: '14px' }}>
          {row.position}
        </TableCell>
        <TableCell align='center'>
          <button id={id} onClick={editApplication}>
            <Edit style={{ fontSize: 20 }} />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Documents
              </Typography>
              <Table
                size='small'
                aria-label='purchases'
                style={{
                  marginBottom: '2rem',
                  marginTop: '1rem',
                  backgroundColor: '#faf9f9',
                  border: 'hidden',
                  borderRadius: '5px',
                  boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
                }}
              >
                <TableBody>
                  <TableRow key={row.resume + id}>
                    <TableCell>Resume</TableCell>
                    <TableCell>
                      <a href={row.resume} target='_blank'>
                        {row.resume}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow key={row.coverLetter + id}>
                    <TableCell>Cover Letter</TableCell>
                    <TableCell>
                      <a href={row.coverLetter} target='_blank'>
                        {row.coverLetter}
                      </a>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setApplicationPosts: (applicationPosts) =>
    dispatch(setApplicationPostsActionCreator(applicationPosts)),
  setEmail: (email) => dispatch(setEmailActionCreator(email)),
});

const mapStateToProps = (state) => ({
  applicationPosts: state.apps.applicationPosts,
  email: state.auth.email,
});

const AppsTable = ({ setApplicationPosts, applicationPosts, email }) => {
  // useEffect(() => {
  //   let cookie = document.cookie;
  //   if(cookie) {
  //     cookie = cookie.split('=');
  //     let email = cookie[0];
  //     console.log('cookie email: ', email)
  //     setEmail(email);
  //   }
  // })
  
  useEffect(() => {
    fetch(`/apps?email=${email}`)
      .then((data) => data.json())
      .then((results) => {
        setApplicationPosts(results.applicationPosts);
        console.log('applicationPosts: ', results.applicationPosts);
      })
      .catch((error) => {
        console.log('Error in AppsTable useEffect fetch request: ', error);
      });
  }, [applicationPosts]);

  return (
    <TableContainer component={Paper} className='table-container'>
      <Table
        aria-label='collapsible table'
        padding='normal'
        size='small'
        style={{
          border: 'hidden',
          margin: 0,
          marginTop: '0',
          backgroundColor: '#f6f5ff',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontSize: '16px' }}>Company</TableCell>
            <TableCell style={{ fontSize: '16px' }}>Location</TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Position
            </TableCell>
            <TableCell align='center' style={{ fontSize: '16px' }}>
              Edit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicationPosts.map((application, index) => (
            <Row
              key={application.company + index}
              id={application.company + index}
              row={application}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppsTable);
