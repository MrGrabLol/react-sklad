import '../css/Multislider.css'

export function FilterPanelMultislider() {
    return (
        <div>
            <div className="multi-slider">
                <div className="slider-track"></div>
                <input
                    type="range"
                />
                <input
                    type="range"
                />
            </div>
            <p>От ... до ...</p>
        </div>
    )
}