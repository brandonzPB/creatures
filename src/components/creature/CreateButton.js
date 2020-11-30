import React, { useContext } from 'react';
import { CreatureContext } from '../../contexts/CreatureContext';

const CreateButton = () => {
  const { creatures } = useContext(CreatureContext);
  
  return (
    <div className="create-btn-container">
      <button className="create-btn">
        New Creature
      </button>
    </div>
  )
}

export default CreateButton;
