import AddEmployee from "./employee/AddEmployee"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center mb-16">
            <span className="text-center">Assist Control </span>
            <span className="orange_gradient text-center">App</span>
            <br className="max-md:hidden"/>
        </h1>
        <AddEmployee />
    </section>
  )
}

export default Home