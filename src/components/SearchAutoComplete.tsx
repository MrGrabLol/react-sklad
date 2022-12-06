import React, {useState} from "react";
import "../css/SearchAutoComplete.css"
import axios from "axios";

interface SearchAutoCompleteProps {
    activeSuggestion: number,
    markSuggestions: Array<string>,
    partSuggestions: Array<string>,
    heatSuggestions : Array<string>,
    showSuggestions: boolean,
    userInput: string
}

interface SearchAutocompleteResponse {
    marks: Array<string>,
    plav: Array<string>,
    part: Array<string>
}

export function SearchAutoComplete () {

    const [state, setState] = useState<SearchAutoCompleteProps>({
        activeSuggestion: 0,
        markSuggestions: [],
        partSuggestions: [],
        heatSuggestions: [],
        showSuggestions: false,
        userInput: ''
    })

    async function onChangeHandler(event: { currentTarget: { value: any; }; }) {
        const userInput = event.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        //Request to our server ->
        const response = await axios.post<SearchAutocompleteResponse>("http://localhost:8081/api/v1/search/autocomplete", {
            query: userInput
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            }
        })
        const partSug = response.data.part
        const plavSug = response.data.plav
        console.log(partSug)
        console.log(plavSug)
        setState({
            activeSuggestion: 0,
            markSuggestions: response.data.marks,
            partSuggestions: partSug,
            heatSuggestions : plavSug,
            showSuggestions: true,
            userInput: userInput
        });
        console.log(state)
    }

    function onClickHandler(event: { currentTarget: { innerText: any; }; }) {
        setState({
            activeSuggestion: 0,
            markSuggestions: [],
            partSuggestions: [],
            heatSuggestions: [],
            showSuggestions: false,
            userInput: event.currentTarget.innerText
        });
    }

    const onKeyDownHandler = (event: { keyCode: number; }) => {
        const activeSuggestion = state.activeSuggestion

        // User pressed the enter key
        if (event.keyCode === 13) {
            setState({
                activeSuggestion: 0,
                markSuggestions: state.markSuggestions,
                partSuggestions: state.partSuggestions,
                heatSuggestions: state.heatSuggestions,
                showSuggestions: false,
                userInput: state.markSuggestions[activeSuggestion]
            })
        }
        // User pressed the up arrow
        else if (event.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            setState({
                heatSuggestions: state.heatSuggestions,
                markSuggestions: state.markSuggestions,
                partSuggestions: state.partSuggestions,
                showSuggestions: state.showSuggestions,
                userInput: state.userInput,
                activeSuggestion: activeSuggestion - 1 });
        }
        // User pressed the down arrow
        else if (event.keyCode === 40) {
            if (activeSuggestion - 1 === state.markSuggestions.length + state.partSuggestions.length
                + state.heatSuggestions.length - 2) {
                return;
            }

            setState({
                heatSuggestions: state.heatSuggestions,
                markSuggestions: state.markSuggestions,
                partSuggestions: state.partSuggestions,
                showSuggestions: state.showSuggestions,
                userInput: state.userInput,
                activeSuggestion: activeSuggestion + 1 });
        }
    };

    function suggestList() {
        let suggestionsListComponent;
        if (state.showSuggestions && state.userInput) {
            if (state.markSuggestions.length || state.partSuggestions.length || state.heatSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {
                            state.markSuggestions.length > 0 &&
                            (<li className='suggestion-title'>Марки</li>)}{
                            state.markSuggestions.map((suggestion, index) => {
                                let className = "suggestion-hoverable"
                                if (index === state.activeSuggestion) {
                                    className = "suggestion-active";
                                }
                                return (
                                    <li className={className} key={suggestion} onClick={onClickHandler}>
                                        {suggestion}
                                    </li>
                                );
                            })
                        }
                        {
                            state.partSuggestions.length > 0 &&
                            (<li className='suggestion-title'>Партии</li>)} {
                            state.partSuggestions.map((suggestion, index) => {
                                let className = "suggestion-hoverable"
                                if (index + state.markSuggestions.length === state.activeSuggestion) {
                                    className = "suggestion-active";
                                }

                                return (
                                    <li className={className} key={suggestion} onClick={onClickHandler}>
                                        {suggestion}
                                    </li>
                                );
                            })
                        }
                        {
                            state.heatSuggestions.length > 0 &&
                            (<li className='suggestion-title'>Плавки</li>) }{
                            state.heatSuggestions.map((suggestion, index) => {
                                let className = "suggestion-hoverable"
                                if (index + state.markSuggestions.length + state.partSuggestions.length === state.activeSuggestion) {
                                    className = "suggestion-active";
                                }

                                return (
                                    <li className={className} key={suggestion} onClick={onClickHandler}>
                                        {suggestion}
                                    </li>
                                );
                            })
                        }
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className="no-suggestions">
                        <em>Нет элементов</em>
                    </div>
                );
            }
            return suggestionsListComponent;
        }
    }

    return (
        <>
            <input
                type="text"
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                value={state.userInput}
            />
            {suggestList()}
        </>
    );
}


