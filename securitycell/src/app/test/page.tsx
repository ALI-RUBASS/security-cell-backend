'use client';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SourceCode from '../../components/SourceCode'; // Import the animated code block component

export default function XssTesterPage() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [detectedPayloads, setDetectedPayloads] = useState<string[]>([]);
  const [updates, setUpdates] = useState<string[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socket.on('update', (data) => {
      setUpdates((prevUpdates) => [...prevUpdates, data.message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const testXss = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/test-xss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.message);
      setDetectedPayloads(data.detected_payloads || []);
    } catch (error) {
      console.error('Error testing XSS:', error);
      setResult('An error occurred.');
      setDetectedPayloads([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">XSS Tester</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        className="border px-4 py-2 rounded w-full"
      />
      <button
        onClick={testXss}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Test for XSS
      </button>

      <div className="mt-4">
        <SourceCode updates={updates} /> {/* Pass live updates to the animated component */}
      </div>

      {result && <p className="mt-4">{result}</p>}
      {detectedPayloads.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Detected Payloads:</h2>
          <ul>
            {detectedPayloads.map((payload, index) => (
              <li key={index} className="text-red-500">
                {payload}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
