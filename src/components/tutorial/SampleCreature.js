import React, { useContext } from 'react';
import CountUp from 'react-countup';
import { UserContext } from '../../contexts/UserContext';
import { TutorialContext } from '../../contexts/TutorialContext';

const SampleCreature = () => {
  const { setDest } = useContext(UserContext);

  const { sampleCreature, setSampleCreature } = useContext(TutorialContext);
  const creature = sampleCreature;

  let spriteSrc = creature.creature.trim()
    ? require(`../../sprites/pkmnXY/${creature.creature.toLowerCase()}.gif`)
    : '';

  let fireImg;
  
  if (creature.streak === 0) {
    fireImg = require('../../images/fire_end.jpg');
  } else {
    fireImg = require('../../images/fire2.jpg');
  }

  const viewObjectives = () => {
    setSampleCreature({
      ...sampleCreature,
      showObjectives: true
    });

    return setDest('tutorialObjectives');
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
              creature.showObjectives
                ? <button className="view-info-btn" onClick={() => setDest('tutorialUpdate')}>Edit Creature</button>
                : <button className="view-info-btn" onClick={viewObjectives}>View Info</button>
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
