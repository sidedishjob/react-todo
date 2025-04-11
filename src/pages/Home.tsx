import React from 'react';
import AppLayout from '../layouts/AppLayout';
import TodoContainer from '../components/containers/TodoContainer';

const Home = () => {
	return (
		<AppLayout>
			<TodoContainer />
		</AppLayout>
	)
};

export default Home;
