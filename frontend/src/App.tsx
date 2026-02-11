import Button from './components/atoms/Button/Button'
import Input from './components/atoms/Input/Input'
import Card from './components/molecules/Card/Card'

function App() {
  const handleLogin = () => {
    alert('Бебра')
  }

  return (
    <div>
      <Card>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          Ласкаво просимо
        </h2>
        
        <div style={{ marginBottom: '15px' }}>
          <Input type="email" placeholder="Email" label="Ваша пошта" />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <Input type="password" placeholder="Пароль" label="Пароль" />
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button onClick={handleLogin} variant="primary">Увійти</Button>
          <Button variant="secondary">Реєстрація</Button>
        </div>
      </Card>
    </div>
  )
}

export default App