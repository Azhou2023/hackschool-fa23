import Navbar from "../components/navbar-component/navbar.jsx";
import HistoryModule from "../components/game-history-component/gameHistory.jsx";
import styles from "../styles/History.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function gameHistory() {
  const [topStats, setTopStats] = useState([]);
  const [allStats, setAllStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tritontype.onrender.com/api/game"
      );
      let sortedData = response.data.sort((a, b) => b.wpm - a.wpm);
      console.log(sortedData);
      setTopStats(sortedData.slice(0, 3));
      setAllStats(sortedData.slice(3));
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch game stats: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      <title>Leaderboard</title>
      <Navbar />
      {!loading ? (
        <div className={styles.welcome}>
          <h1>Top 3 Games</h1>
          <div className={styles.topThree}>
            {topStats.map((game, index) => (
              <HistoryModule key={index} {...game} />
            ))}
          </div>
          <h1>All Games</h1>
          <div className={styles.allGames}>
            {allStats.map((game, index) => (
              <HistoryModule key={index} {...game} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.welcome}>
          <h1>Loading...</h1>
          <div>(This may take a few seconds)</div>
        </div>
      )}
    </div>
  );
}
