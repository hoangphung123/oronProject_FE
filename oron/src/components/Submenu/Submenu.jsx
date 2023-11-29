import React from 'react';
import styled from 'styled-components';
import "./submenu.scss"
import aoImage from './ao.png';
import dochoiImage from './dochoi.png';
import petImage from './pet.png';
import thucanImage from './thucan.png'; // Đường dẫn tương đối đến ảnh
import tvImage from './tv.png';
import caycanhImage from './caycanh.png';



const SubmenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 90px;
  height: 100px;
  width: 1000px;
  background-color: themed("bg");
  background-size: cover;
  background-position: center;
  // background-repeat: no-repeat;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  `;

const SubmenuItem = styled.div`
  position: relative;
  cursor: pointer;
  width: ${({ itemWidth }) => itemWidth || '50px'};
  height: ${({ itemHeight }) => itemHeight || '50px'};
  border-radius: 8px;
  overflow: hidden;
`;

const SubmenuImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  z-index: 1;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px;
  z-index: 0;
`;

const SubmenuWrapper = styled.div`
`;

const submenuItems = [
  { path: '', action: () => console.log('Clicked on item 1'), image: caycanhImage },
  { path: '', action: () => console.log('Clicked on item 2'), image: aoImage },
  { path: '', action: () => console.log('Clicked on item 3'), image: dochoiImage },
  { path: '', action: () => console.log('Clicked on item 4'), image: petImage },
  { path: '', action: () => console.log('Clicked on item 5'), image: thucanImage },
  { path: '', action: () => console.log('Clicked on item 6'), image: tvImage },

  // Thêm các mục khác nếu cần
];

const Submenu = () => {
  const handleClick = (item) => {
    item.action();
    // Navigation code here
  };

  return (
    <SubmenuWrapper>
    <SubmenuContainer>
      <div>Outstanding products</div>
      {submenuItems.map((item, index) => (
        <SubmenuItem key={index} onClick={() => handleClick(item)}>
          <BackgroundImage style={{ backgroundImage: `url(${item.image})` }} />
          <SubmenuImage src={item.image} alt={`Item ${index + 1}`} />
        </SubmenuItem>
      ))}
    </SubmenuContainer>
    </SubmenuWrapper>

  );
};

export default Submenu;