import '../css/SearchPage.css'

export function MeltSearchPage() {

    return (
        <div>
            <form className='input-block'>
                <input type="text" placeholder='Введите ID'/>
                <button type='submit'>Найти</button>
            </form>
        </div>
    )
}