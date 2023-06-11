import { LineChart, Grid } from 'react-native-svg-charts'; // <-- Import LineChart and Grid
import { ALPHA_VANTAGE_API_KEY } from '@env';

export default function StockChart({ symbol }) {
  const [data, setData] = useState([]);

  // Function that fetches the Stock Data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`); // - Url to call the alpha vantage api
        const data = await response.json();
        const timeSeries = data['Time Series (Daily)'];
        const prices = Object.values(timeSeries).map(value => parseFloat(value['4. close']));
        setData(prices);
      } catch (error) {
        console.error('Failed to fetch stock data', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <LineChart
      style={{ height: 200 }}
      data={data}
      svg={{ stroke: 'rgb(134, 65, 244)' }}
      contentInset={{ top: 20, bottom: 20 }}
    >
      <Grid />
    </LineChart>
  );
}
