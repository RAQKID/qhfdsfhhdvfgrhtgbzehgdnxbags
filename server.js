import express from 'express';
import { style3 } from 'zarcogreeter';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/welcome', async (req, res) => {
  try {
    const { userName, userAvatarURL, serverName, bgURL } = req.query;

    if (!userName || !userAvatarURL || !serverName || !bgURL) {
      return res.status(400).send('Missing required query parameters.');
    }

    const user = { username: userName, avatarURL: userAvatarURL };
    const guild = serverName;

    const buffer = await style3(user, guild, {
      backgroundImage: bgURL,
      welcomeColor: '#fd8383ff',
      usernameColor: '#ffffffff',
      guildColor: '#bdc75fff',
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);

  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to generate welcome card.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
