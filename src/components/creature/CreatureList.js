import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';
import Creature from './Creature';

const CreatureList = () => {
  const { user, link, setDest } = useContext(UserContext);
  
  const { formDisplay, toggleFormDisplay, showCreatureObjectives } = useContext(CreatureContext);

  useEffect(() => {
    if (!formDisplay) toggleFormDisplay();

    showCreatureObjectives('');
  }, []);
  
  const CreatureComponents = user.creatures.length >= 1
    ? user.creatures.map(creature => {
      return (
        <Creature 
          key={creature.id}
          creature={creature}
        />
      );
    })
    : [];

  if (!user.accessToken) {
    return (
      <Route exact path="/creatures">
        <Redirect to="/" />
      </Route>
    )
  }

  if (link.dest === 'userUpdate') {
    return (
      <Route exact path="/creatures">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (link.dest === 'creatureCreate') {
    return (
      <Route exact path="/creatures">
        <Redirect to="/creature/create" />
      </Route>
    )
  }

  return (
    <div className="display-container">
      <button className="user-update-link" onClick={() => setDest('userUpdate')}>User Info</button>

      {
        user.creatures.length < 6 || user.creatures.length === undefined
          ? <button className="create-link" onClick={() => setDest('creatureCreate')}>New Creature</button>
          : user.creatures.length === 6 ?
          <div className="team-full">
            <span className="full-text">Your team of Creatures is full!</span>
          </div> :
          <div className="empty"></div>
      }

      <div className="creature-list-divider">
        {
          user.creatures.length < 1 ?
            <div className="tutorial-container">
              <h2 className="tutorial-header">Welcome to Creatures of Habit!</h2>
              <ul className="tutorial">
                <li>Make a Creature that represents a subject in which you wish to record progress (e.g., Piano)</li>
                <li>Set and complete relevant habits (e.g., practice, study, etc.)</li>
                <li>Achieve excellence and watch your Creature grow!</li>
              </ul>
            </div> :
            <ul className="creature-coral">
              {CreatureComponents}
            </ul>
        }
      </div>
    </div>
  );
}

export default CreatureList;
