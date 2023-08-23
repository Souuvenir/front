import AddEmployee from "./employee/AddEmployee"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            <span className="orange_gradient text-center">Employee</span>
            <br className="max-md:hidden"/>
        </h1>
        <AddEmployee />
    </section>
  )
}

export default Home