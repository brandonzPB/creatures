import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const CreatureUpdateForm = () => {
  const { user } = useContext(UserContext);

  if (!user.accessToken) {
    return (
      <Route exact path="/creature/update">
        <Redirect to="/" />
      </Route>
    )
  }
  
  /*
  all evolutions (cannot change some evolutions at certain levels)
  creature name
  Show current values
  Form below
  */
  return (
    <div className="creature-info"></div>
  )
}

export default CreatureUpdateForm;
