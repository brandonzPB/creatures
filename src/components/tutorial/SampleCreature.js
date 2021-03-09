import React from 'react';
import duck from '../../sprites/pkmnXY/porygon2-retro.gif';

const SampleCreature = () => {
  return (
    <div id="sample-creature__container">
      <div id="display__container">
        <img src={duck} alt="Gif of the Pokemon Porygon2" />
      </div>
    </div>
  )
}

export default SampleCreature;
