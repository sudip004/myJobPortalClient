import React, { useState } from 'react'
import './navbar.css'
import Divider from '../divider/Divider'
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { BsFillBackpack4Fill } from "react-icons/bs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom'
import { BiSolidDownArrow } from "react-icons/bi";

const Navbar = ({ curUser, filters, setFilters }) => {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
      

    const handleSalaryChange = (e) => {
        setFilters(prev => ({ ...prev, salary: parseInt(e.target.value) }));
    };

    const handleExperienceChange = (value) => {
        setFilters(prev => ({ ...prev, experienceLevel: value }));
    };

    const handleLocationChange = (value) => {
        setFilters(prev => ({ ...prev, location: value }));
    };
    const handleRoleonChange = (value) => {
        setFilters(prev => ({ ...prev, Role: value }));
    };
    // default value
    return (
        <div className="navContainer">
            <div className="navheader">
                <h2 className='navlogo'> J0B Dakho</h2>
                <div className='headerlinks'>
                    <Link to={"/home"}><span style={pathname == '/home' ? { color: "#DAA520", borderBottom: "2px solid #DAA520" } : {}}>Find JoB</span></Link>
                    <Link to={"/hiring"}><span style={pathname == '/hiring' ? { color: "#DAA520", borderBottom: "2px solid #DAA520" } : {}}>Create JOB</span></Link>
                    <Link to={"/adminpanel"}><span style={pathname == '/socialmedia' ? { color: "#DAA520", borderBottom: "2px solid #DAA520" } : {}}>Admin Panel</span></Link>
                    <Link to={"/faq"}><span style={pathname == '/faq' ? { color: "#DAA520", borderBottom: "2px solid #DAA520" } : {}}>FaQ</span></Link>
                    <Link to={"/applied"}><span style={pathname == '/applied' ? { color: "#DAA520", borderBottom: "2px solid #DAA520" } : {}}>Applied</span></Link>
                </div>
                <div className="headerProfiles">
                    <div className="prifilePic"><img src={curUser?.profilePic} alt="" /></div>
                    <div className="settingicon"><IoSettingsOutline className='settingiconedit' /></div>
                    <div className="Allerm"> <IoMdNotificationsOutline className='settingiconedit' /></div>
                </div>
            </div>

            <Divider />

            <div className="navbodyContainerr">
                <div className="navsections" onMouseLeave={() => setOpen(false)}>
                    <div className="Allerm"><IoSearch className='settingiconedit' /></div>
                    <p>Disigner</p>
                    <div className="menuErapper" onMouseEnter={() => setOpen(true)} >
                        <BiSolidDownArrow className='downArrowIcon' />
                        {
                            open && (
                                <div className={"openmenuonHoverONE"}>
                                    <p onClick={()=>handleRoleonChange("Developer")}>Developer</p>
                                    <p onClick={()=>handleRoleonChange("Tester")}>Tester</p>
                                    <p onClick={()=>handleRoleonChange("Devops")}>DevOps</p>
                                    
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="navsections" onMouseLeave={() => setOpen1(false)}>
                    <div className="Allerm"><SlLocationPin className='settingiconedit' /></div>
                    <p>Work-Locations</p>
                    <div className="menuErapper" onMouseEnter={() => setOpen1(true)} >
                        <BiSolidDownArrow className='downArrowIcon'  />
                        {
                            open1 && (
                                <div className={"openmenuonHover"}>
                                    <p onClick={()=>handleLocationChange("India")}>India</p>
                                    <p onClick={()=>handleLocationChange("USA")}>USA</p>
                                    <p onClick={()=>handleLocationChange("Londan")}>London</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="navsections" onMouseLeave={() => setOpen2(false)}>
                    <div className="Allerm" ><BsFillBackpack4Fill className='settingiconedit' /></div>
                    <p>Experience</p>
                    <BiSolidDownArrow className='downArrowIcon' onMouseEnter={() => setOpen2(true)} />
                    {
                        open2 && (
                            <div className={"openmenuonHover"}>
                                <p onClick={()=>handleExperienceChange("Entry Level")}>Junior Level</p>
                                    <p onClick={()=>handleExperienceChange("Mid Level")}>Mid Level</p>
                                    <p onClick={()=>handleExperienceChange("Senior Level")}>Senior Level</p>
                            </div>
                        )
                    }
                </div>
                <div className="navsections">
                    <div className="Allerm"> <RiMoneyRupeeCircleLine className='settingiconedit' /></div>
                    <p>per Month</p>
                </div>
                <div className="range">
                    <label htmlFor="salaryRange">Salary LPA: ₹{filters.salary}</label>
                    <input
                        type="range"
                        id="salaryRange"
                        min="1"
                        max="80"
                        step="1"
                        value={filters.salary}
                        onChange={handleSalaryChange}
                        style={{cursor:'pointer'}}
                    />
                </div>

            </div>

        </div>
    )
}

export default Navbar