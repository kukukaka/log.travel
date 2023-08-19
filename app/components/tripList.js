const TripList = ({ tripEntry }) => {

    return (
        <div>
            <h1 className='text-xl font-semibold pb-4 pt-12'>Event tracker</h1>
            <ul>
            {tripEntry.map((e) => (
                <li key={e.authorId}>
                {e.date && <span>{new Date(e.date).toLocaleDateString()}</span>}:<br />
                {e.type}<br />
                <strong>{e.origin_name}</strong><br />
                {e.destination_name}<br />
                {e.country}<br />
                {e.description}<br />
                {e.attachments}<br />
                </li>
            ))}
            </ul>
        </div> 
    )
}

export default TripList;