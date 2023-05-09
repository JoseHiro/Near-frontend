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
    cName: 'nav_text'
  },
  {
    title: 'SignIn',
    path: '/signin',
    icon: <BsFillPersonPlusFill/>,
    cName: 'nav_text'
  },
  {
    title: 'LogIn',
    path: '/login',
    icon: <BiLogIn/>,
    cName: 'nav_text'
  },
  {
    title: 'Work',
    path: '/login',
    icon: <BsPersonWorkspace/>,
    cName: 'nav_text'
  },
  {
    title: 'Categories',
    path: '/',
    icon: <BiCategoryAlt/>,
    cName: 'nav_text'
  },
  {
    title: 'About',
    path: '/',
    icon: <HiInformationCircle/>,
    cName: 'nav_text'
  },
]
