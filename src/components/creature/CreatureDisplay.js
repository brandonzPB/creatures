import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './creature.css';
import CountUp from 'react-countup';
import { CreatureContext } from '../../contexts/CreatureContext';

const CreatureDisplay = ({ creature, displayCreatureObjectives }) => {
  const { currentId } = useContext(CreatureContext);
  const spriteSrc = require(`../../sprites/pkmnXY/${creature.creature.toLowerCase()}.gif`);

  let fireImg;
  
  if (creature.streak_count === 0) {
    fireImg = require('../../images/fire_end.jpg');
  } else {
    fireImg = require('../../images/fire2.jpg');
  }

  return (
    <div className="creature-display">
      <li style={{
        listStyleType: 'none'
      }}>
      <div className="header-container">
        <div className="creature-name">
          <h2>{creature.creature_name}</h2>
        </div>

        <div className="creature-purpose-name">
          <h3 style={{
            fontStyle: 'italic'
          }}>{creature.purpose_name}</h3>
        </div>

        <div className="creature-level">
          <h4>Lv. {creature.level}</h4>
        </div>
      </div>

      <div className="creature-sprite">
        <img src={spriteSrc} alt="Creature sprite"/>
      </div>

      <div className="footer-container">
        <div className="exp-container">
          <div className="creature-exp">
            <h5>
              <CountUp 
                start={creature.prev_exp_goal}
                end={creature.exp}
                duration={1.00}
              /> / <CountUp 
                start={creature.prev_exp_goal}
                end={creature.exp_goal}
                duration={1.00}
              /> Exp
            </h5>
          </div>

          <div className="exp-bar">
            <div 
              className="exp-filled">
              <div className="exp-animation"
                style={{
                width: `${(creature.exp_surplus / (creature.exp_goal - creature.prev_exp_goal)) * 150}px`,
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
              currentId ?
                <Link to="/creature/update">
                  <button className="view-info-btn">Edit Creature</button>
                </Link> :
                <Link to="/creature/info">
                  <button className="view-info-btn" onClick={displayCreatureObjectives}>View Info</button>
                </Link>
            }
          </div>
        </div>
          

        <div className="streak-container-fluid">
          <div className="streak-container">
            <div className="streak-icon-container">
              <img src={fireImg} alt="Streak" className="streak-icon" />
            </div>
            <div className="streak-count-container">
              <span className="streak-count">{creature.streak_count}</span>
            </div>
          </div>
        </div>
      </div>
      </li>
    </div>
  )
}

export default CreatureDisplay;
