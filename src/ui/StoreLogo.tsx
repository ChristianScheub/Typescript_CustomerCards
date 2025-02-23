import React from 'react';
import ikeaLogo from '../assets/store-logos/ikea.svg';
import mediamarktLogo from '../assets/store-logos/mediamarkt.svg';
// Weitere Logos importieren

const storeLogos: { [key: string]: string } = {
  ikea: ikeaLogo,
  mediamarkt: mediamarktLogo,
  // Weitere Mappings
};

interface StoreLogoProps {
  storeId: string;
  size?: 'small' | 'medium' | 'large';
}

export const StoreLogo = ({ storeId, size = 'medium' }: StoreLogoProps) => {
  const logo = storeLogos[storeId] || storeLogos.default;

  return (
    <img 
      src={logo} 
      alt={`${storeId} logo`} 
      className={`store-logo ${size}`}
    />
  );
};