"use client"
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState('');
  
    useEffect(() => {
      fetch("http://localhost:8080/example", { method: "GET", mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
          setData(data.message);
      })
      .catch((error) => console.error('API エラー:', error));
    }, []);
  
    return (
      <div>
        <h1>取得したデータ:</h1>
        <p>{data}</p>
      </div>
    );
}
