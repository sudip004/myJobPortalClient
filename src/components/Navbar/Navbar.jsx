import React, { useState } from 'react'
import './navbar.css'
import Divider from '../divider/Divider'
import { IoSettingsOutline, IoNotificationsOutline, IoSearch } from "react-icons/io5"
import { SlLocationPin } from "react-icons/sl"
import { BsFillBackpack4Fill } from "react-icons/bs"
import { RiMoneyRupeeCircleLine } from "react-icons/ri"
import { FiFilter, FiX } from "react-icons/fi"
import { Link, useLocation } from 'react-router-dom'
import { BiSolidDownArrow } from "react-icons/bi"

const Navbar = ({ curUser, filters, setFilters, resetFilters, totalJobs, filteredCount }) => {
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const handleSalaryChange = (e) => {
        setFilters(prev => ({ ...prev, salary: parseInt(e.target.value) }))
    }

    const handleExperienceChange = (value) => {
        setFilters(prev => ({ ...prev, experienceLevel: value }))
        setOpen2(false)
    }

    const handleLocationChange = (value) => {
        setFilters(prev => ({ ...prev, location: value }))
        setOpen1(false)
    }

    const handleRoleonChange = (value) => {
        setFilters(prev => ({ ...prev, role: value }))
        setOpen(false)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setFilters(prev => ({ ...prev, searchTerm: searchInput }))
    }

    const clearSearch = () => {
        setSearchInput('')
        setFilters(prev => ({ ...prev, searchTerm: '' }))
    }

    const hasActiveFilters = filters.salary > 1 || filters.location || filters.experienceLevel || filters.role || filters.searchTerm

    return (
        <div className="navContainer">
            <div className="navheader">
                <h2 className='navlogo'>JOB PLANET</h2>
                <div className='headerlinks'>
                    <Link to={"/home"}>
                        <span style={pathname === '/home' ? { color: "#6366f1", borderBottom: "2px solid #6366f1" } : {}}>
                            Find Jobs
                        </span>
                    </Link>
                    <Link to={"/hiring"}>
                        <span style={pathname === '/hiring' ? { color: "#6366f1", borderBottom: "2px solid #6366f1" } : {}}>
                            Create Job
                        </span>
                    </Link>
                    <Link to={"/adminpanel"}>
                        <span style={pathname === '/adminpanel' ? { color: "#6366f1", borderBottom: "2px solid #6366f1" } : {}}>
                            Admin Panel
                        </span>
                    </Link>
                    <Link to={"/faq"}>
                        <span style={pathname === '/faq' ? { color: "#6366f1", borderBottom: "2px solid #6366f1" } : {}}>
                            FAQ
                        </span>
                    </Link>
                    <Link to={"/applied"}>
                        <span style={pathname === '/applied' ? { color: "#6366f1", borderBottom: "2px solid #6366f1" } : {}}>
                            Applied
                        </span>
                    </Link>
                </div>
                <div className="headerProfiles">
                    <div className="prifilePic">
                        <img src={curUser?.profilePic} alt="Profile" />
                    </div>
                    <div className="settingicon">
                        <IoSettingsOutline className='settingiconedit' />
                    </div>
                    <div className="Allerm">
                        <IoNotificationsOutline className='settingiconedit' />
                    </div>
                </div>
            </div>

            <Divider />

            {/* Search Bar */}
            <div className="searchBarContainer">
                <form onSubmit={handleSearchSubmit} className="searchForm">
                    <IoSearch className="searchIcon" />
                    <input
                        type="text"
                        placeholder="Search jobs by title, company, or description..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="searchInput"
                    />
                    {searchInput && (
                        <button type="button" onClick={clearSearch} className="clearButton">
                            <FiX />
                        </button>
                    )}
                </form>
                <div className="jobCount">
                    Showing <span>{filteredCount}</span> of <span>{totalJobs}</span> jobs
                </div>
            </div>

            <div className="navbodyContainerr">
                <div className="navsections" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                    <div className="Allerm"><IoSearch className='settingiconedit' /></div>
                    <p>{filters.role || 'Role'}</p>
                    <div className="menuErapper">
                        <BiSolidDownArrow className='downArrowIcon' />
                        {open && (
                            <div className={"openmenuonHover"}>
                                <p onClick={() => handleRoleonChange("Developer")}>Developer</p>
                                <p onClick={() => handleRoleonChange("Tester")}>Tester</p>
                                <p onClick={() => handleRoleonChange("Devops")}>DevOps</p>
                                <p onClick={() => handleRoleonChange("Designer")}>Designer</p>
                                <p onClick={() => handleRoleonChange("Manager")}>Manager</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="navsections" onMouseEnter={() => setOpen1(true)} onMouseLeave={() => setOpen1(false)}>
                    <div className="Allerm"><SlLocationPin className='settingiconedit' /></div>
                    <p>{filters.location || 'Location'}</p>
                    <div className="menuErapper">
                        <BiSolidDownArrow className='downArrowIcon' />
                        {open1 && (
                            <div className={"openmenuonHover"}>
                                <p onClick={() => handleLocationChange("India")}>India</p>
                                <p onClick={() => handleLocationChange("USA")}>USA</p>
                                <p onClick={() => handleLocationChange("London")}>London</p>
                                <p onClick={() => handleLocationChange("Canada")}>Canada</p>
                                <p onClick={() => handleLocationChange("Remote")}>Remote</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="navsections" onMouseEnter={() => setOpen2(true)} onMouseLeave={() => setOpen2(false)}>
                    <div className="Allerm"><BsFillBackpack4Fill className='settingiconedit' /></div>
                    <p>{filters.experienceLevel || 'Experience'}</p>
                    <div className="menuErapper">
                        <BiSolidDownArrow className='downArrowIcon' />
                        {open2 && (
                            <div className={"openmenuonHover"}>
                                <p onClick={() => handleExperienceChange("Entry Level")}>Entry Level</p>
                                <p onClick={() => handleExperienceChange("Mid Level")}>Mid Level</p>
                                <p onClick={() => handleExperienceChange("Senior Level")}>Senior Level</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="navsections">
                    <div className="Allerm"><RiMoneyRupeeCircleLine className='settingiconedit' /></div>
                    <p>₹{filters.salary} LPA+</p>
                </div>

                <div className="range">
                    <input
                        type="range"
                        id="salaryRange"
                        min="1"
                        max="80"
                        step="1"
                        value={filters.salary}
                        onChange={handleSalaryChange}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {hasActiveFilters && (
                    <button className="resetFiltersBtn" onClick={resetFilters}>
                        <FiFilter /> Reset Filters
                    </button>
                )}
            </div>
        </div>
    )
}

export default Navbar