import './IconButton.css'

function IconButton({ text, onClick }){
    return <button className="IconButton" onClick={onClick}><span className="material-symbols-outlined">{text}</span></button>
}
export default IconButton