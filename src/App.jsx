import "./styles.css";
import Header from "./header.jsx";
import Video from "./video.jsx";
import "animate.css";
import "./cards.css";
import PlayerInfo from "./TrainingData.jsx";
import PerformanceStats from "./PerformanceCard";
import PlayerCard from "./PlayerCard";
import MyFooter from "./footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <div className="App">
      <Header />
      <h2 className="punchLine roboto-serif-font">
        Beyond <span className="checkOut">Guesswork</span>. Into Measured{" "}
        <span className="highlight">Accuracy</span>.
      </h2>
      <Video />
      <div className="playerCards">
        <PlayerCard />
        <div className="statCards">
          <PerformanceStats />
          <PlayerInfo />
        </div>
      </div>
      <MyFooter />
    </div>
  );
}
