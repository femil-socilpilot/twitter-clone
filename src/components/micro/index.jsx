import { useRef } from "react";

export const TextArea = (props) => {
    const textAreaRef = useRef()
    const wrapper = useRef()
    const editableInput = useRef()
    const readonlyInput = useRef()
    const placeholder = useRef()
    const counter = useRef()
    const button = useRef()


    const { value } = props

    function calcHeight(value) {
        let numberOfLineBreaks = (value.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        return newHeight;
    }

    function validated(element) {
        let text;
        let maxLength = 10;
        let currentlength = element.innerText.length;
        if (currentlength <= 0) {
            placeholder.current.style.display = "block";
            counter.current.style.display = "none";
            button.classList.remove("active");
        } else {
            placeholder.current.style.display = "none";
            counter.current.style.display = "block";
            button.current.classList.add("active");
        }
        counter.current.innerText = maxLength - currentlength;
        if (currentlength > maxLength) {
            let overText = element.innerText.substr(maxLength); //extracting over texts
            overText = `<span className="highlight">${overText}</span>`; //creating new span and passing over texts
            text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
            readonlyInput.current.style.zIndex = "1";
            counter.current.style.color = "#e0245e";
            button.current.classList.remove("active");
        } else {
            readonlyInput.current.style.zIndex = "-1";
            counter.current.style.color = "#333";
        }
        readonlyInput.current.innerHTML = text; //replacing innerHTML of readonly div with textTag value
    }

    return (
        <div className="wrapper">
            <div className="input-box">
                <div className="tweet-area">
                    <span className="placeholder" ref={placeholder}>What's happening?</span>
                    <div className="input editable" contentEditable="true" spellCheck="false" onKeyUp={e => validated(e.target)} ref={editableInput}></div>
                    <div className="input readonly" contentEditable="true" spellCheck="false" ref={readonlyInput}></div>
                </div>
                <div className="privacy">
                    <i className="fas fa-globe-asia"></i>
                    <span>Everyone can reply</span>
                </div>
            </div>
            <div className="bottom">
                <ul className="icons">
                    <li><i className="uil uil-capture"></i></li>
                    <li><i className="far fa-file-image"></i></li>
                    <li><i className="fas fa-map-marker-alt"></i></li>
                    <li><i className="far fa-grin"></i></li>
                    <li><i className="far fa-user"></i></li>
                </ul>
                <div className="content">
                    <span className="counter" ref={counter}>100</span>
                    <button ref={button}>Tweet</button>
                </div>
            </div>
        </div>
    )
}


export const ImgInput = (props) => {
    return (
        <input
            type="file"
            {...props}
        />
    )
}