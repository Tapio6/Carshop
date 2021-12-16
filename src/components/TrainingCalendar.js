import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

function TrainingCalendar() {


const [training, setTraining] = useState([]);

useEffect(() => {
    fetchTraining();
}, []);

const fetchTraining = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTraining(data))
    .catch(err => console.error(err))
}

function trainingCalendar(params) {
    return(
        <>
            <b>{params.timeText}</b>
            <i>{params.event.extendedProps.activity + " " + "with" + " " + params.event.extendedProps.customer.firstname + " " + params.event.extendedProps.customer.lastname}</i>
          </>
    )
}

return(
    <div>
        <FullCalendar
             plugins={[
                 dayGridPlugin,
                 timeGridPlugin
                ]}
             initialView="dayGridMonth"
             events={training}
             headerToolbar = {{
              start: 'today prev,next',
              center: 'title',   
              end: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            eventContent={trainingCalendar}
            />
    </div>
);

}


    export default TrainingCalendar;

