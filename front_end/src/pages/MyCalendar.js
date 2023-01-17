import React from "react";
import AllowedUsers from "../components/AllowedUsers";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";
import { useState, useEffect, useMemo } from "react";
import axiosApi from "../api/axios";

function MyCalendar() {
    const allowedUsersList = ["TranfusionCenterStaff"];
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    let getData = async () => {
        axiosApi.get(`/appointment/users`).then((response) => {
            setAppointments(response.data);
            console.log("DATA",response.data);
        });
    };

    const transformedAppointents = useMemo(() => {
        return appointments.map((appointment) => {
          const endDate =  new Date(appointment.date_time)
          endDate.setMinutes(
            appointment.duration + endDate.getMinutes()
        )
        
        function addHours(date, hours) {
            date.setHours(date.getHours() - hours);
        
            return date;
          }
          
          const date = new Date(appointment.date_time);
          
          const newDate = addHours(date, 1)
            if(appointment.user_profile == null){
                return {
                    id: appointment.id,
                    title: "Predefined appointment",
                    startDate: newDate,
                    endDate,
                };
            }else{
                return {
                    id: appointment.id,
                    title: appointment.user_profile.user.first_name + " " +appointment.user_profile.user.last_name + "'s Appointment",
                    startDate: newDate,
                    endDate,
                };
            }
        });
    }, [appointments]);

    console.log("TRANSFORMERD",transformedAppointents );

    return (
        <div>
            <AllowedUsers userRole={allowedUsersList}></AllowedUsers>
            <Navbar></Navbar>
            {!transformedAppointents && <div>Loading...</div>}
            {transformedAppointents && (
                <div>
                    <Calendar appointments={transformedAppointents}></Calendar>
                </div>
            )}
        </div>
    );
}

export default MyCalendar;  