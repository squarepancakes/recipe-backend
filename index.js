const app = require("./app");
const env = app.get("env");

const port = 4000;

app.listen(port, () => {
	console.log(`Listening on ${port} in ${env} mode`);
});