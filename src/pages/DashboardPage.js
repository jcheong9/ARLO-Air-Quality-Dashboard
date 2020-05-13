import React, { Component } from 'react';
import Header from '../components/Header';
import LineGraph from '../components/LineGraph'
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import LastReadings from '../components/LastReadings'

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempData: [],
            tvocData: [],
            co2Data: [],
            humidityData:[],
            lastReadings: {},
            startDate: new Date().setHours(new Date().getHours() - 12),
            endDate: new Date(),
            device: "2",
            showLineGraph: false,
            graphError: false,
            graphErrorMessage: "",
            latestReadingsError: false,
            latestReadingsErrorMessage: "",
            loading: false
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit();
        this.getlatest = this.getLatest.bind(this);
    }

    getLatest(event) {
        let tokenLocal = Cookies.get('token')
        fetch(`http://localhost:5000/readings/device?id=${this.state.device}&token=${tokenLocal}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

            .then(res => res.json())
            .then((data) => {
                console.log("DATA!!!")
            
                console.log(JSON.stringify(data, 1, null));
                this.setState({
                    lastReadings: data.records_data[0],
                    latestReadingsError: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({latestReadingsError: true,
                    latestReadingsErrorMessage: "Error fetching latest readings"})
            });

    }
    //SEND POST REQUEST
    handleSubmit(event) {
        this.setState({loading: true});
        let tokenLocal = Cookies.get('token')
        fetch(`http://localhost:5000/readings?token=${tokenLocal}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "device_id": this.state.device,
                "Start_date": moment(this.state.startDate).format('YYYY-MM-DD HH:mm'),
                "End_date": moment(this.state.endDate).format('YYYY-MM-DD HH:mm'),
                "Temperature": true,
                "TVOC": true,
                "CO2": true,
                "Humidity": true
            })
        })

            .then(res => res.json())
            .then((data) => {
                if (data && data.records_test_data && data.records_test_data.length > 0) {
                    let tempData = data.records_test_data.map((x) => {
                        return {
                            device_id: x.device_id,
                            temp: x.temp,
                            timestamp: x.timestamp
                        }
                    })
                    let humidityData = data.records_test_data.map((x) => {
                        return {
                            device_id: x.device_id,
                            humidity: x.humidity,
                            timestamp: x.timestamp
                        }
                    })
                    let co2Data = data.records_test_data.map((x) => {
                        return {
                            device_id: x.device_id,
                            co2: x.co2,
                            timestamp: x.timestamp
                        }
                    })
                    let tvocData = data.records_test_data.map((x) => {
                        return {
                            device_id: x.device_id,
                            tvoc: x.tvoc,
                            timestamp: x.timestamp
                        }
                    })
                    this.setState({ 
                        tempData: { records_test_data: tempData},
                        humidityData: { records_test_data: humidityData},
                        co2Data: { records_test_data: co2Data},
                        tvocData: { records_test_data: tvocData},
                        showLineGraph: true,
                        graphError: false,
                        loading: false
                    });
                } else {
                    this.setState({ 
                        graphError: true,
                        graphErrorMessage: "No data for this time period",
                        showLineGraph: false,
                        loading: false
                    });
                }
                this.getLatest();
            })
            .catch(err => {
                console.log(err);
                this.setState({ 
                    graphError: true,
                    graphErrorMessage: "Error fetching data",
                    showLineGraph: false
                });
            })

    }

    changeStartDate = (event) => {
        this.setState({ startDate: event });
    }

    changeEndDate = (event) => {
        this.setState({ endDate: event });
    }


    changeDevice = (event) => {
        this.setState({ device: event.target.value })
    }

    checkBoxChange(key, event) {
        let newObj = {};
        newObj[key] = event.target.checked;
        this.setState(newObj);
    }

    showLatestReadings = () => {
        if(!this.state.latestReadingsError) {
            return <LastReadings data={this.state.lastReadings}/>
        } else {
            return <h4>No readings found</h4>
        }
    }
    showGraphs = () => {
        if (this.state.graphError){
            return <div> <h1>{this.state.graphErrorMessage}</h1></div>
        } 
        if (this.state.loading) {
            return <h4> Loading...</h4>
        }
        if (!this.state.loading && this.state.showLineGraph) {
            return <div>
                <h4>Temperature</h4>
                <LineGraph data={this.state.tempData} />
                <h4>Humidity</h4>
                <LineGraph data={this.state.humidityData} />
                <h4>CO2</h4>
                <LineGraph data={this.state.co2Data} />
                <h4>TVOC</h4>
                <LineGraph data={this.state.tvocData} />
            </div>
        }
    }
    //TODO: fetch selection of devices from db somehow, instead of hard coding it to 1~8 here.
    render() {
        return (
            <div>
                <Header />
                <div className="form-div">
                    <form>
                        <label>
                            <select className="dropdown" onChange={this.changeDevice} value={this.state.device}>
                                <option value="1">Device 1</option>
                                <option value="2">Device 2</option>
                                <option value="3">Device 3</option>
                                <option value="4">Device 4</option>
                                <option value="5">Device 5</option>
                                <option value="6">Device 6</option>
                                <option value="7">Device 7</option>
                                <option value="8">Device 8</option>
                            </select>
                        </label>
                        <label>Start Date: </label>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.changeStartDate}
                            todayButton="Go to today"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <label>End Date: </label>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.changeEndDate}
                            todayButton="Go to today"
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={10}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />

                        <Button
                            as="input" type="button" variant="outline-primary"
                            onClick={this.handleSubmit}
                            value="Update"
                            size="sm"
                            readOnly
                        />

                    </form>
                    {this.showLatestReadings()}
                    {this.showGraphs()}
                </div>
            </div>
        );
    }

}

export default DashboardPage;