import Loggito from "../utils/Loggito"
import './ManageProperties.css'
import { useState } from 'react'


function ManageProperties({properties, onPropertyClick}){
    
    
    const logger = new Loggito('List')

    logger.info('return')

    

    return <div className="main"><h3 className="title">My properties</h3>
    <ul className="ManagePropertiesList">
        {properties && properties.map(property => <li className="ManagePropertiesListItem"  >
           
            <div className="propertyContainer">
                <div className="containerHeader">
                    <h3 className="PropertyTitle">{property.title}</h3>
                    <p>Portion: {property.portions[0].shares}/{property.totalPortions}</p>
                </div>
           
            
                <div className="photos"><img className="PropertyImg" src={property.pictures[0]}></img>
                    <img className="PropertyImg" src={property.pictures[1]}></img>
                </div>
            
            <p className="adress">{property.adress}</p>
            <button className="propertyOptions" onClick={()=> onPropertyClick(property)}>Options </button>
            
            </div>
            </li>)}
    </ul>
    </div>
    
}

export default ManageProperties