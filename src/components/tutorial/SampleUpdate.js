import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { TutorialContext } from '../../contexts/TutorialContext';

import CreatureOption from '../creature/CreatureOption';

import { otherVersions } from '../../modules/pokemonList';
import pokemon from 'pokemon';
import * as megaMethods from '../../modules/megas';

import '../creature/creatureUpdate.css';

const SampleUpdate = () => {
  const { user, link, setDest } = useContext(UserContext);
  const { sampleCreature, setSampleCreature, completeTutorial } = useContext(TutorialContext); 

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

  if (user.accessToken) {
    return (
      <Route exact path="/tutorial/update">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (link.dest === 'tutorial') {
    return (
      <Route exact path="/tutorial/update">
        <Redirect to="/" />
      </Route>
    )
  }

  if (link.dest === 'tutorialObjectives') {
    return (
      <Route exact path="/tutorial/update">
        <Redirect to="/tutorial/objectives" />
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
    const { value, name, className } = event.target;

    if (className === 'select-creature') {
      let megaPlace;

      if (name === 'firstCreature') {
        megaPlace = 'firstMega';
      } else if (name === 'secondCreature') {
        megaPlace = 'secondMega';
      } else if (name === 'thirdCreature') {
        megaPlace = 'thirdMega';
      } else {
        megaPlace = 'fourthMega';
      }

      setUpdate({
        ...update,
        [megaPlace]: '',
        [name]: value
      });
    } else {
      setUpdate({
        ...update,
        [name]: value
      });
    }
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

    // check if any of the updates match the current values of the actual, non-updated creature
    // true -> return current value
    // false -> return update
    const current = evolutions[0] === sampleCreature.creature || evolutions[0] === 'none'
      ? sampleCreature.evolutions[0]
      : evolutions[0];

    const second = evolutions[1] === sampleCreature.evolutions[1] || evolutions[1] === 'none'
      ? sampleCreature.evolutions[1]
      : evolutions[1];

    const third = evolutions[2] === sampleCreature.evolutions[2] || evolutions[2] === 'none'
      ? sampleCreature.evolutions[2]
      : evolutions[2];

    const fourth = evolutions[3] === sampleCreature.evolutions[3] || evolutions[3] === 'none'
      ? sampleCreature.evolutions[3]
      : evolutions[3];

    const name = update.creatureName === sampleCreature.name || update.creatureName === ''
      ? sampleCreature.name
      : update.creatureName

    const newEvos = [current, second, third, fourth];

    setSampleCreature({
      ...sampleCreature,
      creature: current,
      evolutions: newEvos,
      name
    });

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

    setDest('tutorialObjectives');
  }

  return (
    <div className="creature-info creature-form">
      <button className="creatures-return-link-update" onClick={() => setDest('tutorialObjectives')}>Return to Creature</button>

      <div id="skip__container">
        <button id="skip-tutorial-btn" onClick={completeTutorial}>Skip Tutorial</button>
      </div>

      <div className="creature-update-form">
        <form onSubmit={updateCreature}>
          <h2 className="form-title">Edit Your Creature</h2>
          
          <div id="update-input-parent-container">
            <div id="update-evo-parent-container">
              <div id="update-evo-header-container">
                <span id="update-evo-header">Creature Evolution Line</span>
              </div>

              <div className="update-evo-container">
                <div className="update-evo-info-container">
                  <span className="evo-info">Current: </span>
                </div>

                <div className="evo-input-child-container">
                  <select
                    className="select-creature"
                    onChange={handleChange}
                    name="firstCreature"
                    value={update.firstCreature}
                  >
                    <option defaultValue={true} value="">{sampleCreature.creature}</option>
                    <option value="">None</option>
                    {OptionComponents}
                  </select>
                </div>
              </div>

              <div className="update-evo-container">
                <div className="update-evo-info-container">
                  <span className="evo-info">Second: </span>
                </div>

                <div className="evo-input-child-container">
                  <select
                    className="select-creature"
                    onChange={handleChange}
                    name="secondCreature"
                    value={update.secondCreature}
                    disabled={sampleCreature.level >= 15}
                  >
                    <option defaultValue={true} value="">
                      {
                        sampleCreature.level >= 15 ? 'Past evolution' : sampleCreature.evolutions[1]
                      }
                    </option>
                    <option value="">None</option>
                    {OptionComponents}
                  </select>
                </div>
              </div>

              <div className="update-evo-container">
                <div className="update-evo-info-container">
                  <span className="evo-info">Third: </span>
                </div>

                <div className="evo-input-child-container">
                  <select
                    className="select-creature"
                    onChange={handleChange}
                    name="thirdCreature"
                    value={update.thirdCreature}
                    disabled={sampleCreature.level >= 30}
                  >
                    <option defaultValue={true} value="">
                    {
                        sampleCreature.level >= 30 ? 'Past evolution' : sampleCreature.evolutions[2]
                      }
                    </option>
                    <option value="">None</option>
                    {OptionComponents}
                  </select>
                </div>
              </div>

              <div className="update-evo-container">
                <div className="update-evo-info-container">
                  <span className="evo-info">Fourth: </span>
                </div>

                <div className="evo-input-child-container">
                  <select
                    className="select-creature"
                    onChange={handleChange}
                    name="fourthCreature"
                    value={update.fourthCreature}
                    disabled={sampleCreature.level >= 50}
                  >
                    <option defaultValue={true} value="">
                    {
                        sampleCreature.level >= 50 ? 'Past evolution' : sampleCreature.evolutions[3]
                      }
                    </option>
                    <option value="">None</option>
                    {OptionComponents}
                  </select>
                </div>
              </div>
            </div>

            <div id="update-mega-parent-container">
              <div id="mega-header-container">
                <span id="mega-header">Choose an Alternate Version/Mega</span>
              </div>

              <div className="update-mega-container">
                <select
                  disabled={ !update.firstCreature.trim() || false }
                  onChange={handleChange}
                  className="mega"
                  name="firstMega"
                  value={update.firstMega}
                >
                  <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                  <option value="">None</option>
                  {
                    otherVersions.findIndex(pkmn => pkmn.name === update.firstCreature.toLowerCase()) > -1
                      ? otherVersions.find(pkmn => pkmn.name === update.firstCreature.toLowerCase())
                        .versions
                        .map((version, index) => {
                          return (
                            <option value={version.value} key={index}>{version.text}</option>
                          )
                        })
                      : ''
                  }
                </select>
              </div>

              <div className="update-mega-container">
                <select
                  disabled={ !update.secondCreature.trim() || false }
                  onChange={handleChange}
                  className="mega"
                  name="secondMega"
                  value={update.secondMega}
                >
                  <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                  <option value="">None</option>
                  {
                    otherVersions.findIndex(pkmn => pkmn.name === update.secondCreature.toLowerCase()) > -1
                      ? otherVersions.find(pkmn => pkmn.name === update.secondCreature.toLowerCase())
                        .versions
                        .map((version, index) => {
                          return (
                            <option value={version.value} key={index}>{version.text}</option>
                          )
                        })
                      : ''
                  }
                </select>
              </div>

              <div className="update-mega-container">
                <select
                  disabled={ !update.thirdCreature.trim() || false }
                  onChange={handleChange}
                  className="mega"
                  name="thirdMega"
                  value={update.thirdMega}
                >
                  <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                  <option value="">None</option>
                  {
                    otherVersions.findIndex(pkmn => pkmn.name === update.thirdCreature.toLowerCase()) > -1
                      ? otherVersions.find(pkmn => pkmn.name === update.thirdCreature.toLowerCase())
                        .versions
                        .map((version, index) => {
                          return (
                            <option value={version.value} key={index}>{version.text}</option>
                          )
                        })
                      : ''
                  }
                </select>
              </div>

              <div className="update-mega-container">
                <select
                  disabled={ !update.fourthCreature.trim() || false }
                  onChange={handleChange}
                  className="mega"
                  name="fourthMega"
                  value={update.fourthMega}
                >
                  <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                  <option value="">None</option>
                  {
                    otherVersions.findIndex(pkmn => pkmn.name === update.fourthCreature.toLowerCase()) > -1
                      ? otherVersions.find(pkmn => pkmn.name === update.fourthCreature.toLowerCase())
                        .versions
                        .map((version, index) => {
                          return (
                            <option value={version.value} key={index}>{version.text}</option>
                          )
                        })
                      : ''
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="name-info-container">
            <span id="name-info">Would you like to rename {sampleCreature.name}?</span>
          </div>

          <div className="name-input">
            <input 
              id="name"
              type="text"
              placeholder="Socrates"
              name="creatureName"
              value={update.creatureName}
              onChange={handleChange}
            />
          </div>

          <button className="update-btn">Update Creature</button>
        </form>
      </div>
    </div>
  )
}

export default SampleUpdate;
