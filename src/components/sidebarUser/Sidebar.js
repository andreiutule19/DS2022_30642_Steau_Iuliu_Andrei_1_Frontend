import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarDataUser } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import  SockJS  from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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
  flex:0.1;
  padding-top: 8px;
  text-align:center;

  
`;

const SidebarUser = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const [open, setOpen] = React.useState(false);

  const [mess, setMess] = React.useState("");


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // async function connect() {
  //   var socket = new SockJS('https://localhost:8443/api/websocket');
  //   let stompClient = Stomp.over(socket);  
  //   stompClient.connect({}, function (frame) {
  //     stompClient.subscribe('/topic/events', function (messageOutput) {
  //       const msg = JSON.parse(messageOutput.body);
  //       if (msg.email === sessionStorage.getItem("EMAIL")) {
  //         setMess(msg.fullName+", the max energy for device with ID "+msg.deviceId+" has been EXCEDEED with "+msg.overflow)
  //         setOpen(true);
  //       }
  //       console.log(msg.fullName)
          
  //       });
  //   });
  // }
  
  // useEffect(() => {
  //   connect();
  // },[])
 

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <div className='full-screen bg-home'>
      <div className='main-container'>
        <IconContext.Provider value={{ color: '#fff' }}>

          <Nav>
            <NavIcon to='#'>
              <FaIcons.FaBars onClick={showSidebar} />
            </NavIcon>
            <Heady></Heady>
            <Heady>
             
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  {mess}
                </Alert>
                
              </Snackbar>
            </Heady>
            <Heady style={{ color: '#fff' }}>Hi, {sessionStorage.getItem("NAME")}</Heady>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarDataUser.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>

        </IconContext.Provider>
      </div>
    </div>
  );
};

export default SidebarUser;