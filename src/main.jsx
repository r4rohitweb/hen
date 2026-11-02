import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/styles.css';
import './styles/bottom.css';
import './styles/hen-motion.css';
import './styles/cooking.css';
import './styles/hero-cinematic.css';
import './styles/mornings.css';
import './styles/escape.css';
import './styles/inside.css';
import './styles/journey.css';
import './styles/care-story.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>,
);
