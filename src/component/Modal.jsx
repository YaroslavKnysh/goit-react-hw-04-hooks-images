import React, { useEffect } from 'react';

const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      console.log('modal close');
      props.onCloseModal();
    }
  }
  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      props.onCloseModal();
    }
  }

  return (
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={props.largeImage} alt="" />
      </div>
    </div>
  );
};

export default Modal;
