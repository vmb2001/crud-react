import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Counter from './components/Counter'
import Nav from './components/Nav'
import Page from './components/Page'
import Customers from './components/customers.json'
import Table from './components/Table.js'

function App() {
  return (
    <div className="App">
     <Table data={Customers}/>
    </div>
  )
}

export default App;

