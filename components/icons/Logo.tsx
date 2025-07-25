import React from 'react';

type Logo = React.SVGProps<SVGSVGElement>

const Logo: React.FC<Logo> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M28 7C28 5.34315 26.6569 4 25 4H19C17.3431 4 16 5.34315 16 7V12.8915C15.9999 12.9275 15.9998 12.9637 15.9998 13C15.9998 14.6545 14.6605 15.9961 13.0069 16C13.0046 16 13.0023 16 13 16H7C5.34314 16 4 17.3431 4 19V25C4 26.6569 5.34314 28 7 28H13C14.6569 28 16 26.6569 16 25V19C16 18.9917 16 18.9834 15.9999 18.9751C16.0133 17.3297 17.3513 16 18.9998 16C19.0076 16 19.0153 16 19.023 16H25C26.6569 16 28 14.6569 28 13V7Z"
        fill="white"
      />
    </svg>
  );
};

export default Logo;
