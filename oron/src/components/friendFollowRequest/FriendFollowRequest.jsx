import React from 'react';
import './FriendPage.scss';

const FriendPage = ({ type }) => {
  const followData = [
    { name: 'Kaito Kid', imageUrl: 'path/to/image1.jpg' },
    { name: 'Kaito Kid', imageUrl: 'path/to/image2.jpg' },
    // Add more entries as needed for 'Follow'
  ];

  const followerData = [
    { name: 'Kaito Kid', imageUrl: 'path/to/image3.jpg' },
    { name: 'Kaito Kid', imageUrl: 'path/to/image4.jpg' },
    // Add more entries as needed for 'Follower'
  ];

  const friendRequestData = [
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    { name: 'Kaito Kid', imageUrl: 'https://i.pinimg.com/736x/72/97/27/72972758f5bda534b5aeda6c58eaf6a8.jpg' },
    // Add more entries as needed for 'FriendRequest'
  ];

  let data;
  let showAcceptButton = false;

  if (type === 'follow') {
    data = followData;
  } else if (type === 'follower') {
    data = followerData;
  } else if (type === 'friendRequest') {
    data = friendRequestData;
    showAcceptButton = true;
  }

  return (
    <div className="friend-container">
      <h2>{type === 'follow' ? 'Follow' : type === 'follower' ? 'Follower' : 'Friend Request'}</h2>
      <div className="friend-request-container">
        {data.map((person, index) => (
          <div key={index} className="friend-request-card">
            <img src={person.imageUrl} alt={person.name} className="friend-request-image" />
            <h3 className="friend-request-name">{person.name}</h3>
            {showAcceptButton && <button className="accept-button">Accept</button>}
            <button className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendPage;