import React, { useState } from 'react';

const SwitchComponent = () => {
  const [isLightOff, setLightOff] = useState(false);

  const toggleLight = () => {
    setLightOff(!isLightOff);
  };

  return (
    <div className="switch-component" onClick={toggleLight}>
      <div className={`switch-button ${isLightOff ? 'dark' : ''}`}></div>
      {isLightOff && <div className="dark-overlay"></div>}
    </div>
  );
};

export default SwitchComponent;
