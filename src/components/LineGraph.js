
import React from 'react'
import moment from 'moment'
import ReactFrappeChart from "react-frappe-charts";

const LineGraph = ({ data }) => {

    let dataArr = [];
    let timeArr = [];

    let datasetsArr = [];
    let st = data.records_test_data;
    for (var o in st) {
        dataArr.push(st[o]);
    }

    for (let s = 0; s < st.length; s++) {
        let convertDate = moment(dataArr[s].timestamp).format('YYYY/MM/DD');
        timeArr.push(convertDate);
    }
    if (dataArr.length !== 0) {
        let keys = Object.keys(dataArr[0]);
        let filteredKeys = keys.filter(m => m !== 'device_id' && m !== 'record_id' && m !== 'timestamp');   
            for (let i = 0; i < filteredKeys.length; i++) {                      
                datasetsArr[i] = {}; //Creates n number of new object 
                let key = filteredKeys[i];   
                datasetsArr[i].name = key;   
                datasetsArr[i].chartType = 'line'; //Sets the graph type to line graph   

                let tmpArr = [];
                for(let k in dataArr){
                    tmpArr.push(dataArr[k][key]);
                }
                datasetsArr[i].values = tmpArr;
            }

        console.log(datasetsArr);
    }

    //TODO: handle error when return data is null or only 1 record
    return (
        <div className="charts">
            <ReactFrappeChart
                type="line"
                lineOptions={{hideDots: 1}}
                colors={["#21ba45"]}
                axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
                height={250}
                y_axis_exp_based_on_range={true}
                data={{
                    labels: timeArr.length !== 0 ? timeArr : ["Error"],
                    datasets: datasetsArr,
                    // yMarkers: [
                    //     {
                    //         label: '',
                    //         value: 0,
                    //         type: 'solid'
                    //     }
                    // ]
                }}
            />
        </div>

    );
}

export default LineGraph;


