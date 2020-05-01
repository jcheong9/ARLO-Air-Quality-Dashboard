import React, { Component } from 'react';
import Header from './components/Header';
import LineGraph from './components/LineGraph'
import Login from './components/Login'
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import moment from 'moment';
import Button from 'react-bootstrap/Button';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataByDevice: [],
            Temperature: true,
            TVOC: true,
            CO2: true,
            Humidity: true,
            startDate: new Date(),
            endDate: new Date(),
            device: "1",
            isSubmitted: false
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    //SEND POST REQUEST
    handleSubmit(event) {

        alert("device_id: " + this.state.device + "\n" +
            "Start_date: " + moment(this.state.startDate).format('YYYY-MM-DD') + "\n" +
            "End_date: " + moment(this.state.endDate).format('YYYY-MM-DD'));

        fetch('http://localhost:5000/readings', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "device_id": this.state.device,
                "Start_date": moment(this.state.startDate).format('YYYY-MM-DD'),
                "End_date": moment(this.state.endDate).format('YYYY-MM-DD'),
                "Temperature": this.state.Temperature,
                "TVOC": this.state.TVOC,
                "CO2": this.state.CO2,
                "Humidity": this.state.Humidity
            })
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ dataByDevice: data });
                this.setState({ isSubmitted: true });
            })
            .catch(console.log)

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

    onclickReset = (event) => {
        window.location.reload();
    }

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
                <Login/>
                <Header />
                <form>
                    <label>
                        Pick a device:
                        <select onChange={this.changeDevice} value={this.state.selectDevice}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </label>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.changeStartDate}
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.changeEndDate}
                    />
                    {cboxItems}

                    <Button
                        as="input" type="button" variant="outline-primary"
                        onClick={!this.state.isSubmitted ? this.handleSubmit : null}
                        value="Submit"
                        size="sm"
                        disabled={this.state.isSubmitted} readOnly/>

                    <Button as="input" type="button" variant="outline-secondary" onClick={this.onclickReset} value="Reset" size="sm" readOnly/>

                </form>

                {this.state.isSubmitted && <LineGraph data={this.state.dataByDevice} />}

            </div>
        );
    }

}

export default App;