import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const SampleCreature = ({ creature, showObjectives }) => {
  const { link, setDest } = useContext(UserContext);

  const spriteSrc = require(`../../sprites/pkmnXY/${creature.creature.toLowerCase()}.gif`);

  let fireImg;
  
  if (creature.streak_count === 0) {
    fireImg = require('../../images/fire_end.jpg');
  } else {
    fireImg = require('../../images/fire2.jpg');
  }

  if (link.dest === 'tutorialObjectives') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/objectives" />
      </Route>
    )
  }

  if (link.dest === 'tutorialUpdate') {
    return (
      <Route exact path="/">
        <Redirect to="/tutorial/update" />
      </Route>
    )
  }

  return (
    <div className="creature-display">
      <li style={{
        listStyleType: 'none'
      }}>
      <div className="header-container">
        <div className="creature-name">
          <h2>{creature.name}</h2>
        </div>

        <div className="creature-purpose-name">
          <h3 style={{
            fontStyle: 'italic'
          }}>{creature.purposeName}</h3>
        </div>

        <div className="creature-level">
          <h4>Lv. {creature.level}</h4>
        </div>
      </div>

      <div className="creature-sprite">
        <img src={spriteSrc} alt="Gif of a Pokemon"/>
      </div>

      <div className="footer-container">
        <div className="exp-container">
          <div className="creature-exp">
            <h5>
              <CountUp 
                start={creature.prevExp}
                end={creature.exp}
                duration={1.00}
              /> / <CountUp 
                start={creature.prevExp}
                end={creature.expGoal}
                duration={1.00}
              /> Exp
            </h5>
          </div>

          <div className="exp-bar">
            <div 
              className="exp-filled">
              <div className="exp-animation"
                style={{
                width: `${(creature.expSurplus / (creature.expGoal - creature.prevExp)) * 150}px`,
              }}>
              </div>
            </div>

            <div className="exp-empty" style={{
              width: '100%',
              backgroundColor: 'white'
            }}>
            </div>
          </div>

          <div className="view-info-btn-container">
            {
              currentId
                ? <button className="view-info-btn" onClick={() => setDest('tutorialUpdate')}>Edit Creature</button>
                : <button className="view-info-btn" onClick={() => setDest('tutorialObjectives')}>View Info</button>
            }
          </div>
        </div>
          

        <div className="streak-container-fluid">
          <div className="streak-container">
            <div className="streak-icon-container">
              <img src={fireImg} alt="Streak" className="streak-icon" />
            </div>
            <div className="streak-count-container">
              <span className="streak-count">{creature.streak}</span>
            </div>
          </div>
        </div>
      </div>
      </li>
    </div>
  )
}

export default SampleCreature;
