import { h } from 'preact';
import { Router } from 'preact-router';


// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import PaymentForm from '../routes/PaymentForm';

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" />
			<PaymentForm path="/payment" />
		</Router>
	</div>
)

export default App;
