import '../css/Multislider.css'

interface FilterPanelMultisliderProps {
    leftDiameter: number,
    rightDiameter: number,
    selectedDiameterLeft: number,
    selectedDiameterRight: number,
    leftDiameterHandler: (item: number) => void,
    rightDiameterHandler: (item: number) => void
}

export function FilterPanelMultislider({leftDiameter, rightDiameter, selectedDiameterLeft, selectedDiameterRight, leftDiameterHandler, rightDiameterHandler}: FilterPanelMultisliderProps) {

    return (
        <div>
            <div className="multi-slider">
                <div className="slider-track"></div>
                <input
                    type="range"
                    min={leftDiameter}
                    max={rightDiameter}
                    step='0.1'
                    value={selectedDiameterLeft}
                    onChange={(event) => leftDiameterHandler(Number(event.target.value))}
                    // onInput={changeHandlerLeft}
                />
                <input
                    type="range"
                    min={leftDiameter}
                    max={rightDiameter}
                    step='0.1'
                    value={selectedDiameterRight}
                    onChange={(event) => rightDiameterHandler(Number(event.target.value))}
                    // onInput={changeHandlerRight}
                />
            </div>
            <p>От <strong>{selectedDiameterLeft}</strong> до <strong>{selectedDiameterRight}</strong></p>
        </div>
    )
}