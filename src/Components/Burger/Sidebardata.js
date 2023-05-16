import React from 'react'
import {AiFillHome} from 'react-icons/ai';
import {BiLogIn} from 'react-icons/bi';
import {BsFillPersonPlusFill} from 'react-icons/bs';
import {BsPersonWorkspace} from 'react-icons/bs';
import {BiCategoryAlt} from 'react-icons/bi';
import {HiInformationCircle} from 'react-icons/hi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiFillHome/>,
    cName: 'sidenav_text'
  },
  {
    title: 'User Settings',
    path: '/user',
    icon: <BsFillPersonPlusFill/>,
    cName: 'sidenav_text sidenav_logged_in'
  },
  {
    title: 'Signin',
    path: '/signin',
    icon: <BsFillPersonPlusFill/>,
    cName: 'sidenav_text sidenav_before_login'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <BiLogIn/>,
    cName: 'sidenav_text sidenav_before_login'
  },
  {
    title: 'Near works',
    path: '/posts',
    icon: <BsPersonWorkspace/>,
    cName: 'sidenav_text'
  },
  {
    title: 'Categories',
    path: '/',
    icon: <BiCategoryAlt/>,
    cName: 'sidenav_text'
  },
  {
    title: 'Signout',
    path: '/signout',
    icon: <BsFillPersonPlusFill/>,
    cName: 'sidenav_text sidenav_logged_in'
  },
  {
    title: 'About',
    path: '/',
    icon: <HiInformationCircle/>,
    cName: 'sidenav_text'
  },
]
