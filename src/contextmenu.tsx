// components/ContextMenu.tsx
import React from 'react';
import { Menu, Item, Separator, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

interface MyContextMenuProps {
  id: string;
}

const MyContextMenu: React.FC<MyContextMenuProps> = ({ id }) => {
  const handleItemClick = ({ event, props, triggerEvent, data }: any) => {
    console.log(`Clicked on "${props.id}"`);
    // You can perform actions based on the clicked item here
  };

  return (
    <Menu id={id} animation={false} onShow={contextMenu.hideAll}>
      <Item onClick={handleItemClick}>Item 1</Item>
      <Item onClick={handleItemClick}>Item 2</Item>
      <Separator />
      <Item onClick={handleItemClick}>Item 3</Item>
    </Menu>
  );
};

export default MyContextMenu;



import React from 'react';
import MyContextMenu from '../components/ContextMenu';

const Home: React.FC = () => {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    contextMenu.show({
      id: 'main-context-menu',
      event,
    });
  };

  return (
    <div onContextMenu={handleContextMenu}>
      Right-click me!
      <MyContextMenu id="main-context-menu" />
    </div>
  );
};

export default Home;