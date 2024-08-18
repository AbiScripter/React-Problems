import React, { useEffect, useState } from "react";
import "./JobBoard.css";

// https://hacker-news.firebaseio.com/v0/item/YOUR_POST_ID_HERE.json

const JobBoard = () => {
  const [jobIds, setJobsIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetching JOB IDS
  useEffect(() => {
    async function fetchJobIds() {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      const data = await response.json();
      console.log(data);
      setJobsIds(data);
    }
    fetchJobIds();
  }, []);

  //fetching data for each jobs
  async function fetchJobData(id) {
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data for ID ${id}:`, error);
      setError(error.message);
      return null;
    } finally {
    }
  }

  useEffect(() => {
    console.log(currentIndex);
    if (jobIds.length > 0 && currentIndex < jobIds.length) {
      async function kk() {
        setIsLoading(true);
        let tempData = [];
        for (let i = currentIndex; i < currentIndex + 5; i++) {
          const data = await fetchJobData(jobIds[i]);
          //only if the data is not null
          if (data) {
            tempData.push(data);
          }
        }
        setJobData((prev) => [...prev, ...tempData]);
        setIsLoading(false);
      }
      kk();
    }
  }, [jobIds, currentIndex]);

  function loadmore() {
    setCurrentIndex((prev) => prev + 5);
  }

  console.log(jobIds);
  console.log(jobData);

  if (error) {
    return <h2>{error}</h2>;
  }
  if (isLoading) {
    return <h2>Loading......</h2>;
  }

  return (
    <>
      <h1>HackerNews Jobs</h1>
      <div className="jobs-container">
        {jobData.map((job) => {
          return (
            <div key={job.id} className="job">
              <h2 className="job-title">
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.title}
                </a>
              </h2>

              <h3 className="job-by">{job.by}</h3>
            </div>
          );
        })}
      </div>
      <button className="load-btn" onClick={loadmore}>
        load more
      </button>
    </>
  );
};
export default JobBoard;
