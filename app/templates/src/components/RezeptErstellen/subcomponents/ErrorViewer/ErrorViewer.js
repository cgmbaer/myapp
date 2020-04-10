import React from 'react';
import './ErrorViewer.css';

const ErrorViewer = (props) => {

    return (
        <div className={props.errorMessage ? "error_viewer__visible" : "error_viewer__hidden"}>
            {props.errorMessage}
        </div>
    )
}

export default ErrorViewer;