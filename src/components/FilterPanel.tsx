export function FilterPanel() {


    return (
        <div className="filter">
            <div>
                <div className="filter__item">
                    <button className="btn btn-filter">
                    Очистить фильтр
                </button>
                <p className="filter__title">Марка:</p>

            </div>
            <div className="filter__item">
                <p className="filter__title">Диаметр:</p>

                <div className="filter__text">
                    От <span className="filter__numbers">  </span> до
                    <span className="filter__numbers">  </span>
                </div>
            </div>
            <div className="filter__item">
                <p className="filter__title">Упаковка:</p>

            </div>
        </div>
</div>
    )
}