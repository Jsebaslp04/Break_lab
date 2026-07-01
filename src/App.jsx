import { AppRouter } from './componentes/Router/AppRouter'
import { Menu } from './componentes/Menu'
import { Footer } from './componentes/Footer'
import { WhatsAppButton } from './componentes/WhatsAppButton'
import { CartProvider } from './componentes/context/CartContext'
import styles from './App.module.css'

function App() {

  return (
    <CartProvider>
      <Menu />
      <AppRouter />
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  )
}

export default App
