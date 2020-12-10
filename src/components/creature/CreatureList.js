import React, { useEffect, useContext } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';
import Creature from './Creature';

const CreatureList = () => {
  const { formDisplay, toggleFormDisplay, showCreatureObjectives } = useContext(CreatureContext);
  const { user } = useContext(UserContext);

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

  return (
    <div className="display-container">
      <Link to="user/update">
        <p className="user-update-link">User Info</p>
      </Link>
      {
        user.creatures.length < 6 || user.creatures.length === undefined ?
          <Link to="/creature/create">
            <p className="create-link">New Creature</p>
          </Link> :
          user.creatures.length === 6 ?
          <div className="team-full">
            <span className="full-text">Your team of Creatures is full :)</span>
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
