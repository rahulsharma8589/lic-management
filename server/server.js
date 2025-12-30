const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // Import Path
const connectDB = require('./config/db');

// Import Routes
const clientRoutes = require('./routes/clientRoutes');
const policyRoutes = require('./routes/policyRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// --- Make the 'uploads' folder public so frontend can view images ---
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Use Routes ---
app.use('/api/clients', clientRoutes);
app.use('/api/policies', policyRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});