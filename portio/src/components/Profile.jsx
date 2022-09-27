import './Profile.css'
import IconButton from './IconButton'
 

function Profile({ name, surname, email, picture, onLogoutClick }){
    return <div className="profile">
        <img className="ProfileImg" src={picture} alt="Profile picture" width="200" height="200"></img>
        <h4>{name},{surname}</h4>
        <h4>{email}</h4>
        <IconButton text={'logout'} onClick={onLogoutClick}/>
        
    </div>
}

export default Profile