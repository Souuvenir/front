import EmployeeList from "./employee-list/EmployeeList"



const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Employee 
            <span className="blue_gradient text-center">Home</span>
            <br className="max-md:hidden"/>
        </h1>
        <EmployeeList/>
    </section>
  )
}

export default Home