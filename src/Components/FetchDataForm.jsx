import React, { useState } from 'react';
import axios from 'axios';

// Assuming Loader is a component that shows a loading spinner or message
const Loader = () => {
  return <div>Loading...</div>;
};

function FetchDataForm() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator
    try {
      const response = await axios.post("http://localhost:5001/api/fetchData", { url });
      console.log("Response:", response.data);
      setData(response.data);
      if(response){
        window.location.reload()
      }
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <button type="submit">Fetch Data</button>
      </form>

      {/* Display Loader component if loading state is true */}
      {loading && <Loader />}

     
      
    </div>
  );
}

export default FetchDataForm;
