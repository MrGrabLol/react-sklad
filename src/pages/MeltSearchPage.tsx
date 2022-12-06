import '../css/SearchPage.css'
import {SearchAutoComplete} from "../components/SearchAutoComplete";

export function MeltSearchPage() {

    return (
        <div>
            <form className='input-block'>
                <SearchAutoComplete></SearchAutoComplete>
                <button type='submit'>Найти</button>
            </form>
        </div>
    )
}