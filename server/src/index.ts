import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function initApp() {
  

}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

initApp().catch((err) => console.log(`Failed to initialize app: ${err}`));
