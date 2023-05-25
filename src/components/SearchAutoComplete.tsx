import React, {useEffect, useRef, useState} from "react";
import "../css/SearchAutoComplete.css"
import axios from "axios";
import {ISearchAutoComplete, SearchAutocompleteResponse} from '../interfaces/exportedInterfaces'
import {BACKEND_URL} from "../ConstConfig";

interface SearchAutoCompleteProps {
    state: ISearchAutoComplete,
    setState: (prop: ISearchAutoComplete) => void
}

export function SearchAutoComplete ({state, setState}: SearchAutoCompleteProps) {
    const controllerRef = useRef<AbortController | null>();
    const [checking, setChecking] = useState('')
    const [autocomplete, setAutocomplete] = useState(false)
    const [ulFocus, setUlFocus] = useState(false)

    useEffect(() => {
        onChangeHandler()
    }, [checking])

    async function onChangeHandler() {
        if (controllerRef.current) {
            controllerRef.current.abort()
        }
        const controller = new AbortController()
        controllerRef.current = controller

        const response = await axios.post<SearchAutocompleteResponse>(BACKEND_URL + '/api/v1/search/autocomplete', {
            query: checking
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("token")
            },
            signal: controllerRef.current?.signal
        })
        const partSug = response.data.part
        const plavSug = response.data.plav
        setState({
            activeSuggestion: 0,
            markSuggestions: response.data.marks,
            partSuggestions: partSug,
            heatSuggestions : plavSug,
            showSuggestions: true,
            userInput: checking
        })
        controllerRef.current = null
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
        setChecking(event.currentTarget.innerText)
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
                    <ul onMouseOver={() => setUlFocus(true)} onMouseOut={() => setUlFocus(false)} className="suggestions">
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
                onChange={event => setChecking(event.target.value)}
                onKeyDown={onKeyDownHandler}
                value={checking}
                placeholder='Начните ввод: плавка/партия/марка'
                style={{fontSize: '16px'}}
                onFocus={() => setAutocomplete(true)}
                onBlur={() => {
                    if (ulFocus) {
                        return
                    } else {
                        setAutocomplete(false)
                    }
                }}
            />
            <br/>
            {autocomplete && suggestList()}
        </>
    );
}


