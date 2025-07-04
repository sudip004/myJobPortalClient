import React, { useState } from 'react'
import './bosyHome.css'
import Card from '../Card/Card'
import img1 from "../../assets/imgheading.png"
import { coloeArr, companyImg } from '../../utils/colorCodeApi'
import ZustandStore from '../../Zustand/ZustandStore'

const BodyHome = ({ data }) => {
    const user = ZustandStore(state => state.user)
    console.log("bodyhome data", data);
    return (
        <div className='bodyHomeContainer'>
            <div className="leftboxContainer">
                <img src={img1} alt="" />
                <div className="leftSideBodyContainer-1">
                    <p>Fillters</p>
                    <div className='checkboxFilter'>
                        <p>working Schidules</p>
                        <div> <input type="checkbox" name="" id="" />Full time,</div>
                        <div> <input type="checkbox" name="" id="" />Part time,</div>
                        <div> <input type="checkbox" name="" id="" />Internship,</div>
                        <div> <input type="checkbox" name="" id="" />Project work,</div>
                    </div>
                </div>
            </div>

            <div className="rightboxContainer">
                <div className="homebodyHeadding">
                    <h2>Recommended jobs <span>386</span></h2>
                    <div>sort By: <span>Last Update</span></div>
                </div>
                <div className="cardContainContainer">
                    {
                        data?.map((ele, idx) => (
                            <Card color={coloeArr[idx % coloeArr.length]} key={idx} img={ele.companyPic}

                                creatorId={ele.creatorId?._id} companyName={ele.companyName || "xyz"} jobTitle={ele.jobTitle}
                                money={ele.money} experienceLevel={ele.experienceLevel} 
                                jobDescription={ele.jobDescription} jobID={ele._id} date ={ele.createdAt} isSaved={user?.savedPosts?.includes(ele._id) ? true : false}
                            />
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default BodyHome