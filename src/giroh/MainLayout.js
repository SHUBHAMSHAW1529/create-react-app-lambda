import React, { Component } from "react"
import CandidateCard from "./CandidateCard";
import Header from "./Header";
import CandidateSidePanel from "./CandidateSidePanel";

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    data: [],
    candidateSidePanelData: {} };
  }

  componentDidMount() {
    fetch('https://script.google.com/macros/s/AKfycbwSYnc8Ul4zGaiE9rSqhF_AI1k4WPodZO86lJDGWAr4KHKdTiZYFqFWdT3ljlaI5Y_u/exec')
      .then(response => response.json())
      .then(rawData => {
        const processedDataIntoRecords = this.processData(rawData);
        this.setState({ data: processedDataIntoRecords,  candidateSidePanelData: processedDataIntoRecords[0] });
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

  handleCandidateClick = (candidateSidePanelData) => {
    this.setState({ ...this.state, candidateSidePanelData : candidateSidePanelData});
  }

  appliedJobs = [
    { id: 1, title: 'Software Engineer at Meta' },
    { id: 2, title: 'Software Engineer at Google' },
    { id: 3, title: 'Software Engineer at Roku' }
  ];
  render() {
    return (
        <div>
            <Header></Header>
            <div className="candidate-main">
                <div className="candidate-list" >
                    {this.state.data.map((candidate, index) => (
                        <CandidateCard 
                            key={index} 
                            candidateData={candidate}
                            onCandidateCardClick={this.handleCandidateClick}
                        >
                        </CandidateCard>
                    ))}
                </div>
                <div className="candidate-side-panel">
                    {
                        this.state.candidateSidePanelData &&
                        <CandidateSidePanel 
                            candidate={this.state.candidateSidePanelData}
                            appliedJobs={this.appliedJobs}
                        >
                        </CandidateSidePanel>
                    }
                        
                </div>
            </div>
        </div>
    )
  }
}

export default MainLayout