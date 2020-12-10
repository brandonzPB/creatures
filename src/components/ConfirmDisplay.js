import React, { useContext } from 'react';
import { ConfirmDisplayContext } from '../contexts/ConfirmDisplayContext';

const ConfirmDeleteCreature = ({ sendDelete }) => {
  const { confirmDisplay, toggleConfirmDisplay, } = useContext(ConfirmDisplayContext);
  
  const confirmDelete = (event) => {
    event.preventDefault();
    toggleConfirmDisplay();
    sendDelete();
  }

  return (
    <div className="confirm-delete" style={{
      display: confirmDisplay.confirmIsDisplayed ? 'flex' : 'none',
    }}>
      <form className="delete-form" onSubmit={confirmDelete}>
        <button className="delete-btn">CONFIRM DELETE</button>
      </form>
    </div>
  )
}

export default ConfirmDeleteCreature;
