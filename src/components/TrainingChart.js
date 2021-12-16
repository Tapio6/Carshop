import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";
import _ from 'lodash';

function TrainingChart () {

const [training, setTraining] = useState([]);

useEffect(() => {
    fetchTraining();
}, [])

const fetchTraining = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTraining(data.map(data => ({
       content: data.activity,
       duration: data.duration
    }))))
    .catch(err => console.error(err))
}

const chartData = _(training)
            .groupBy(activity => activity.content)
            .map((value, key) => ({
                content: key,
                totalTime: _.sumBy(value, 'duration')
            }))
            .value()


    return(
        <div style={{maxWidth: '1500px', maxHeight: '1500px', margin: 'auto', textAlign: 'center', marginTop: '120px'}}>
            <ResponsiveContainer width="100%" aspect={2.5}>
            <BarChart
          width={1500}
          height={700}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        > 
          <XAxis dataKey="content" />
          <YAxis label={{value: 'Time (min)', angle: -90, position: 'insideLeft'}}/>
          <Tooltip />
          <Legend />
          <br></br>
          <Bar barSize={140}  dataKey="totalTime" fill="#ff1e31" />
        </BarChart>
        </ResponsiveContainer>
        </div>
    );
}

export default TrainingChart;