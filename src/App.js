import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Customers from './components/customers.json'
import Table from './components/Table.js'
import Test from'./components/Test'

function App() {
  return (
    <div className="App">
     <Table data={Customers}/>
     {/* <Test/> */}
    </div>
  )
}

export default App;

