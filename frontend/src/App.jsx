import { useEffect } from 'react'
import PagesNavigation from './routes'

function App() {
  const modeMemory = localStorage.getItem('mode')
  useEffect(() => {
    if (modeMemory === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
  }, [])
  
  return (
    <div className="App">
      <PagesNavigation />
    </div>
  );
}

export default App;
