import './App.css'
import FlasiranaPiva from './components/FlasiranaPiva'
import TocenaPiva from './components/TocenaPiva'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'

function App() {
  return (
    <div className='container-fluid'>
      <div>
        <Switch>
          <Route exact path='/'>
            <Menu />
          </Route>
          <Route exact path='/tocena'>
            <TocenaPiva />
          </Route>
          <Route exact path='/flasirana'>
            <FlasiranaPiva />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
