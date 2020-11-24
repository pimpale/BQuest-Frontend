import React from 'react';
import { Button } from 'react-bootstrap';


const PrimaryButton = ({onClick, block, children, disabled, color}) => {
    let colorCode;
    switch (color) {
        case "orange": 
            colorCode="#ffa688"
            break;
        case "green": 
            colorCode="#c3d887"
            break;
        case "red":
            colorCode="#f74e4e"
            break;
        default:
            colorCode="#c3d887"
    }
    
    const styles = {
        backgroundColor: colorCode,
        borderColor: colorCode,
        boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.1)",
    }

    return <Button style={styles} onClick={onClick} disabled={disabled} block={block}>{children}</Button>;
}

export default PrimaryButton;
