import React, { Component } from 'react';
import Header from './components/Header';
import LineGraph from './components/LineGraph'
import DatePicker from "react-datepicker";
import moment from 'moment';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataByDevice: [],
            startDate: new Date(),
            endDate: new Date(),
            device: "1",
            isSubmitted:false
        };

        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    //SEND POST REQUEST
    handleSubmit(event) {
        
        alert("device_id: "+ this.state.device + "\n" +
                "timeStart: "+moment(this.state.startDate).format('YYYY-MM-DD') + "\n"+
                "timeEnd: "+moment(this.state.endDate).format('YYYY-MM-DD'));
                
        fetch('http://localhost:5000/records_test', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "device_id": this.state.device,
                "timeStart": moment(this.state.startDate).format('YYYY-MM-DD'),
                "timeEnd": moment(this.state.endDate).format('YYYY-MM-DD')
            })
        })
            .then(res => res.json())
            .then((data) => {
                this.setState({ dataByDevice: data });
                this.setState({ isSubmitted: true});
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


    
    render() {
        
        return (
            <div>
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
                    <input type="button" onClick={this.handleSubmit} value="Submit" />
                </form>

                {this.state.isSubmitted && <LineGraph data={this.state.dataByDevice} />}
            </div>
        );
    }

}

export default App;