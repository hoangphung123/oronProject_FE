

import { useState, useContext, useEffect } from "react";
import "./submenu.scss"; // Import your CSS file
import { PostsContext } from "../../context/postContext";
import * as Itemserver from "../../server/itemstore";



const Button = ({ categoryId, image, onClick }) => (
  <button className="button" style={{ backgroundImage: `url(${image})` }} onClick={() => onClick(categoryId)} />
);

const ButtonFrame = ({ buttonData }) => {
  return (
    <div className="button-frame-container">
      {buttonData.map((button, index) => (
        <Button key={index} categoryId={button.categoryId} image={button.image} onClick={button.onClick} />
      ))}
    </div>
  );
};

const CombinedComponent = () => {
  const { setPosts } = useContext(PostsContext);

  
  const handleButtonClick = async (categoryId) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      // Gọi hàm getPostByCategoryId và cập nhật state hoặc thực hiện các thao tác khác
      const posts = await Itemserver.getPostByCategoryId(categoryId, accessToken, 12);
      setPosts(posts.listData);
      // Thực hiện các thao tác khác nếu cần
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const buttonData = [
    { categoryId: "ed35da00-a982-4d4c-8bee-fbe029d232b1", image: 'https://img.icons8.com/ultraviolet/40/cat-footprint.png',  onClick: handleButtonClick },
    { categoryId: "aa062f2a-14fa-4abb-a822-9cbac97e0a63", image: 'https://img.icons8.com/ultraviolet/40/literature--v1.png',  onClick: handleButtonClick },
    { categoryId: "a830190e-c8dc-4e55-96f7-14bd760e9a86", image: 'https://img.icons8.com/ultraviolet/40/teddy-bear.png', onClick: handleButtonClick },
    { categoryId: "24c46936-1329-46d6-aa1b-3e324f804793", image: 'https://img.icons8.com/ultraviolet/40/plant-under-sun.png',  onClick: handleButtonClick },
    { categoryId: "af18fd57-069e-4a61-88e1-6e7f035bff89", image: 'https://img.icons8.com/ultraviolet/40/rice-bowl.png',  onClick: handleButtonClick },
    { categoryId: "95d55557-2ede-4ba4-a964-db971686908b", image: 'https://img.icons8.com/ultraviolet/40/shirt.png',  onClick: handleButtonClick },
    // Add more button data as needed
  ];

  return <ButtonFrame buttonData={buttonData} />;
};

export default CombinedComponent;
