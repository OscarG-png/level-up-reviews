import React from 'react';

const imagesContext = require.context('./', false, /\.(png|jpe?g|svg)$/);
const MyImage = imagesContext('./logo-color.png');
function LogoComponent() {
  return (
    <div>
      <h1>Your Logo Component</h1>
      <img src="/logo-color.png" alt="Logo" />
    </div>
  );
}

export default LogoComponent;
