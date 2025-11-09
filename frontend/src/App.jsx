import Navbar from './components/Navbar/index'
import EventCreator from './components/EventCreator/index'
import EventsPanel from './components/EventsPanel/index'
import './App.css'

function App() {
  return (
    <div className='main'>
        <Navbar/>
        <div className='mainContainer'>
            <EventCreator />
            <EventsPanel />
        </div>
    </div>
  )
}

export default App
