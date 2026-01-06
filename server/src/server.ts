import app from './app';

const PORT = 3000;
// 0.0.0.0 makes server accessible from outside the container
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
