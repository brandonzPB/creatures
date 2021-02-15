import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';

import * as stats from '../../modules/stats';
import * as ages from '../../modules/age';
import * as megaMethods from '../../modules/megas';
import { otherVersions } from '../../modules/pokemonList';

import CreatureOption from './CreatureOption';

import { v4 as uuidv4 } from 'uuid';
import pokemon from 'pokemon';

import './creatureForm.css';

const CreatureForm = () => {
  const { user, userDispatch, link, setDest } = useContext(UserContext);
  
  const { formDisplay, toggleFormDisplay, finish } = useContext(CreatureContext);

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
  
  if (!user.accessToken) {
    return (
      <Route exact path="/creature/create">
        <Redirect to="/" />
      </Route>
    )
  }

  if (link.dest === 'creatures') {
    return (
      <Route exact path="/creature/create">
        <Redirect to="/creatures" />
      </Route>
    )
  }

  const handleChange = (event) => {
    const { value, name, className } = event.target;

    if (className === 'select-creature-input') {
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

    const difficulty = stats.getCreatureDifficulty(creature.purpose, 1);
    const multiplier = stats.getExpMultiplier(1);

    const megas = megaMethods.getMegas(creature);
 
    const evolutions = megaMethods.putMegas(creature, megas).map(item => {
      if (!item.trim()) { return 'none'; }

      return item;
    });

    const birthTime = user.new_time;
    const birthDate = user.new_day;
    const age = ages.getAge(birthTime, user.new_time);

    const newCreature = {
      creature: evolutions[0],
      creature_name: creature.creatureName.trim() || 'Anonymous Creature',
      purpose: creature.purpose,
      purpose_name: creature.purposeName.trim() || 'Base Existence',
      evolutions: [...evolutions],
      difficulty,
      multiplier,
      birth_date: ages.getBirthdate(),
      birth_time: Date.now(),
      pokeball_number: 1,
      id: uuidv4(),
      level: 1,
      exp: 0,
      exp_goal: 1,
      prev_exp_goal: 1,
      exp_surplus: 0,
      objectives: [],
      age: ages.getBirthdate(birthTime),
      birth_time: birthTime,
      birth_date: birthDate,
      age,
      is_noob: true,
      streak_count: 0,
      streak_timestamp: 0,
      streak_day: 0,
    };

    userDispatch({type: 'ADD_CREATURE', newCreature });
    
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

    finish('creature', newCreature, 'create');

    toggleFormDisplay();
  }
  
  if (user.creatures.length === 6) {
    return (
      <Route exact path="/creature/create">
        <Redirect to="/creatures" />
      </Route>
    )
  }

  return (
    <div className="create-page">
      {
        !formDisplay ? 
          <Route exact path="/creature/create"> <Redirect to="/creatures" /> </Route> :
          <div className="creature-form-container">
            <button className="creatures-return-link" onClick={() => setDest('creatures')}>Return to Creatures</button>
            
            <div className="creature-form">
              <form onSubmit={addCreature}>
                <h2 className="form-title">Design Your Creature!</h2>
                
                <div id="input-parent-container">
                  <div id="evo-input-parent-container">
                    <div id="evo-input-header">
                      <span id="evo-info">Creature Evolution Line</span>
                    </div>

                    <div id="evo-input-container">
                      <div id="first-evo-container">
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
                            <option value="">None</option>
                            {OptionComponents}
                          </select>
                        </div>
                      </div>

                      <div id="second-evo-container">
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

                      <div id="third-evo-container">
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

                      <div id="fourth-evo-container">
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
                      <div id="first-mega-container">
                        <div className="input-mega-div">
                          <input 
                            disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.firstCreature.toLowerCase()) < 0 }
                            type="text"
                            placeholder="none/mega/megaX/megaY"
                            className="mega-input"
                            name="firstMega"
                            value={creature.firstMega}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div id="second-mega-container">
                        <div className="input-mega-div">
                          <input 
                            disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.secondCreature.toLowerCase()) < 0 }
                            type="text"
                            placeholder="none/mega/megaX/megaY"
                            className="mega-input"
                            name="secondMega"
                            value={creature.secondMega}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div id="third-mega-container">
                        <div className="input-mega-div">
                          <input
                            disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.thirdCreature.toLowerCase()) < 0 }
                            type="text"
                            placeholder="none/mega/megaX/megaY"
                            className="mega-input"
                            name="thirdMega"
                            value={creature.thirdMega}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div id="fourth-mega-container">
                        <div className="input-mega-div">
                          <input 
                            disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.fourthCreature.toLowerCase()) < 0 }
                            type="text"
                            placeholder="none/mega/megaX/megaY"
                            className="mega-input"
                            name="fourthMega"
                            value={creature.fourthMega}
                            onChange={handleChange}
                          />
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

                <div className="name-label">
                  <label>What would you like to name this Creature of Habit?</label>
                </div>
                <div className="name-input">
                  <input 
                    type="text"
                    placeholder="Seneca"
                    name="creatureName"
                    value={creature.creatureName}
                    onChange={handleChange}
                  />
                </div>

                <div className="title-label">
                  <label>What title would you like to give {creature.creatureName}?</label>
                </div>
                <div className="title-input">
                  <input 
                    type="text"
                    placeholder="Stoic"
                    name="purposeName"
                    value={creature.purposeName}
                    onChange={handleChange}
                  />
                </div>
                <button className="submit-form-btn">Create Creature</button>
              </form>
            </div>
          </div>
      }
    </div>
  )
}

export default CreatureForm;
