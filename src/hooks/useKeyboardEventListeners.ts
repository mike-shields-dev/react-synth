import { useEffect } from 'react';

type KeyboardEventHandler = (event: KeyboardEvent) => void;

function useKeyboardEventListeners(eventHandler: KeyboardEventHandler) {
    useEffect(() => {
        addListeners();
        return () => removeListeners();
    }, []);

    function addListeners() { 
        document.addEventListener('keydown', eventHandler);
        document.addEventListener('keyup', eventHandler);
    }
    
    function removeListeners() {
        document.removeEventListener('keydown', eventHandler);
        document.removeEventListener('keyup', eventHandler);
    }
};

export default useKeyboardEventListeners;
