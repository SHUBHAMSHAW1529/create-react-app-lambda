import React, { Component } from "react"
import CandidateCard from "./CandidateCard";
import Header from "./Header";
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    data: [] };
  }

  componentDidMount() {
    fetch('https://script.google.com/macros/s/AKfycbwSYnc8Ul4zGaiE9rSqhF_AI1k4WPodZO86lJDGWAr4KHKdTiZYFqFWdT3ljlaI5Y_u/exec')
      .then(response => response.json())
      .then(rawData => {
        const processedDataIntoRecords = this.processData(rawData);
        this.setState({ data: processedDataIntoRecords });
      })
      .catch(error => {
        console.log(error);
      });   
  }

  processData = (rawData) => {
    var result = [];
    const headers = rawData[0];

    rawData = rawData.slice(1);

    rawData.forEach(data => {
        const dataRecord = {};

        for (let idx = 0; idx < headers.length; idx++) {
            dataRecord[headers[idx]] = data[idx];
        }

        result.push(dataRecord);
    });

    return result;
  }

  render() {
    return (
        <div>
            <Header></Header>
            <div className="CandidateList" >
                {this.state.data.map((candidate, index) => (
                    <CandidateCard 
                        key={index} 
                        name={candidate.Name}
                        email={candidate.Email}
                        phone={candidate.Contact}>
                    </CandidateCard>
                ))}
            </div>
        </div>
    )
  }
}

export default MainLayout