import '../css/WelcomePage.css'

export function WelcomePage() {
    return (
        <div className='centered-content-box'>
            <h1>Добро пожаловать,</h1>
            <h1 style={{fontStyle: 'italic'}}>{localStorage.getItem('worker')}</h1>
        </div>
    )
}