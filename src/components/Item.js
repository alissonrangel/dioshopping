import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core/';
import './style.css';

const Item = ({ name, details, font, onClick }) => {

    return(
        <ListItem className="p-1" style={{width: '100%', backgroundColor:'#Ac72ff', borderRadius: '5px'}}>
            <ListItemText 
                // style={{...font,
                //     cursor: 'pointer'
                // }}
                className="item-colors"
                primary={name}
                secondary={details}                
                onClick={() => onClick(name)}
            />
        </ListItem>
    )
}

export default Item;
