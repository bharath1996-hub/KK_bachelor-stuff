const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'votes.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize votes file if it doesn't exist
function loadVotes() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading votes:', e);
  }
  return { votes: {}, customAdjectives: [], totalVoters: 0 };
}

function saveVotes(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Submit votes
app.post('/api/vote', (req, res) => {
  const { selected, custom } = req.body;

  if (!selected || !Array.isArray(selected) || selected.length !== 3) {
    return res.status(400).json({ error: 'Please select exactly 3 qualities' });
  }

  const data = loadVotes();

  selected.forEach(quality => {
    data.votes[quality] = (data.votes[quality] || 0) + 1;
  });

  if (custom && custom.trim()) {
    const trimmed = custom.trim();
    data.customAdjectives.push(trimmed);
    // Also count the custom adjective as a vote
    data.votes[trimmed] = (data.votes[trimmed] || 0) + 1;
  }

  data.totalVoters += 1;
  saveVotes(data);

  res.json({ success: true, totalVoters: data.totalVoters });
});

// Get results
app.get('/api/results', (req, res) => {
  const data = loadVotes();
  res.json(data);
});

// Reset (admin)
app.post('/api/reset', (req, res) => {
  saveVotes({ votes: {}, customAdjectives: [], totalVoters: 0 });
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`KK's Bachelor Party app running on port ${PORT}`);
});
