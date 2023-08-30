'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { navData } from '../../data/navData';
import { menuCloseIcon, menuOpenIcon } from '../styles/iconComponents';
import {
  Avatar,
  Collapse,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  MTNavbar
} from '../tailwind/components';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);

  const navbarItemClasses =
    "flex items-center px-1 py-2 font-normal transition-all duration-250 text-size-sm text-current font-light lg:px-2 cursor-pointer";

  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  const throttleScroll = throttle(handleScroll, 50);

  useEffect(() => {
    window.addEventListener('scroll', throttleScroll);
    return () => window.removeEventListener('scroll', throttleScroll);
  }, [pageY]);

  const navbarMenu = <div className="flex w-full flex-col lg:flex-row xl:ml-40">
    <ul className={`${open ? "mt-4" : ""} mb-0 flex list-none flex-col gap-2 pl-0 text-inherit transition-all lg:ml-auto lg:flex-row lg:gap-4`}>
      { navData.map((nav, index) => {
        return <Menu placement="bottom" offset={-2.5} key={index}>
          <MenuHandler>
            <li>
              <span className={navbarItemClasses}>
                {nav.icon}
                <span className="ml-2">{nav.mainTitle}</span>
              </span>
            </li>
          </MenuHandler>
          <MenuList>
            {nav.children.map((cNav, index) => {
              return <MenuItem className="!p-0" key={index}>
                <Link href={`${nav.link}${cNav.cLink}`} className={`${navbarItemClasses} lg:px-3`}>
                  {cNav.title}
                </Link>
              </MenuItem>;
            })}
          </MenuList>
        </Menu>;
      })}
    </ul>
  </div>;

  return (
    <NavWrap>
      <MTNavbar className={`${hide && 'hide'} py-4 pl-6 pr-2 lg:py-2.5 shadow-2xl shadow-blue-gray-500/10`}>
        <WebNav>
          <Link href="/" className="py-2.375 text-size-sm mr-4 whitespace-nowrap font-bold text-inherit lg:ml-0">
            <ProfileImg>
              <Avatar alt="Hannah github profile image" src="https://avatars.githubusercontent.com/u/57277976?v=4"/>
              <h1>Hannah Blog</h1>
            </ProfileImg>
          </Link>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpen(!open)}
          >
            {open ? menuCloseIcon : menuOpenIcon}
          </IconButton>
          <MenuWrap>{navbarMenu}</MenuWrap>
        </WebNav>
        <Collapse open={open} className="text-[#1A237E]">
          {navbarMenu}
        </Collapse>
      </MTNavbar>
    </NavWrap>
  );
}

const throttle = (callback: any, waitTime: number) => {
  let timerId: NodeJS.Timeout | null;
  return (event: any) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, event);
      timerId = null;
    }, waitTime);
  };
};


const ProfileImg = styled.div`
  display: flex;

  h1 {
    margin-left: 1rem;
    font-size: 2rem;
    margin-top: 0.2rem;
    font-family: 'Sacramento', serif;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 0.8rem;
  }
`;

const NavWrap = styled.div`
  @media (min-width: 960px) {
    position: fixed;
  }

  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  flex-wrap: wrap;
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  max-width: 1320px;
  width: 100%;
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  z-index: 999;
  left: 50%;

  .hide {
    transform: translateY(-90px);
    transition: 1s;
  }
  
  .false {
    transition: 1s;
  }
`;

const MenuWrap = styled.div`
  @media (min-width: 960px) {
    display: flex;
  }

  overflow: hidden;
  align-items: center;
  flex-basis: 100%;
  flex-grow: 1;
`;

const WebNav = styled.div`
  --tw-text-opacity: 1;
  color: rgb(26 35 126 / var(--tw-text-opacity));
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  display: flex;
`;
