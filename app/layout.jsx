
import '@styles/global.css';
import { Nav } from "@components/Nav"
export const metadata = {
    title: "Employee Home",
    description: 'Proyecto test'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient'/>
            </div>

            <main className='app'>
                <Nav/>
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;