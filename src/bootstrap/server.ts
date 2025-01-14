import app from './app';
import config from './config';

const port = config.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
});