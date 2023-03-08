import React from 'react';
const CandidateSidePanel = ({ candidate, appliedJobs }) => {
    return (
      <div className="candidate-side-panel">
        <div className="candidate-info-widget">
          <h2>Candidate Information</h2>
          <p>Name: {candidate.Name}</p>
          <p>Email: {candidate.Email}</p>
          <p>Phone: {candidate.Contact}</p>
          {/* Add more candidate information as needed */}
        </div>
        <div className="applied-jobs-widget">
          <h2>Applied Jobs</h2>
          <ul>
            {appliedJobs.map((job) => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default CandidateSidePanel;

  
  
  
  