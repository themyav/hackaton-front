import ParkingRow from "../components/ParkingRow/index.tsx"

function MapPage() {
    return (
        <>
            <style>

            </style>
            <div>
                <ParkingRow first={1} spots={5} angle={180}/>
                <ParkingRow first={6} spots={5} angle={0}/>
            </div>
        </>);
}


export default MapPage