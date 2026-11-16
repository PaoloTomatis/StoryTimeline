// Importing modules
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importing style
import './index.css';

// Importing app
import App from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
