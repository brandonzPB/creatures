import pokemon from 'pokemon';
import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CreatureContext } from '../../contexts/CreatureContext';
import { UserContext } from '../../contexts/UserContext';
import * as stats from '../../modules/stats';
import * as age from '../../modules/age';
import { Link } from 'react-router-dom';
import CreatureOption from './CreatureOption';
import { otherVersions } from '../../modules/pokemonList';
import { v4 as uuidv4 } from 'uuid';

const CreatureForm = () => {
  const { creatures, formDisplay, toggleFormDisplay, dispatch, createCreature } = useContext(CreatureContext);
  const { user, userDispatch } = useContext(UserContext);

  

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
  })
  
  if (!user.accessToken) {
    return (
      <Route exact path="/creature/create">
        <Redirect to="/" />
      </Route>
    )
  }

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCreature({
      ...creature,
      [name]: value
    });
  }

  const getMegas = () => {
    let inputs = ['first', 'second', 'third', 'fourth'];
    let selectedVersions = [];

    inputs.map(i => {
      const versionInput = creature[`${i}Mega`].toLowerCase();

      if (!creature[`${i}Mega`].trim()) return selectedVersions.push('normal');

      const creatureName = i === 'first' ? creature.firstCreature
          : i === 'second' ? creature.secondCreature
          : i === 'third' ? creature.thirdCreature
          : creature.fourthCreature;

      // get pokemon info from those that have other versions
      const pkmnInfo = otherVersions.filter(pkmn => pkmn.name === creatureName.toLowerCase());

      if (!pkmnInfo[0].name) return selectedVersions.push('normal');
      
      // check if versionInput exists in the pokemon's versions
      const version = pkmnInfo[0].versions.filter(v => v === versionInput);

      // if it does, length of version is greater than 0
      if (version.length > 0) {
        return selectedVersions.push(version);
      }

      return selectedVersions.push('normal');
    });

    return selectedVersions;
  }

  const putMegas = megas => {
    const evolutions = [];

    for (let i = 0; i < megas.length; i++) {
      const place = i === 0 ? 'first' :
        i === 1 ? 'second' :
        i === 2 ? 'third' :
        'fourth';

      const selectedVersion = megas[i] === 'normal' ? ''
        : megas[i] === 'none' ? '' 
        : `-${megas[i]}`;

      const creatureInput = place === 'first' ? 'firstCreature'
        : place === 'second' ? 'secondCreature'
        : place === 'third' ? 'thirdCreature'
        : 'fourthCreature';

      const version = `${creature[creatureInput]}${selectedVersion}`;

      evolutions.push(version.toLowerCase());
    }

    return evolutions;
  }

  const addCreature = (event) => {
    event.preventDefault();

    const difficulty = stats.getCreatureDifficulty(creature.purpose, 1);
    const multiplier = stats.getExpMultiplier(1);

    const megas = getMegas();
 
    const evolutions = putMegas(megas).map(item => {
      if (!item.trim()) {
        return 'none';
      }

      return item;
    });

    console.log('evolutions', evolutions);

    const newCreature = {
      creature: evolutions[0],
      creature_name: creature.creatureName.trim() || 'Anonymous Creature',
      purpose: creature.purpose,
      purpose_name: creature.purposeName.trim() || 'Base Existence',
      evolutions: [...evolutions],
      difficulty,
      multiplier,
      birth_date: age.getBirthdate(),
      birth_time: Date.now(),
      pokeball_number: 1,
      id: uuidv4(),
      level: 1,
      exp: 0,
      exp_goal: 1,
      prev_exp_goal: 1,
      exp_surplus: 0,
      objectives: [],
      age: 0,
      is_noob: true,
      streak_count: 0,
      streak_timestamp: Date.now(),
      streak_day: (new Date()).getDay(),
    }

    userDispatch({type: 'ADD_CREATURE', creature: {
      creature: evolutions[0],
      creature_name: creature.creatureName.trim() || 'Anonymous Creature',
      purpose: creature.purpose,
      purpose_name: creature.purposeName.trim() || 'Base Existence',
      evolutions: [...evolutions],
      difficulty,
      multiplier,
      birth_date: age.getBirthdate(),
      birth_time: Date.now(),
      pokeball_number: 1,
      id: uuidv4(),
    }});
    
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

    createCreature(newCreature);

    toggleFormDisplay();
  }
  
  
  
  if (creatures.length === 6) {
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
            <Link to="/creatures"><button className="return-btn">Return Home</button></Link>
            
            <div className="creature-form">
              <form onSubmit={addCreature}>
                <h2 className="form-title">Design Your Creature!</h2>

                <div className="evo-label">
                  <label className="evo-label-text">Creature Evolution Line</label>
                </div>

                <div className="label-container">
                  <label className="mega-input-text">Choose an alternate version</label>
                </div>

                <div className="creature-inputs">

                  <div className="creature-input">
                    <div className="creature-label">
                      <label>*First: </label>
                    </div>

                    <div className="creature-select">
                      <select
                        className="select-creature"
                        onChange={handleChange}
                        name="firstCreature"
                        required={true}
                        value={creature.firstCreature}
                      >
                        <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                        {OptionComponents}
                      </select>
                    </div>

                    <div className="mega-input">
                        <input 
                          disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.firstCreature.toLowerCase()) < 0 }
                          type="text"
                          placeholder="none/mega/megaX/megaY"
                          className="mega"
                          name="firstMega"
                          value={creature.firstMega}
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
                        value={creature.secondCreature}
                      >
                        <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                        {OptionComponents}
                      </select>
                    </div>

                    <div className="mega-input">
                      <input 
                        disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.secondCreature.toLowerCase()) < 0 }
                        type="text"
                        placeholder="none/mega/megaX/megaY"
                        className="mega"
                        name="secondMega"
                        value={creature.secondMega}
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
                        value={creature.thirdCreature}
                      >
                        <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                        {OptionComponents}
                      </select>
                    </div>

                    <div className="mega-input">
                      <input
                        disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.thirdCreature.toLowerCase()) < 0 }
                        type="text"
                        placeholder="none/mega/megaX/megaY"
                        className="mega"
                        name="thirdMega"
                        value={creature.thirdMega}
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
                        value={creature.fourthCreature}
                      >
                        <option disabled={true} defaultValue={true} value="">Select a Creature</option>
                        {OptionComponents}
                      </select>
                    </div>

                    <div className="mega-input">
                      <input 
                        disabled={ otherVersions.findIndex(pkmn => pkmn.name === creature.fourthCreature.toLowerCase()) < 0 }
                        type="text"
                        placeholder="none/mega/megaX/megaY"
                        className="mega"
                        name="fourthMega"
                        value={creature.fourthMega}
                        onChange={handleChange}
                      />
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
