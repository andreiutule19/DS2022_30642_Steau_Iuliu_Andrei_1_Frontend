import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';


export const SidebarData = [
  {
    title: 'Home alone',
    path: '/home',
    icon: <AiIcons.AiFillHome />
  },

  {
    title: 'Manage users',
    path: '',
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Change password',
        path: '/change',
        icon: <IoIcons.IoIosKey />
      },
      {
        title: 'List users',
        path: '/users',
        icon: <IoIcons.IoIosListBox />
      },
      
    ]
  },

  {
    title: 'List devices',
    path: '/devices',
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