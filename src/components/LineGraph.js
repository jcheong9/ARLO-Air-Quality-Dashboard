import React, { Component } from 'react'
import moment from 'moment'

// import { string, object } from "prop-types";
import ReactFrappeChart from "react-frappe-charts";

const LineGraph = ({ data }) => {

    let dataArr = [];
    let co2Arr = [];
    let timeArr = [];
    let humidityArr = [];
    let tempArr = [];
    let tvocArr = [];
    let st = data.records_test_data;
    for (var o in st) {
        dataArr.push(st[o]);
    }

    for (var o in dataArr) {
        let convertDate = moment(dataArr[o].timestamp).format('YYYY/MM/DD');
        co2Arr.push(dataArr[o].co2);
        timeArr.push(convertDate);
        humidityArr.push(dataArr[o].humidity);
        tempArr.push(dataArr[o].temp);
        tvocArr.push(dataArr[o].tvoc);
    }
    console.log(co2Arr);
    console.log(humidityArr);
    //TODO: improve null array checking. without this, when data is empty due to selecting wrong data that does not exist in db, it throws error.
    return (
        <div className="charts">
            <ReactFrappeChart
                type="line"
                colors={["#21ba45"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                    labels: timeArr.length !== 0 ? timeArr : ["Error"],
                    datasets: [
                        {
                            name: "CO2",
                            values: co2Arr.length !== 0 ? co2Arr : [0],
                            chartType: 'line'
                        },
                        {
                            name: "Humidity",
                            values: humidityArr.length !== 0 ? humidityArr : [0],
                            chartType: 'line'
                        },
                        {
                            name: "Temperature",
                            values: tempArr.length !== 0 ? tempArr : [0],
                            chartType: 'line'
                        },
                        {
                            name: "TVOC",
                            values: tvocArr.length !== 0 ? tvocArr : [0],
                            chartType: 'line'
                        },
                    ]
                }}
            />
        </div>

    );
}

export default LineGraph;


