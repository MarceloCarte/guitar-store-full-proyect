import Layout from "./components/Layout"
import { AppProvider } from "./context/appProvider"

const App = () => {
  return (
    <AppProvider>
    <Layout/>
    </AppProvider>
  )
}
 
export default App