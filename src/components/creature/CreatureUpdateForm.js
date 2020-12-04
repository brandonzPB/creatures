import React, { useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { CreatureContext } from '../../contexts/CreatureContext';
import CreatureOption from './CreatureOption';
import { otherVersions } from '../../modules/pokemonList';
import pokemon from 'pokemon';

const CreatureUpdateForm = () => {
  const { user } = useContext(UserContext);
  const { currentId, showCreatureObjectives } = useContext(CreatureContext);

  const creature = user.creatures.filter(creature => creature.id === currentId);

  console.log('creature', creature)

  const [update, setUpdate] = useState({
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
  <form>
          <label>Creature Name:</label>
          <input 
            type="text"
            name="creatureName"
            value={update.creatureName}
            onChange={handleChange}
          />
          <label>Current Creature</label>
          <select
            className="select-creature"
            onChange={handleChange}
            name="firstCreature"
            value={update.firstCreature}
          >
            <option defaultValue={true} value="">{creature[0].evolutions[0]}</option>
          </select>
          
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
            name="fourthCreature"
            value={update.fourthCreature}
          >
            <option disabled={creature[0].evolutions[3] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[3]}</option>
          </select>
        </form>

  */
 
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
                  <option defaultValue={true} value="">{creature[0].evolutions[0]}</option>
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
                >
                  <option disabled={creature[0].evolutions[1] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[1]}</option>
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
                >
                  <option disabled={creature[0].evolutions[2] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[2]}</option>
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
                >
                  <option disabled={creature[0].evolutions[3] === creature[0].creature} defaultValue={true} value="">{creature[0].evolutions[3]}</option>
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
