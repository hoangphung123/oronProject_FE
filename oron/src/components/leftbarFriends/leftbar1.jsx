import "./leftbar1.scss"
const LeftBar1 = () => {
    const FriendsDataArray = [
        {
          userid: 135,
          username: "hoanghuy",
          imageURL: "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
          status: "online",
        },
        {
          userid: 134,
          username: "DinhThinh",
          imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
          status: "online",
        },
        {
          userid: 136,
          username: "DucHuy",
          imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
          status: "online",
        },
        {
            userid: 137,
            username: "hoanghuy1",
            imageURL: "https://i.pinimg.com/564x/3b/1a/6f/3b1a6f3340cc082e698456137522057a.jpg",
            status: "online",
        },
        {
            userid: 138,
            username: "DinhThinh1",
            imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
            status: "online",
        },
        {
            userid: 139,
            username: "DucHuy1",
            imageURL: "https://i.pinimg.com/564x/db/30/72/db3072aea296b6a96773e09a79880c54.jpg",
            status: "online",
        },
        // Add more user data as needed
   ];

  return (
    <div className="leftBar1">
      <div className="container">
        <hr />
        {/* Render user data from FriendsDataArray */}
        <div className="menu">
          {FriendsDataArray.map((friend) => (
            <div key={friend.userid} className="user">
              <img src={friend.imageURL} alt="" />
              <span>{friend.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftBar1