import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarDataUser = [
  {
    title: 'Home alone',
    path: '/homeUser',
    icon: <AiIcons.AiFillHome />
  },

  {
    title: 'Change password',
    path: '',
    icon: <IoIcons.IoIosKey />,
  },

  {
    title: 'My devices',
    path: '/associated',
    icon: <IoIcons.IoIosSettings />
  },
      
  {
    title: 'Support',
    path: '',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Log Out',
    path: '/',
    icon: <IoIcons.IoMdLogOut />
  
  }
];