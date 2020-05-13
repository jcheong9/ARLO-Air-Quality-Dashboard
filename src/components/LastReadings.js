import React from 'react';
import moment from 'moment';

const LastReadings = (props) => {
    const {timestamp, co2, temp, humidity, tvoc} = props.reading;

    return (
        <div className="mb-4 mt-4">
            <h4>Latest from {props.deviceData && props.deviceData.device_name}</h4>
            <p>Location: {props.deviceData && props.deviceData.location_name} </p>
            <p>Taken on {moment(timestamp).format('dddd, MMMM Do YYYY, h:mma')} PDT </p>
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