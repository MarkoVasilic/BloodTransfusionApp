import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { useState} from "react";
import {
    Scheduler,
    WeekView,
    Appointments,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DateNavigator,
    DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useNavigate } from "react-router-dom";



const Appointment = ({ children, style, ...restProps }) =>{
    const navigate = useNavigate();
    return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: "#6fbf73",
                borderRadius: "8px",
            }}
            onClick={()=>navigate('/start-appointment/'+restProps.data.id)}
        >
            {children}
            {restProps.data.desc && <div>{restProps.data.desc}</div>}
        </Appointments.Appointment>
    );
}

export default function Calendar(props) {
    const { appointments } = props;
    const [viewName, setViewName] = useState("work-week");
    return (
        <Paper>
            <Scheduler data={appointments}>
                <ViewState
                    defaultCurrentDate={Date.now()}
                    currentViewName={viewName}
                    onCurrentViewNameChange={setViewName}
                />

                <WeekView startDayHour={10} endDayHour={19} />
                <WeekView
                    name="work-week"
                    displayName="Work Week"
                    excludedDays={[0, 6]}
                    cellDuration={45}
                    startDayHour={8}
                    endDayHour={20}
                />
                <MonthView />
                <DayView />

                <Toolbar />
                <DateNavigator />
                <ViewSwitcher />
                <Appointments appointmentComponent={Appointment} />
            </Scheduler>
        </Paper>
    );
}
