import React, { useState, useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { TutorialContext } from '../../contexts/TutorialContext';

import * as megaMethods from '../../modules/megas';
import { otherVersions } from '../../modules/pokemonList';

import CreatureOption from '../creature/CreatureOption';
import Duck from './Duck';

import { v4 as uuidv4 } from 'uuid';
import pokemon from 'pokemon';

import '../creature/creatureForm.css';

const SampleCreateForm = () => {
  const { user, link, setDest } = useContext(UserContext);

  const { sampleCreature, setSampleCreature, completeTutorial, tutorial } = useContext(TutorialContext);

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

  const [creature, setCreature] = useState({
    firstCreature: '',
    firstMega: '',
    secondCreature: '',
    secondMega: '',
    thirdCreature: '',
    thirdMega: '',
    fourthCreature: '',
    fourthMega: '',
    creatureName: '',
    purpose: 'hobby',
    purposeName: ''
  });

  useEffect(() => {
    console.log('creature', creature)
  }, [creature]);

  if (tutorial.complete) {
    return (
      <Route exact path="/tutorial/create">
        <Redirect to="/welcome" />
      </Route>
    )
  }

  if (user.accessToken) {
    return (
      <Route exact path="/tutorial/create">
        <Redirect to="/user/update" />
      </Route>
    )
  }

  if (link.dest === 'tutorial') {
    return (
      <Route exact path="/tutorial/create">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleChange = (event) => {
    const { value, name, className } = event.target;

    if (className === 'alt-input') {
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

      setCreature({
        ...creature,
        [megaPlace]: '',
        [name]: value
      });
    } else {
      setCreature({
        ...creature,
        [name]: value
      });
    }
  }

  const addCreature = (event) => {
    event.preventDefault();

    const megas = megaMethods.getMegas(creature);
 
    const evolutions = megaMethods.putMegas(creature, megas).map(item => {
      if (!item.trim()) { return 'none'; }

      return item;
    });

    setSampleCreature({
      ...sampleCreature,
      creature: evolutions[0],
      name: creature.creatureName.trim() || 'Anonymous Creature',
      purpose: creature.purpose,
      purposeName: creature.purposeName.trim() || 'Base Existence',
      evolutions: [...evolutions],
    })
    
    setCreature({
      ...creature,
      firstCreature: '',
      firstMega: '',
      secondCreature: '',
      secondMega: '',
      thirdCreature: '',
      thirdMega: '',
      fourthCreature: '',
      fourthMega: '',
      creatureName: '',
      purpose: 'hobby',
      purposeName: ''
    });

    setDest('tutorial');
  }

  return (
    <div className="create-page">
      <Route exact path="/creature/create"> <Redirect to="/creatures" /> </Route>
        <div className="creature-form-container">
          <button className="creatures-return-link" onClick={() => setDest('tutorial')}>Return to Tutorial</button>

          <div id="skip__container">
            <button id="skip-tutorial-btn" onClick={completeTutorial}>Skip Tutorial</button>
          </div>

          <div id="duck-create__container">
            <Duck />
          </div>
          
          <div className="creature-form">
            <form onSubmit={addCreature}>
              <h2 className="form-title">Design Your Creature!</h2>
              
              <div id="input-parent-container">
                <div id="evo-input-parent-container">
                  <div id="evo-input-header">
                    <span id="evo-info">Creature Evolution Line</span>
                  </div>

                  <div id="evo-input-container">
                    <div className="evo-input-child-container">
                      <div className="creature-info-container">
                        <span className="evo-description">*First: </span>
                      </div>

                      <div className="creature-select">
                        <select
                          className="select-creature-input"
                          onChange={handleChange}
                          name="firstCreature"
                          required={true}
                          value={creature.firstCreature}
                        >
                          <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                          {OptionComponents}
                        </select>
                      </div>
                    </div>

                    <div className="evo-input-child-container">
                      <div className="creature-info-container">
                        <span className="evo-description">Second: </span>
                      </div>

                      <div className="creature-select">
                        <select
                          className="select-creature-input"
                          onChange={handleChange}
                          name="secondCreature"
                          value={creature.secondCreature}
                        >
                          <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                          <option value="">None</option>
                          {OptionComponents}
                        </select>
                      </div>
                    </div>

                    <div className="evo-input-child-container">
                      <div className="creature-info-container">
                        <span className="evo-description">Third: </span>
                      </div>

                      <div className="creature-select">
                        <select
                          className="select-creature-input"
                          onChange={handleChange}
                          name="thirdCreature"
                          value={creature.thirdCreature}
                        >
                          <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                          <option value="">None</option>
                          {OptionComponents}
                        </select>
                      </div>
                    </div>

                    <div className="evo-input-child-container">
                      <div className="creature-info-container">
                        <span className="evo-description">Fourth: </span>
                      </div>

                      <div className="creature-select">
                        <select
                          className="select-creature-input"
                          onChange={handleChange}
                          name="fourthCreature"
                          value={creature.fourthCreature}
                        >
                          <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                          <option value="">None</option>
                          {OptionComponents}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="mega-input-parent-container">
                  <div id="mega-input-header">
                    <span id="mega-info">Choose an alternate version/mega</span>
                  </div>

                  <div id="mega-input-container">
                    <div className="mega-input-child-container">
                      <div className="input-mega-div">
                        <select
                          disabled={ !creature.firstCreature.trim() || false }
                          onChange={handleChange}
                          className="alt-input"
                          name="firstMega"
                          value={creature.firstMega}
                        >
                          <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                          <option value="">None</option>
                          {
                            otherVersions.findIndex(pkmn => pkmn.name === creature.firstCreature.toLowerCase()) > -1
                              ? otherVersions.find(pkmn => pkmn.name === creature.firstCreature.toLowerCase())
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

                    <div className="mega-input-child-container">
                      <div className="input-mega-div">
                        <select
                          disabled={ !creature.secondCreature.trim() || false }
                          onChange={handleChange}
                          className="alt-input"
                          name="secondMega"
                          value={creature.secondMega}
                        >
                          <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                          <option value="">None</option>
                          {
                            otherVersions.findIndex(pkmn => pkmn.name === creature.secondCreature.toLowerCase()) > -1
                              ? otherVersions.find(pkmn => pkmn.name === creature.secondCreature.toLowerCase())
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

                    <div className="mega-input-child-container">
                      <div className="input-mega-div">
                        <select
                          disabled={ !creature.thirdCreature.trim() || false }
                          onChange={handleChange}
                          className="alt-input"
                          name="thirdMega"
                          value={creature.thirdMega}
                        >
                          <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                          <option value="">None</option>
                          {
                            otherVersions.findIndex(pkmn => pkmn.name === creature.thirdCreature.toLowerCase()) > -1
                              ? otherVersions.find(pkmn => pkmn.name === creature.thirdCreature.toLowerCase())
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
                    
                    <div className="mega-input-child-container">
                      <div className="input-mega-div">
                        <select
                          disabled={ !creature.fourthCreature.trim() || false }
                          onChange={handleChange}
                          className="alt-input"
                          name="fourthMega"
                          value={creature.fourthMega}
                        >
                          <option disabled={true} defaultValue={true} value="">Select an Alternate Version</option>
                          <option value="">None</option>
                          {
                            otherVersions.findIndex(pkmn => pkmn.name === creature.fourthCreature.toLowerCase()) > -1
                              ? otherVersions.find(pkmn => pkmn.name === creature.fourthCreature.toLowerCase())
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
                </div>
              </div>

              <div className="purpose-label">
                <label>Which area of your life does this creature represent?</label>
                <span className="info">Determines difficulty</span>
              </div>
              <div className="purpose-select">
                <select className="select-purpose" onChange={handleChange} value={creature.purpose} name="purpose">
                  <option value="hobby">Hobby (Medium-Easy)</option>
                  <option value="communication">Communication/Language (Medium)</option>
                  <option value="self-improvement">Self-Improvement (Medium-Hard)</option>
                  <option value="vocation">Vocation/Purpose (Hard)</option>
                </select>
              </div>

              <div id="name-container">
                <span id="name-label">What would you like to name this Creature of Habit?</span>
                <input 
                  id="name-input"
                  type="text"
                  placeholder="Dr. King"
                  name="creatureName"
                  value={creature.creatureName}
                  onChange={handleChange}
                />
              </div>

              <div id="title-container">
                <span id="title-label">What title would you like to give {creature.creatureName}?</span>
                <input 
                  id="title-input"
                  type="text"
                  placeholder="Leader"
                  name="purposeName"
                  value={creature.purposeName}
                  onChange={handleChange}
                />
              </div>

              <button className="submit-form-btn">Create Creature</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default SampleCreateForm;
