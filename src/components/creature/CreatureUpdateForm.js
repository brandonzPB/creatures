import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';

const CreatureUpdateForm = () => {
  const { user } = useContext(UserContext);
  const { currentId, showCreatureObjectives } = useContext(CreatureContext);

  const creature = user.creatures.filter(creature => creature.id === currentId);

  console.log('creature', creature)

  const [update, setUpdate] = useState({
    creature: '',
    creatureName: '',
    secondCreature: '',
    thirdCreature: '',
    fourthCreature: ''
  });

  if (!user.accessToken || !currentId.trim()) {
    return (
      <Route exact path="/creature/update">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleChange = event => {
    // setUpdate
  }

  const handleSubmit = event => {
    event.preventDefault();

    setUpdate({
      ...update,
      creature: '',
      creatureName: '',
      secondCreature: '',
      thirdCreature: '',
      fourthCreature: ''
    });

    showCreatureObjectives(currentId);
  }
  
  /*
  all evolutions (cannot change some evolutions at certain levels)
  Show current values
  Form below
  
  *creature.evolutions never changes*
  */
 
  return (
    <div className="creature-info">
      <button onClick={() => showCreatureObjectives('')}>Return Home</button>

      <div className="creature-update-form">
        <form>
          <label>Creature Name:</label>
          <input 
            type="text"
            name="creatureName"
            value={update.creatureName}
            onChange={handleChange}
          />
          <label>Current Creature</label>
          
          <label>Second Creature</label>
          <select
            className="select-creature"
            onChange={handleChange}
            name="secondCreature"
            value={update.secondCreature}
          >
            <option disabled={creature[0].evolutions[1] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[1]}</option>
          </select>

          <label>Third Creature</label>
          <select
            className="select-creature"
            onChange={handleChange}
            name="thirdCreature"
            value={update.thirdCreature}
          >
            <option disabled={creature[0].evolutions[2] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[2]}</option>
          </select>

          <label>Third Creature</label>
          <select
            className="select-creature"
            onChange={handleChange}
            name="thirdCreature"
            value={update.thirdCreature}
          >
            <option disabled={creature[0].evolutions[3] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[3]}</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default CreatureUpdateForm;
