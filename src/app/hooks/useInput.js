// creating a custom hook 
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';

export const useInput = (initialValue) => {
    const [searchText, setSearchText] = useState(initialValue);
    const inputRef = useRef()
	const dispatch = useDispatch()
    
    return {
        searchText,
        setSearchText,
        dispatch,
        reset: () => setSearchText(""),
        bind: {
            ref: inputRef,
            value:searchText,
            onChange: event => {
                setSearchText(event.target.value)
            }
        }
    }
}