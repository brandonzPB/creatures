import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';

import CreatureOption from './CreatureOption';

import { otherVersions } from '../../modules/pokemonList';
import pokemon from 'pokemon';
import * as megaMethods from '../../modules/megas';

const CreatureUpdateForm = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { currentId, showCreatureObjectives } = useContext(CreatureContext);

  const creature = user.creatures.filter(creature => creature.id === currentId);

  const [update, setUpdate] = useState({
    firstCreature: '', // This represents the creature's current pokemon
    firstMega: '',
    secondCreature: '',
    secondMega: '',
    thirdCreature: '',
    thirdMega: '',
    fourthCreature: '',
    fourthMega: '',
    creatureName: ''
  });

  if (!user.accessToken || !currentId.trim()) {
    return (
      <Route exact path="/creature/update">
        <Redirect to="/" />
      </Route>
    )
  }

  const pkmnArr = pokemon.all().sort((a, b) => {
    return a > b ? 1 : 
      a < b ? -1 : 0;
  });

  const OptionComponents = pkmnArr.map(creature => {
    return (
      <CreatureOption 
        key={pokemon.getId(creature)}
        creature={creature}
      />
    );
  });

  const handleChange = event => {
    const { value, name } = event.target;

    setUpdate({
      ...update,
      [name]: value
    });
  }

  const updateCreature = event => {
    event.preventDefault();

    // check megas from inputs
    const megas = megaMethods.getMegas(update);

    // assign selected versions (if any) to one array
    const evolutions = megaMethods.putMegas(update, megas).map(item => {
      if (!item.trim()) { return 'none' }

      return item;
    });

    // check if any of the updates match the current values of the actual, unupdated creature
    // true -> return current value
    // false -> return update
    const current = evolutions[0] === creature[0].creature
      ? creature[0].evolutions[0]
      : evolutions[0];

    const second = evolutions[1] === creature[0].evolutions[1]
      ? creature[0].evolutions[1]
      : evolutions[1];

    const third = evolutions[2] === creature[0].evolutions[2]
      ? creature[0].evolutions[2]
      : evolutions[2];

    const fourth = evolutions[3] === creature[0].evolutions[3]
      ? creature[0].evolutions[3]
      : evolutions[3];

    // if current/second/... === 'none' -> set to current value

    console.log('evolutions', [current, second, third, fourth]);
    console.log('creatureName', update.creatureName);

    return;

    userDispatch({ type: 'UPDATE_CREATURE_INFO', creature: {
      current, second, third, fourth
    }});

    setUpdate({
      ...update,
      firstCreature: '',
      firstMega: '',
      secondCreature: '',
      secondMega: '',
      thirdCreature: '',
      thirdMega: '',
      fourthCreature: '',
      fourthMega: '',
      creatureName: ''
    });

    showCreatureObjectives(currentId);
  }
 
  return (
    <div className="creature-info creature-form">
      <button onClick={() => showCreatureObjectives('')}>Return Home</button>

      <div className="creature-update-form">
        <form onSubmit={updateCreature}>
          <h2 className="form-title">Edit Your Creature!</h2>

          <div className="evo-label">
            <label className="evo-label-text">Creature Evolution Line</label>
          </div>

          <div className="label-container">
            <label className="mega-input-text">Choose an alternate version</label>
          </div>

          <div className="creature-inputs">

            <div className="creature-input">
              <div className="creature-label">
                <label>Current: </label>
              </div>

              <div className="creature-select">
                <select
                  className="select-creature"
                  onChange={handleChange}
                  name="firstCreature"
                  value={update.firstCreature}
                >
                  <option defaultValue={true} value="">{creature[0].creature}</option>
                  {OptionComponents}
                </select>
              </div>

              <div className="mega-input">
                  <input 
                    disabled={ otherVersions.findIndex(pkmn => pkmn.name === update.firstCreature.toLowerCase()) < 0 }
                    type="text"
                    placeholder="none/mega/megaX/megaY"
                    className="mega"
                    name="firstMega"
                    value={update.firstMega}
                    onChange={handleChange}
                  />
              </div>
            </div>

            <div className="creature-input">
              <div className="creature-label">
                <label>Second: </label>
              </div>

              <div className="creature-select">
                <select
                  className="select-creature"
                  onChange={handleChange}
                  name="secondCreature"
                  value={update.secondCreature}
                  disabled={creature[0].level >= 15}
                >
                  <option defaultValue={true} value="">
                    {
                      creature[0].level >= 15 ? 'Past evolution' : creature[0].evolutions[1]
                    }
                  </option>
                  {OptionComponents}
                </select>
              </div>

              <div className="mega-input">
                <input 
                  disabled={ otherVersions.findIndex(pkmn => pkmn.name === update.secondCreature.toLowerCase()) < 0 }
                  type="text"
                  placeholder="none/mega/megaX/megaY"
                  className="mega"
                  name="secondMega"
                  value={update.secondMega}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="creature-input">
              <div className="creature-label">
                <label>Third: </label>
              </div>

              <div className="creature-select">
                <select
                  className="select-creature"
                  onChange={handleChange}
                  name="thirdCreature"
                  value={update.thirdCreature}
                  disabled={creature[0].level >= 30}
                >
                  <option defaultValue={true} value="">
                  {
                      creature[0].level >= 30 ? 'Past evolution' : creature[0].evolutions[2]
                    }
                  </option>
                  {OptionComponents}
                </select>
              </div>

              <div className="mega-input">
                <input
                  disabled={ otherVersions.findIndex(pkmn => pkmn.name === update.thirdCreature.toLowerCase()) < 0 }
                  type="text"
                  placeholder="none/mega/megaX/megaY"
                  className="mega"
                  name="thirdMega"
                  value={update.thirdMega}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="creature-input">
              <div className="creature-label">
                <label>Fourth: </label>
              </div>

              <div className="creature-select">
                <select
                  className="select-creature"
                  onChange={handleChange}
                  name="fourthCreature"
                  value={update.fourthCreature}
                  disabled={creature[0].level >= 50}
                >
                  <option defaultValue={true} value="">
                  {
                      creature[0].level >= 50 ? 'Past evolution' : creature[0].evolutions[3]
                    }
                  </option>
                  {OptionComponents}
                </select>
              </div>

              <div className="mega-input">
                <input 
                  disabled={ otherVersions.findIndex(pkmn => pkmn.name === update.fourthCreature.toLowerCase()) < 0 }
                  type="text"
                  placeholder="none/mega/megaX/megaY"
                  className="mega"
                  name="fourthMega"
                  value={update.fourthMega}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="name-label">
            <label>Would you like to rename {creature[0].creature_name}?</label>
          </div>
          <div className="name-input">
            <input 
              type="text"
              placeholder="Socrates"
              name="creatureName"
              value={update.creatureName}
              onChange={handleChange}
            />
          </div>
          <button className="submit-form-btn">Update Creature</button>
        </form>
      </div>
    </div>
  )
}

export default CreatureUpdateForm;
