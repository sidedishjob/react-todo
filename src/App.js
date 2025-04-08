import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoDetail from './pages/TodoDetail';
import Settings from './pages/Settings';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todo/:id" element={<TodoDetail />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</Router>
	);
}

export default App;
