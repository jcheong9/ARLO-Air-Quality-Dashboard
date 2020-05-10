import React, { Component } from 'react';
import Header from '../components/Header';
import LineGraph from '../components/LineGraph'
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataByDevice: [],
            Temperature: true,
            TVOC: true,
            CO2: true,
            Humidity: true,
            startDate: new Date().setHours(new Date().getHours() - 12),
            endDate: new Date(),
            device: "1",
            showLineGraph: false,
            error: false
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit();
    }


    //SEND POST REQUEST
    handleSubmit(event) {

        alert("device_id: " + this.state.device + "\n" +
            "Start_date: " + moment(this.state.startDate).format('YYYY-MM-DD HH:mm') + "\n" +
            "End_date: " + moment(this.state.endDate).format('YYYY-MM-DD HH:mm'));
        let tokenLocal = Cookies.get('token')
        fetch(`http://localhost:5000/readings?token=${tokenLocal}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "device_id": this.state.device,
                "Start_date": moment(this.state.startDate).format('YYYY-MM-DD HH:mm'),
                "End_date": moment(this.state.endDate).format('YYYY-MM-DD HH:mm'),
                "Temperature": this.state.Temperature,
                "TVOC": this.state.TVOC,
                "CO2": this.state.CO2,
                "Humidity": this.state.Humidity
            })
        })

            .then(res => res.json())
            .then((data) => {
                if (data && data.records_test_data && data.records_test_data.length > 0) {
                    this.setState({ dataByDevice: data });
                    this.setState({ showLineGraph: true });
                } else {
                    this.setState({ error: true });
                    this.setState({ showLineGraph: false });
                }
                console.log(JSON.stringify(data, 1, null));
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
                this.setState({ showLineGraph: false });
            })

    }

    changeStartDate = (event) => {
        this.setState({ startDate: event });
    }

    changeEndDate = (event) => {
        this.setState({ endDate: event });
    }


    changeDevice = (event) => {
        this.setState({ device: event.target.value });
    }

    checkBoxChange(key, event) {
        let newObj = {};
        newObj[key] = event.target.checked;
        this.setState(newObj);
    }

    // onclickReset = (event) => {
    //     window.location.reload();
    // }

    //TODO: fetch selection of devices from db somehow, instead of hard coding it to 1~8 here.
    render() {

        const cboxes = ["Temperature", "TVOC", "CO2", "Humidity"];
        const cboxItems = [];
        cboxes.forEach(item => cboxItems.push(
            <Form.Check
                type='checkbox'
                label={item}
                key={item}
                checked={this.state[item]}
                onChange={this.checkBoxChange.bind(this, item)}
            />
        ))
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
                        <div className="checkbox-group">
                            {cboxItems}
                        </div>

                        <Button
                            as="input" type="button" variant="outline-primary"
                            onClick={this.handleSubmit}
                            value="Submit"
                            size="sm"
                            readOnly
                        />

                        {/* <Button as="input" type="button" variant="outline-secondary" onClick={this.onclickReset} value="Clear" size="sm" readOnly/> */}

                    </form>
                    {this.state.showLineGraph && <LineGraph data={this.state.dataByDevice} />}
                    {this.state.error && <div> <h1>Data could not be retrieved</h1></div>}
                </div>
            </div>
        );
    }

}

export default DashboardPage;