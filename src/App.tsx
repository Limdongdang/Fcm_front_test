import './App.css';
import './firebase/firebase_initialize_app.js';
import { getFirebaseToken } from './firebase/firebase_initialize_app.ts';

getFirebaseToken();

function App() {
    return <h1>Firebase Cloud Message</h1>;
}

export default App;
