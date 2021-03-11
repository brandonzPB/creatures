import React, { useContext } from 'react';
import { TutorialContext } from '../../contexts/TutorialContext';

import duckSauce from '../../sprites/pkmnXY/porygon2-retro.gif';
import { tutorial as tutorialScript } from '../../modules/tutorial';

import './duck.css';

const Duck = () => {
  const { tutorial, advanceScript } = useContext(TutorialContext);

  return (
    <div id="duck">
      <img src={duckSauce} alt="Gif of the Pokemon Porygon2" id="duck-img" />

      <div id="duck-text__container">
        <span id="duck-text">{tutorialScript[tutorial.index].text}</span>
        <button id="text-btn" onClick={advanceScript}>Next</button>
      </div>
    </div>
  )
}

export default Duck;
