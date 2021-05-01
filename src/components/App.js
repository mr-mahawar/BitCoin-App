import React from "react";
import BinanceGraph from "./BinanceGraph";

class App extends React.Component {
	ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

	render() {
		return (
			<div className="ui container segment" style={{height: '100vh', boxShadow: '0 0 100px rgba(255, 238, 0, 0.5)'}}>
				<BinanceGraph ws={this.ws} />
			</div>
		);
	}
}

export default App;