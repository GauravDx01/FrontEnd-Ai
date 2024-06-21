import React, { useEffect, useState } from "react";
import axios from "axios";
import './ai.css';
import img1 from '../Images/cropped-logo.webp';
import Loader from "../Loader/Loader";
import { URL } from '../url/url';
import FetchDataForm from "./FetchDataForm";
import {Data} from './'
function Ai() {
  const [fileContent, setFileContent] = useState('');
  const [question, setQuestion] = useState("");
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIPAndFileContent = async () => {
    try {
      setLoading(true);
      // Fetch public IP address from ipify API
      const ipResponse = await axios.get('https://api.ipify.org/?format=json');
      const ipAddress = ipResponse.data.ip;
      console.log("Fetched IP Address:", ipAddress);

      // Fetch file content using the retrieved IP address
      const response = await axios.get(`${URL}/getStoredData?ipAddress=${ipAddress}`);

      if (response.data && response.data.length > 0) {
        // Combine all paragraphs into a single string
        const allParagraphs = response.data.map(item => item.paragraphs).flat().join('\n');
        setFileContent(allParagraphs);
        // console.log("All paragraphs combined:", allParagraphs);
      } else {
        console.error("Error: No data found in response");
        setFileContent("");  // Ensure fileContent is set to an empty string if no data is found
      }
    } catch (error) {
      console.error("Error fetching IP address or file content:", error);
      setError(error);
      setFileContent("");  // Ensure fileContent is set to an empty string if an error occurs
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPAndFileContent();
  }, []);

  useEffect(() => {
   
  }, [fileContent]);

  const askQuestion = async (newQuestion) => {
    try {
      setLoading(true);

      // Check if the question is relevant
      const isRelevant = newQuestion.trim().length > 4; 
      let cleanAnswer = "";

      if (isRelevant) {
        if (!fileContent) {
          throw new Error("File content is empty or undefined");
        }

        const response = await axios.post(`${URL}/askQuestion`, {
          contents: [
            {
              parts: [
                { text: fileContent },
                {
                  text: `give answer only from the paragraph - ${newQuestion}`,
                },
              ],
            },
          ],
        });

        // console.log("API response:", response.data);

        cleanAnswer = response.data.candidates[0].content.parts[0].text;
        cleanAnswer = cleanAnswer.replace(/^\*\s*/gm, ""); // Remove leading stars and spaces
      } else {
        cleanAnswer = `The information does not contain the info about "${newQuestion}". Therefore, I cannot provide an answer from that paragraph.`;
      }

      setQuestionsAndAnswers((prev) => [
        ...prev,
        { question: newQuestion, answer: cleanAnswer.trim() }
      ]);
    } catch (error) {
      console.error("Error asking question:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default behavior of Enter key
      askQuestion(question); // Ask the question with the current question text
      setQuestion(""); // Clear the textarea
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="ai-box">
          <div className="answer-box">
            {questionsAndAnswers.length === 0 ? (
              <div className="by-default-div">
                <p> Start a conversation...</p> 
                <img className="img1" src={img1} alt="" />
               </div>
            ) : (
              questionsAndAnswers.map((qa, index) => (
                <div key={index} className="qa-pair">
                  <div className="current-question"><b> Que :</b> {qa.question}</div>
                  <div className="current-answer"><b> Ans :</b>  {qa.answer}</div>
                  <br />
                </div>
              ))
            )}
            {loading && <div><Loader/></div>}
          
          </div>
          <div className="question-box">
  {fileContent ? (
    <textarea
      id="myTextArea"
      className="ques-area"
      type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type your question..."
    />
  ) : (
    <FetchDataForm fetchData={fetchIPAndFileContent} />
  )}
</div>
        </div>
      </div>
    </>
  );
}

export default Ai;
