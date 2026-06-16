const express = require('express');

const registerStaticRoute = require('./routes/staticRoute');
const registerDynamicRoute = require('./routes/dynamicRoute');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

registerStaticRoute(app);
registerDynamicRoute(app);

app.use((req, res) => {
  res.status(404).json({ header: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
