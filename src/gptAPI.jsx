import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import myGif from './loading.gif';
import { bouncy } from 'ldrs'


require('dotenv').config();


const API_KEY = process.env.OPENAI_API_KEY;

const GPTForm = () => {
    const [responses, setResponses] = useState([]);
    const location = useLocation();
    const navigate = useNavigate(); // For redirecting with state

    const posts = location.state?.posts;
    useEffect(() => {
        const fetchData = async () => {
            if (posts && posts.length > 0) {
                const tempResponses = [];
                for (const post of posts) {
                    const data = {
                        model: "gpt-4-0125-preview",
                        messages: [{
                            "role": "user",
                            "content": `                            
                            Task: Extract specific details from the social media post caption provided in ${post.caption} and format the output as instructed.


                            Details to Extract:
                           
                            Restaurant Name: Directly extract the restaurant's name.
                            Correct Example: "Sushi By Scratch"
                            Correct Example: "Nobu"
                            Incorrect Example: "The restaurant name is Sushi By Scratch"
                            Incorrect Example: "@dinelaserre"
                            City: Identify and state only the city where the restaurant is located.
                            Correct Example: "Chicago"
                            Correct Example: "New York"
                            Correct Example: "San Fransisco"
                            Incorrect Example: "I think the city is Chicago"
                            Rating: Provide a numerical rating out of 5.0 based solely on the description in the post.
                            Correct Example: "4.5"
                            Correct Example: "4.0"
                            Correct Example: "3.2"
                            Incorrect Example: "Based on the description, it sounds like a unique and intimate dining experience, so I would rate it 4.5 out of 5.0"
                            Output Format:
                            Ensure to use the following structure. If any information is missing, indicate with "NA".
                           
 
 
                            Restaurant Name: {Restaurant Name or NA}
                            City: {City or NA}
                            Rating: {Rating or NA}
                            Examples of Proper Output:
                           
                            If all details are available this is a good output:
                            Restaurant Name: Sushi By Scratch
                            City: Chicago
                            Rating: 5.0
 
                            If details are missing:
                            Restaurant Name: NA
                            City: NA
                            Rating: NA
 
                            A bad example of an output if details are missing: "I'm sorry, but I don't see any specific post details mentioning the restaurant's name or city. Can you provide more information or context so I can help you better?"
 
                            Note: Avoid adding any explanations, conjectures, or additional text outside the above format. The output should strictly contain the formatted lines with the extracted information or "NA" where information is unavailable.
 
                            `}],
                    };

                    await new Promise(resolve => setTimeout(resolve, 100));

                    try {
                        const result = await axios.post('https://api.openai.com/v1/chat/completions', data, {
                            headers: {
                                'Authorization': `Bearer ${API_KEY}`,
                                'Content-Type': 'application/json'
                            }
                        });
                        tempResponses.push({
                            id: post.id,
                            caption: post.caption,
                            timestamp: post.timestamp,
                            analysis: result.data.choices[0].message.content
                        });
                    } catch (error) {
                        if (error.response && error.response.status === 429) {
                            console.log('Rate limit exceeded, retrying...');
                            await new Promise(resolve => setTimeout(resolve, 2000));
                            continue;
                        }
                        console.error('Error calling OpenAI API:', error);
                    }
                }
                setResponses(tempResponses);

                navigate('/share', { state: { responses: tempResponses } });
            }
        };

        fetchData();
    }, [posts, navigate]); // Add navigate to dependencies




    return (
        <div className="container" style={{
            display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: 'white', padding: '20px', justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img src={myGif} alt="Loading" style={{ marginBottom: '10vh', width: '30vw', height: 'auto' }} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <div className="loading-text">Loading</div>
                <l-bouncy
                    size="45"
                    speed="1.75"
                    color="black"
                ></l-bouncy>
            </div>
            <style jsx>{`
            .loading-text {
                font-size: 48px;
                font-weight: bold;
                color: black;
                margin-right: 20px; // Adds spacing between the text and the component
            }
        `}</style>
        </div>
    );
};

bouncy.register();

export default GPTForm;