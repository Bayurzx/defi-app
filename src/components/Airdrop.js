import React, { useState, useEffect, useCallback } from "react";
import bootstrap from "bootstrap";
// import { clearInterval } from "timers";


const Airdrop = ({ stakingBalance }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  // const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    if (!timeLeft) return ; 

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [timeLeft])

  function secondstoTime(sec = 500) {
    sec = Number(sec);
    let hour, second, minute
    if (sec<1) return " "
    if (sec<4) return "Airdrop time 🎉🎉🎉!!!"
    if (sec>3) {
      hour = Math.floor(sec / 3600);
      minute = Math.floor((sec % 3600) /60); 
      second = Math.floor((sec % 3600) % 60 );
    }

    return `${hour === 1 ? hour + " hour :" : hour < 1 ? "" : hour + " hours :" } 
         ${minute === 1 ? minute + " minute :" : minute < 1 ? "" : minute + " minutes :" }
         ${second === 1 ? second + " second" : second < 1 ? "" : second + " seconds" } `;

  }


  return (
    <>
      <div id="timer">
        {console.log(`Staking 2: ${stakingBalance}, type ${typeof stakingBalance}`)}
        <h2>{stakingBalance > 49 ? secondstoTime(timeLeft) : ''} </h2>
      </div>
    </>
  );
};

export default Airdrop;
