import React from "react";
import "./rankingNew.scss"; // Tạo và import file SCSS này để áp dụng style
import Ranking1 from "./3da1c204207bec1124d5a7c8f94534-unscreen.gif";
import Ranking2 from "./pngwing.png";
import Ranking3 from "./pngwing2.png";

const data = [
  {
    position: 1,
    name: "Phung Huy Hoang",
    rating: 5,
    imageUrl:
      "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg",
  },
  {
    position: 2,
    name: "Xuan Loc Nguyen",
    rating: 5,
    imageUrl:
      "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg",
  },
  {
    position: 3,
    name: "Nguyen Dinh Thinh",
    rating: 5,
    imageUrl:
      "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg",
  },
  {
    position: 4,
    name: "Xuan ",
    rating: 5,
    imageUrl:
      "https://i.pinimg.com/564x/da/52/81/da52815da1578cbe48e9bf62145374b6.jpg",
  },
  // Add more user data as needed
];

const RankingNew = () => {
  const reorderedData = [data[1], data[0], data[2]];
  return (
    <div className="ranking-container">
      <div className="ranking-content">
        <h2>Ranking</h2>
        <div className="top-ranking">
          {reorderedData.slice(0, 3).map((user, index) => (
            <div key={index} className={`top-user top-${index + 1}`}>
              {index === 0 && ( // Top-1
                <img
                  src={Ranking3}
                  alt="Ranking Decoration"
                  className="ranking-decoration1"
                />
              )}
              {index === 1 && ( // Top-2
                <img
                  src={Ranking1}
                  alt="Ranking Decoration"
                  className="ranking-decoration"
                />
              )}
              {index === 2 && ( // Top-3
                <img
                  src={Ranking2}
                  alt="Ranking Decoration"
                  className="ranking-decoration2"
                />
              )}
              <div className="img-container">
                <img
                  src={user.imageUrl}
                  alt={user.name}
                  className="user-image"
                />
              </div>
              <p className="user-name">
                {user.name} {user.rating} <span className="star">★</span>
              </p>
            </div>
          ))}
        </div>
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>User Name</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>
                  {user.position === 1
                    ? "🥇"
                    : user.position === 2
                    ? "🥈"
                    : user.position === 3
                    ? "🥉"
                    : user.position}
                </td>
                <td>
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="table-user-image"
                  />
                  {user.name}
                </td>
                <td>
                  {user.rating} <span className="star">★</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>6</button>
        </div>
      </div>
    </div>
  );
};

export default RankingNew;
