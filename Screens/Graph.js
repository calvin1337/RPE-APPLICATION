// Inside the component function
const [workouts, setWorkouts] = useState([]);

// Assuming each workout object has properties like date, RPE, and duration
// You'll need to adjust this according to your actual data structure
const prepareChartData = () => {
  const labels = workouts.map(workout => workout.date); // Assuming you have a 'date' property in each workout
  const data = workouts.map(workout => workout.RPE * workout.duration); // Assuming you have 'RPE' and 'duration' properties
  return {
    labels,
    datasets: [{
      data,
      color: (opacity = 0.5) => `rgba(0, 122, 255, ${opacity})`, // Lighter blue color
    }],
  };
};

// Inside the return statement, use the prepared data
<BarChart
  data={prepareChartData()}
  width={width * 0.9}
  height={200}
  chartConfig={{
    backgroundGradientFrom: 'rgba(27, 23, 39, 0.8)',
    backgroundGradientTo: 'rgba(27, 23, 39, 0.8)',
    barPercentage: 0.7,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
  }}
  style={styles.chart}
  verticalLabelRotation={30}
  withInnerLines={false}
/>
