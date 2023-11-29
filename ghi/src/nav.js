'use client';
import { NavLink } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiArrowSmLeft , HiChevronDoubleUp , HiChartBar , HiTable } from 'react-icons/hi';
import { MdOutlineGridView } from "react-icons/md";
import { BiSolidJoystick } from "react-icons/bi";
import { FaFire } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

function Nav() {
    return (
    <div className="sidebar">
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item  href="/" icon={HiChartBar }>
           Level Up Reviews
          </Sidebar.Item>
          <Sidebar.Item  icon={FaFire }>
            New Releases
          </Sidebar.Item>
          <Sidebar.Item  icon={HiChevronDoubleUp }>
            Top Rated
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiSolidJoystick} label="Platforms">
            <Sidebar.Item >Xbox</Sidebar.Item>
            <Sidebar.Item >PS5</Sidebar.Item>
            <Sidebar.Item >Switch</Sidebar.Item>
            <Sidebar.Item >PC</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={MdOutlineGridView} label="Genres">
            <Sidebar.Item >Products</Sidebar.Item>
            <Sidebar.Item >Sales</Sidebar.Item>
            <Sidebar.Item >Refunds</Sidebar.Item>
            <Sidebar.Item >Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item  icon={ImProfile}>
            My Profile
          </Sidebar.Item>
          <Sidebar.Item  icon={HiArrowSmRight}>
            Log In
          </Sidebar.Item>
          <Sidebar.Item  icon={HiArrowSmLeft }>
            Log out
          </Sidebar.Item>
          <Sidebar.Item href="signup"  icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}

export default Nav;
