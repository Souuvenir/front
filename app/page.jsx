import AddEmployee from "./employee/AddEmployee"
import EmployeeList from "./employee/EmployeeList"
import { ButtonDefault } from '@components/Button'



const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            <span className="orange_gradient text-center">Home</span>
            <br className="max-md:hidden"/>
        </h1>
        <EmployeeList/> 
        <AddEmployee/>
    </section>
  )
}

export default Home