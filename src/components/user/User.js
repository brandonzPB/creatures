import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const User = () => {
  const { users } = useContext(UserContext);

  return (
    <div className="user">
    </div>
  )
}

export default User;
