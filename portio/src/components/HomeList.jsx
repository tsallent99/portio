import buyList from "./BuyList"
import { useNavigate } from 'react-router-dom'
import retrievePropertiesOfUser from "../logic/retrievePropertiesOfUser"
import { useState, useEffect } from 'react'


function HomeList ({onManageClick}) {
    
    
    const navigate = useNavigate()
    
    


    const handleBuyClick = () => navigate('/buy')

    const handleSettingsClick = () => navigate('/settings')

    return <div className="home">
        <button className="button-main" onClick={onManageClick}>Manage my myProperties</button>
        <button className="button-main" onClick={handleBuyClick}>Buy</button>
        <button className="button-main" onClick={handleSettingsClick}>Settings</button>
    </div>
}

export default HomeList