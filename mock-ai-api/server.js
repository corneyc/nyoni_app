
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/predict', (req, res) => {
  const { imageUri } = req.body;
  console.log('Received image URI:', imageUri);

  // Mock AI recommended styles
  const recommendedStyles = [
    { id: 'boxBraids', name: 'Box Braids 💁🏾‍♀️' },
    { id: 'cornrows', name: 'Cornrows 🔥' },
    { id: 'goddessBraids', name: 'Goddess Braids ✨' },
  ];

  res.json({ recommendedStyles });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Mock AI API listening on port ${PORT}`));
