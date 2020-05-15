import React, { Component } from 'react';
import Header from '../components/Header';
import LineGraph from '../components/LineGraph'
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import LastReadings from '../components/LastReadings'
import  { Redirect } from 'react-router-dom'

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            tempData: [],
            tvocData: [],
            co2Data: [],
            humidityData:[],
            lastReadings: {},
            startDate: new Date().setHours(new Date().getHours() - 12),
            endDate: new Date(),
            selectedDevice: "1",
            showLineGraph: false,
            graphError: false,
            graphErrorMessage: "",
            latestReadingsError: false,
            latestReadingsErrorMessage: "",
            deviceError: false,
            loading: false,
            isSubmitted: false,
            fetchError: false
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getlatest = this.getLatest.bind(this);
        this.getDevices = this.getDevices.bind(this);
        this.getDevices();
    }


    getDevices() {
        let tokenLocal = Cookies.get('token')
        fetch('http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/devices', {
            method: 'post',
            headers: {'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtHQTFLZGVQbHpnQUlzZmpuWUZKOCJ9.eyJpc3MiOiJodHRwczovL2FybG8tYXEtYXBpLmF1dGgwLmNvbS8iLCJzdWIiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BUkxPLUFRL2FwaSIsImlhdCI6MTU4OTQ4NzYyMSwiZXhwIjoxNTkyMDc5NjIxLCJhenAiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.sOao5ajzFe1WNJr_Gqa4FEuemhL7iTnMCj9aAwiKt9SePqRJD7p6AkrYchGHDi30WYU7f-rLHbOGC0M8l0hbrFddY-7OKazLLaOxtMMEFM2Ag10a5iA5UIc7Uc_LFVfjDKkwz6EKSjg3tii6PH-W-wgsndWLZ1Nu4qeNtCH0YkqJKCz7U_tec6M0KSVMTgtQ3_TH3TDv5x-oePGgTtB8l0Z2saRdcQiRcIehzhNlgquyJmdx6DijYzx_49uBHahn86AUXO3gQlZquDR2tQS6IIrXTXWjoE-mlpH9YzTFSrE-RWfHLPA4jt0YT7_QT5w_7vj1nuX5zfpFl3_CqVL2DQ'}
        })
        .then(res => res.json())
        .then((data) => {
            this.setState({
                devices: data.device_info_data,
                deviceError: false,
                selectedDevice: data.device_info_data[0].device_id
            });
            this.handleSubmit();
        })
        .catch(err => {
            console.log(err);
            this.setState({deviceError: true})
        });
    }
    getLatest(event) {
        let tokenLocal = Cookies.get('token')
        fetch('http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/readings/device', {
            method: 'post',
            headers: {  'Content-Type': 'application/json',
                        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtHQTFLZGVQbHpnQUlzZmpuWUZKOCJ9.eyJpc3MiOiJodHRwczovL2FybG8tYXEtYXBpLmF1dGgwLmNvbS8iLCJzdWIiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BUkxPLUFRL2FwaSIsImlhdCI6MTU4OTQ4NzYyMSwiZXhwIjoxNTkyMDc5NjIxLCJhenAiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.sOao5ajzFe1WNJr_Gqa4FEuemhL7iTnMCj9aAwiKt9SePqRJD7p6AkrYchGHDi30WYU7f-rLHbOGC0M8l0hbrFddY-7OKazLLaOxtMMEFM2Ag10a5iA5UIc7Uc_LFVfjDKkwz6EKSjg3tii6PH-W-wgsndWLZ1Nu4qeNtCH0YkqJKCz7U_tec6M0KSVMTgtQ3_TH3TDv5x-oePGgTtB8l0Z2saRdcQiRcIehzhNlgquyJmdx6DijYzx_49uBHahn86AUXO3gQlZquDR2tQS6IIrXTXWjoE-mlpH9YzTFSrE-RWfHLPA4jt0YT7_QT5w_7vj1nuX5zfpFl3_CqVL2DQ'},
            body: JSON.stringify({'id':`${this.state.selectedDevice}`})
        })
            .then(res => res.json())
            .then((data) => {
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
        fetch(`http://ec2-34-216-137-71.us-west-2.compute.amazonaws.com:5000/readings`, {
            method: 'post',
            headers: {  'Content-Type': 'application/json',
                        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtHQTFLZGVQbHpnQUlzZmpuWUZKOCJ9.eyJpc3MiOiJodHRwczovL2FybG8tYXEtYXBpLmF1dGgwLmNvbS8iLCJzdWIiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9BUkxPLUFRL2FwaSIsImlhdCI6MTU4OTQ4NzYyMSwiZXhwIjoxNTkyMDc5NjIxLCJhenAiOiJpNkdzejR3elQ0WUtPelNIRmRmUXBhT0ZJUHB4bjRRbSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.sOao5ajzFe1WNJr_Gqa4FEuemhL7iTnMCj9aAwiKt9SePqRJD7p6AkrYchGHDi30WYU7f-rLHbOGC0M8l0hbrFddY-7OKazLLaOxtMMEFM2Ag10a5iA5UIc7Uc_LFVfjDKkwz6EKSjg3tii6PH-W-wgsndWLZ1Nu4qeNtCH0YkqJKCz7U_tec6M0KSVMTgtQ3_TH3TDv5x-oePGgTtB8l0Z2saRdcQiRcIehzhNlgquyJmdx6DijYzx_49uBHahn86AUXO3gQlZquDR2tQS6IIrXTXWjoE-mlpH9YzTFSrE-RWfHLPA4jt0YT7_QT5w_7vj1nuX5zfpFl3_CqVL2DQ'},
            body: JSON.stringify({
                "device_id": this.state.selectedDevice,
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
                    showLineGraph: false,
                    fetchError: true
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
        this.setState({ selectedDevice: event.target.value })
    }

    checkBoxChange(key, event) {
        let newObj = {};
        newObj[key] = event.target.checked;
        this.setState(newObj);
    }

    showLatestReadings = () => {
        let deviceData = this.state.devices.filter((device) => device.device_id === parseInt(this.state.selectedDevice,10))
        if(!this.state.latestReadingsError) {
            return <LastReadings reading={this.state.lastReadings} deviceData={deviceData[0]}/>
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

    showContents = () => {
        if(this.state.deviceError) {
            return <h1 className="mt-5 text-center"> Sorry, there was an error connecting to the database. </h1>
        } else {
            return <div className="form-div">
                        <form>
                            <label>
                                <select className="dropdown" onChange={this.changeDevice} value={this.state.selectedDevice}>
                                    {this.state.devices.map((device) => {
                                        return <option value={device.device_id}>{device.device_name} </option>
                                    })}
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
        }
    }
    //TODO: fetch selection of devices from db somehow, instead of hard coding it to 1~8 here.
    render() {

        if(this.state.fetchError){
            return <Redirect to={{
                pathname: '/',
                state: { stateAlertError: true }
            }}
            />
        }

        return (
            <div>
                <Header />
                {this.showContents()}
            </div>
        )
    }

}

export default DashboardPage;