import React from 'react';
import { theme } from './styles/theme';
import Routes from './Routes';
import { ThemeProvider } from 'styled-components';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes />
		</ThemeProvider>
	);
}

export default App;
