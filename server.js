const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors()); 

app.use(bodyParser.json());

const apiKey = 'AIzaSyBEMWcnXQBXA3YwihCu3y8CgC9eRKf8cJM';
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3/videos';
const youtubechannelUrl = 'https://www.googleapis.com/youtube/v3/channels';
 const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'devmamgain123@gmail.com',
     pass: 'mwxd tfua jvvo wpit',
},
});

app.post('/api/analyzeVideo', async (req, res) => {
  try {
    const videoLink = req.body.videoLink;
    const videoId = videoLink.split('v=')[1];

    if (!videoId) {
      return res.status(400).json({ error: 'Invalid YouTube video link' });
    }

    const videoResponse = await axios.get(`${youtubeApiBaseUrl}?id=${videoId}&part=snippet,statistics&key=${apiKey}`);
    const channelId = videoResponse.data.items[0].snippet.channelId;
    
    const channelResponse = await axios.get(`${youtubechannelUrl}?id=${channelId}&part=snippet,statistics&key=${apiKey}`);
    const videoMetrics = {
      subscriberCount: channelResponse.data.items[0].statistics.subscriberCount,
      likes: videoResponse.data.items[0].statistics.likeCount,
      comments: videoResponse.data.items[0].statistics.commentCount,
      views: videoResponse.data.items[0].statistics.viewCount,
    };
    const videoDetailsResponse = await axios.get(`${youtubeApiBaseUrl}?id=${videoId}&part=snippet&key=${apiKey}`);
    const videoDetails = {
      title: videoDetailsResponse.data.items[0].snippet.title,
      thumbnailUrl: videoDetailsResponse.data.items[0].snippet.thumbnails.default.url,
    };
   
    const earnings =
      Math.min(videoMetrics.subscriberCount, videoMetrics.views) +
      10 * videoMetrics.comments +
      5 * videoMetrics.likes;

      app.post('/api/sendEmailNotification', async (req, res) => {
        try {
          const name = req.body.name || 'Not provided';
    const contactNumber = req.body.contactNumber;
     const mailOptions = {
       from: 'devmamgain123@gmail.com',
       to: 'ravi@anchors.in',
       subject: 'Callback Request',
       html: `<p>Name: ${name || 'Not provided'}</p>
              <p>Contact Number: ${contactNumber}</p>`,
     };

     await transporter.sendMail(mailOptions);
     res.json({ success: true, message: 'Email notification sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
    res.json({
      videoMetrics,
      earnings,
      videoDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
