import React, { useState, useMemo } from 'react'
import './bosyHome.css'
import Card from '../Card/Card'
import { coloeArr } from '../../utils/colorCodeApi'
import ZustandStore from '../../Zustand/ZustandStore'
import { FiFilter, FiBriefcase, FiClock, FiTrendingDown, FiCalendar, FiDollarSign, FiChevronDown } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

const BodyHome = ({ data, isLoading }) => {
    const user = ZustandStore(state => state.user)
    const [workingSchedule, setWorkingSchedule] = useState({
        fullTime: false,
        partTime: false,
        internship: false,
        projectWork: false
    })
    const [sortBy, setSortBy] = useState('lastUpdate')
    const [showSortMenu, setShowSortMenu] = useState(false)

    const handleScheduleChange = (type) => {
        setWorkingSchedule(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const clearAllFilters = () => {
        setWorkingSchedule({
            fullTime: false,
            partTime: false,
            internship: false,
            projectWork: false
        })
    }

    const hasActiveFilters = Object.values(workingSchedule).some(val => val)

    // Filter and sort jobs
    const filteredAndSortedJobs = useMemo(() => {
        let filtered = data || []

        // Apply working schedule filters
        if (hasActiveFilters) {
            filtered = filtered.filter(job => {
                const schedule = job.workingSchedule?.toLowerCase() || ''
                if (workingSchedule.fullTime && schedule.includes('full')) return true
                if (workingSchedule.partTime && schedule.includes('part')) return true
                if (workingSchedule.internship && schedule.includes('intern')) return true
                if (workingSchedule.projectWork && schedule.includes('project')) return true
                return false
            })
        }

        // Sort jobs
        const sorted = [...filtered]
        switch(sortBy) {
            case 'lastUpdate':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                break
            case 'salaryHigh':
                sorted.sort((a, b) => (b.money || 0) - (a.money || 0))
                break
            case 'salaryLow':
                sorted.sort((a, b) => (a.money || 0) - (b.money || 0))
                break
            case 'experienceLevel':
                const levelOrder = { 'entry level': 1, 'mid level': 2, 'senior level': 3 }
                sorted.sort((a, b) => {
                    const aLevel = levelOrder[a.experienceLevel?.toLowerCase()] || 0
                    const bLevel = levelOrder[b.experienceLevel?.toLowerCase()] || 0
                    return aLevel - bLevel
                })
                break
            default:
                break
        }

        return sorted
    }, [data, workingSchedule, sortBy, hasActiveFilters])

    const sortOptions = [
        { value: 'lastUpdate', label: 'Last Update', icon: FiCalendar },
        { value: 'salaryHigh', label: 'Salary: High to Low', icon: FiTrendingDown },
        { value: 'salaryLow', label: 'Salary: Low to High', icon: FiDollarSign },
        { value: 'experienceLevel', label: 'Experience Level', icon: FiBriefcase }
    ]

    const selectedSort = sortOptions.find(opt => opt.value === sortBy)

    return (
        <div className='bodyHomeContainer'>
            <div className="leftboxContainer">
                <div className="filterHeader">
                    <div className="filterTitle">
                        <FiFilter />
                        <h3>Filters</h3>
                    </div>
                    {hasActiveFilters && (
                        <button className="clearFiltersBtn" onClick={clearAllFilters}>
                            <IoClose /> Clear
                        </button>
                    )}
                </div>

                <div className="leftSideBodyContainer-1">
                    <div className="filterSection">
                        <div className="filterSectionTitle">
                            <FiClock />
                            <p>Working Schedule</p>
                        </div>
                        <div className='checkboxFilter'>
                            <label className="customCheckbox">
                                <input 
                                    type="checkbox" 
                                    checked={workingSchedule.fullTime}
                                    onChange={() => handleScheduleChange('fullTime')}
                                />
                                <span className="checkmark"></span>
                                <span className="checkboxLabel">Full Time</span>
                            </label>
                            <label className="customCheckbox">
                                <input 
                                    type="checkbox" 
                                    checked={workingSchedule.partTime}
                                    onChange={() => handleScheduleChange('partTime')}
                                />
                                <span className="checkmark"></span>
                                <span className="checkboxLabel">Part Time</span>
                            </label>
                            <label className="customCheckbox">
                                <input 
                                    type="checkbox" 
                                    checked={workingSchedule.internship}
                                    onChange={() => handleScheduleChange('internship')}
                                />
                                <span className="checkmark"></span>
                                <span className="checkboxLabel">Internship</span>
                            </label>
                            <label className="customCheckbox">
                                <input 
                                    type="checkbox" 
                                    checked={workingSchedule.projectWork}
                                    onChange={() => handleScheduleChange('projectWork')}
                                />
                                <span className="checkmark"></span>
                                <span className="checkboxLabel">Project Work</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rightboxContainer">
                <div className="homebodyHeadding">
                    <h2>
                        Recommended Jobs 
                        <span className="jobCountBadge">{filteredAndSortedJobs?.length || 0}</span>
                    </h2>
                    <div className="sortContainer">
                        <div 
                            className="sortButton" 
                            onClick={() => setShowSortMenu(!showSortMenu)}
                        >
                            Sort By: <span>{selectedSort?.label}</span>
                            <FiChevronDown className={showSortMenu ? 'rotated' : ''} />
                        </div>
                        {showSortMenu && (
                            <div className="sortDropdown">
                                {sortOptions.map(option => {
                                    const Icon = option.icon
                                    return (
                                        <div 
                                            key={option.value}
                                            className={`sortOption ${sortBy === option.value ? 'active' : ''}`}
                                            onClick={() => {
                                                setSortBy(option.value)
                                                setShowSortMenu(false)
                                            }}
                                        >
                                            <Icon />
                                            <span>{option.label}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="cardContainContainer">
                    {isLoading ? (
                        // Loading skeleton
                        Array(6).fill(0).map((_, idx) => (
                            <div key={idx} className="cardSkeleton">
                                <div className="skeletonHeader"></div>
                                <div className="skeletonTitle"></div>
                                <div className="skeletonText"></div>
                                <div className="skeletonText short"></div>
                                <div className="skeletonFooter"></div>
                            </div>
                        ))
                    ) : filteredAndSortedJobs?.length > 0 ? (
                        filteredAndSortedJobs.map((ele, idx) => (
                            <Card 
                                color={coloeArr[idx % coloeArr.length]} 
                                key={ele._id || idx} 
                                img={ele.companyPic}
                                creatorId={ele.creatorId?._id} 
                                companyName={ele.companyName || "Company"} 
                                jobTitle={ele.jobTitle}
                                money={ele.money} 
                                experienceLevel={ele.experienceLevel} 
                                jobDescription={ele.jobDescription} 
                                jobID={ele._id} 
                                date={ele.createdAt} 
                                isSaved={user?.savedPosts?.includes(ele._id) ? true : false}
                            />
                        ))
                    ) : (
                        <div className="emptyState">
                            <FiBriefcase className="emptyIcon" />
                            <h3>No jobs found</h3>
                            <p>Try adjusting your filters or check back later for new opportunities</p>
                            {hasActiveFilters && (
                                <button className="clearFiltersEmptyBtn" onClick={clearAllFilters}>
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BodyHome