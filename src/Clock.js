import { useEffect, useState } from "react";

// const variables
const DEGREES = 360;

// custom hooks
function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date()); // changes value of date every 100 milliseconds (not every second for increased accuracy)
    }, 100);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return date;
}

export default function Clock() {
  // establishing time, percentages and hand angles
  const date = useCurrentDate();
  const hours = date.getHours() % 12; // 12 hour time vs. 23 hour time
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const secondsPercentage = seconds / 60;
  const minutesPercentage = (minutes + secondsPercentage) / 60;
  const hoursPercentage = (hours + minutesPercentage) / 12;

  const hourAngle = hoursPercentage * DEGREES;
  const minutesAngle = minutesPercentage * DEGREES;
  const secondsAngle = secondsPercentage * DEGREES;

  // creating clock numbers
  const clockHours = [];
  for (let i = 1; i < 13; i++) {
    const angle = (i / 12) * DEGREES;
    clockHours.push(
      <div
        className="number"
        key={i}
        style={{
          ...numberStyle,
          transform: `rotate(${angle - 180}deg) translate(0, -225px) rotate(${
            180 - angle
          }deg)`,
        }}
      >
        <div style={{ transform: "rotate(180deg)" }}>{i}</div>
      </div>
    );
  }

  return (
    <div style={{ ...clockStyle }}>
      <div>
        <Hand height={0.6} angle={hourAngle} width={3} color={"black"} />
        <Hand height={0.75} angle={minutesAngle} width={2} color={"grey"} />
        <Hand height={0.85} angle={secondsAngle} color={"red"} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: 'absolute',
          top: '0%',
          left: '0%'
        }}
      >
        {clockHours}
      </div>
    </div>
  );
}

// Hand Component
function Hand({ height = 1, width = 1, angle, color }) {
  return (
    <div
      aria-hidden={true}
      style={{
        ...handStyle,
        backgroundColor: color,
        transform: `rotate(${angle}deg) scaleY(${height}) scaleX(${width})`,
      }}
    />
  );
}

// styles
const handStyle = {
  position: "absolute",
  width: "1px",
  height: "250px",
  left: "250px",
  top: "250px",
  transformOrigin: "top center",
};

const clockStyle = {
  flexShrink: "0",
  position: "relative",
  border: "2px solid #ccc",
  borderRadius: "50%",
  width: "500px",
  height: "500px",
  transform: "rotate(180deg)",
  display: "block",
};

const numberStyle = {
  position: "absolute",
  width: "30px",
  height: "30px",
  transformOrigin: "center center",
  textAlign: "center",
  fontSize: "1.5rem",
  top: '48%',
  left: '47%'
};
