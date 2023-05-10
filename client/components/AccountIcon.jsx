import React, { useEffect, useState } from 'react';

const AccountIcon = () => {
  const [iconDimensions, setIconDimensions] = useState({
    width: '100%',
    maxWidth: '150px'
  });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 767) {
        setIconDimensions({
          width: '100%',
          maxWidth: '150px'
        });
      } else {
        setIconDimensions({
          width: '100%',
          maxWidth: '150px'
        });
      }
    };

    handleResize(); // Call once on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      role="img"
      fill="none"
      data-var="glyph"
      style={{ ...iconDimensions, display: 'inline-block' }}
    >
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3"
    ></path>
    <path
      stroke="currentColor"
      strokeWidth="2"
      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
    ></path>
  </svg>
  );
}

export default AccountIcon;
