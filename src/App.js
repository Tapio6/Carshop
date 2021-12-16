import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import TrainingChart from './components/TrainingChart';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';


function App() {

  const [tab, setTab] = useState('one')

  const handleChange = (event, newValue) => {
    setTab(newValue);
  }





  return (
    <div className="App">
      <AppBar position="static" color="secondary">
        
        <Toolbar>
        <Typography variant="h6" >
            Personal trainer app
          </Typography>
          <Tabs value={tab}
           onChange={handleChange}
           textColor="inherit"
           centered>
            <Tab label="Customers" value="one" />
            <Tab label="Trainings" value="two" />
            <Tab label="Calendar" value="three" />
            <Tab label="Stats" value="four" />
          </Tabs>
        
        </Toolbar>
      </AppBar>

        {tab === "one" && <CustomerList/>}
        {tab === "two" && <TrainingList />}
        {tab === "three" && <TrainingCalendar />}
        {tab === "four" && <TrainingChart />}
    </div>
  );
}

export default App;
