import React from 'react';
import moment from 'moment';

const lastTaken = (timestamp) => {
    const yesterday = new Date().setHours(new Date().getHours() - 24);
    if (timestamp < yesterday) {
        return <p className="text-danger">Taken on {moment(timestamp).format('dddd, MMMM Do YYYY, h:mma')} PDT </p>
    } else {
        return <p>Taken on {moment(timestamp).format('dddd, MMMM Do YYYY, h:mma')} PDT </p>
    }
}
const LastReadings = (props) => {
    const {timestamp, co2, temp, humidity, tvoc} = props.reading;

    return (
        <div className="mb-4 mt-4">
            <h4>Latest from {props.deviceData && props.deviceData.device_name}</h4>
            <p>Location: {props.deviceData && props.deviceData.location_name} </p>
            <p >
                Status: 
                <span className={props.deviceData && props.deviceData.active ? 'offline' : 'online'}>
                    {props.deviceData && props.deviceData.active ? ' Active' : ' Deactivated'} 
                </span>
            </p>
            {lastTaken()}
            <div className="d-flex flex-row border">
                <div className="text-center border-right w-25">
                    <h5>{tvoc}</h5>
                    <span>TVOC</span>
                </div>
                <div className="text-center border-right w-25">
                    <h5>{temp}</h5>
                    <span>Temperature &#8451;</span>
                </div>
                <div className="text-center border-right w-25">
                    <h5>{humidity}</h5>
                    <span>Humidity</span>
                </div>
                <div className="text-center w-25">
                    <h5>{co2}</h5>
                    <span>CO2</span>
                </div>
            </div>
        </div>
    )
}

export default LastReadings;