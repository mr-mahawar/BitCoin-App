import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

class BinanceGraph extends React.Component {
	state = { data: [], currentPrice: 0 }
	newData = [];

	getTrade() {
		this.setState({ data: this.newData });
	}

	render() {
		this.props.ws.onmessage = (e) => {
			// Converting Response String into a JSON Object
			const response  = JSON.parse(e.data);

			// Controlling overflow of Data
			if (this.newData.length > 200) {
				this.newData.shift();
			}

			// COnverting given Time in ms to Time String (HH:MM:SS)
			const time = new Date(response.T).toTimeString();
			let timeValue = time.split(' ')[0];

			// Storing Data
			this.newData = [...this.newData, { name: timeValue , Quantity: response.q}];

			// Getting Current Price and Rounding it upto Two Decimal Points
			let price = parseFloat(response.p);
			price = price.toFixed(2);
			this.setState({ currentPrice: price });
			
			// Setting State of Data so that graph Re Renders
			this.getTrade();
		}

		return (
			<div style={{display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems : 'center', height: '100%'}}>
				<h1 className="header">Binance Chart</h1>
				<h3 className="header" style={{color: 'gold'}}>{`Current Price : $ ${this.state.currentPrice}`}</h3>
				<LineChart width={1000} height={400} data={this.state.data}>
					<XAxis dataKey="name"/>
					<YAxis/>
					<Tooltip />
					<Legend />
					<Line type="monotone" isAnimationActive={false} dot={false} dataKey="Quantity" stroke="gold" />
				</LineChart>
			</div>
		);
	}
}

export default BinanceGraph;