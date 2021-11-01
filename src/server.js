const colors = require('colors');
const app = require('./app');

const port = process.env.APP_PORT || 3333;

app.listen(port, () => {
  console.log(
    colors.yellow(`Examination Laboratory API server is running on port ${port} 🚀`),
  );
  console.log(colors.yellow(`CTRL + Click in http://localhost:${port}`));
  console.log(colors.red('Press CTRL + C to stop server'));
});
