import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #2A293D;
  height: 45px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 1px 1px;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #2A293D;
  width: 275px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
 
`;

const SidebarWrap = styled.div`
  width: 100%;
  
`;

const Heady = styled.h6`
  flex:0.6;
  padding-top: 7px;
  text-align:center;

  
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className='full-screen bg-home'>
      <div className='main-container'>
        <IconContext.Provider value={{ color: '#fff' }}>

          <Nav>
            <NavIcon to='#'>
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
            <Heady style={{ color: '#fff' }}>Hi, ADMIN {sessionStorage.getItem("NAME")}</Heady>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>

        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Sidebar;