import React from 'react';

const Notification = ({ notification: { success, msg } }) => {
  return <div className={success ? 'success' : 'fail'}>{msg}</div>;
};

export default Notification;
