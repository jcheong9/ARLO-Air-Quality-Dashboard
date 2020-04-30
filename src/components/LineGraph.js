import React, { Component } from 'react'
import moment from 'moment'

// import { string, object } from "prop-types";
import ReactFrappeChart from "react-frappe-charts";

const LineGraph = ({ data }) => {
    let convertDate = moment(data.timestamp).format('YYYY/MM/DD')
    let labelArr = [];
    console.log(data);
    

    return (
        <div className="charts">
              
            <ReactFrappeChart
                type="line"
                colors={["#21ba45"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                data={{
                    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                        {
                            name: "CO2",
                            values: [18, 40, 30, 35, 8, 52, 17, 4],
                            chartType: 'line'
                        },
                        {
                            name: "VOC",
                            values: [40, 40, 40, 40, 40, 40, 40, 20],
                            chartType: 'line'
                        }
                    ]
                }}
            />

        </div>

    );
}

export default LineGraph;


////---------------This is a reference for how to consume api
// const LineGraph = ({data}) => {
//     return (
//         <div>
//             <center><h1>Fetched data graph</h1></center>
//             {data.map((dt) => (
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">{dt.name}</h5>
//                         <h6 class="card-subtitle mb-2 text-muted">{dt.email}</h6>
//                         <p class="card-text">{dt.company.catchPhrase}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// };
// export default LineGraph