import './bookingSuccesful.css'

function BookingSuccesful({totalDays}){
    
    
    const totalExpenses = (4 + 3 + 2) * totalDays + 40
        
    
    
    return <div className="expensesContainer">
        <h3>Congrats! You've booked {totalDays} days. The following list shows you the total mainteiment expenses for your upcoming trip</h3>
        <ul>
            <li>Gas: 4€/day</li>
            <li>Electricity: 3€/day</li>
            <li>Water: 2€/day</li>
            <li>Cleaning Bill: 40€/trip</li>
        </ul>
        <h3>Total expenses: {totalExpenses}€</h3>
        <button className="pay">Pay now</button>
    </div>

}

export default BookingSuccesful