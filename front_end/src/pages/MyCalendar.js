import React from 'react'
import AllowedUsers from '../components/AllowedUsers';
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";



function MyCalendar() {
    const allowedUsersList = ["TranfusionCenterStaff"]
  return (
    <div>
    <AllowedUsers userRole={allowedUsersList}></AllowedUsers>
    <Navbar></Navbar>
    <Calendar></Calendar>
    </div>
  )
}

export default MyCalendar