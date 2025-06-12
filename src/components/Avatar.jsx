import React from 'react';

const Avatar = ({ imageUrl, userName, size }) => {
  const initials = userName
    ? userName
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
    : '';

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-[#444] ${size} rounded-full`}>
      {imageUrl ? (
        <img className={`object-cover object-center ${size} rounded-full`} src={imageUrl} alt={userName ? `${userName}'s avatar` : 'User avatar'} />
      ) : (
        <span className="font-medium text-white">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;