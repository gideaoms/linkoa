const Koa = require("koa");
const Router = require("./Router");

module.exports = class Server {
  constructor(app = {}, config = {}) {
    this.app = app;
    this.config = config;
  }

  start() {
    this.server = new Koa();

    const router = new Router(this.app.routes, this.app.controllers);
    this.server.use(
      router.addRoutes({ models: this.app.models, config: this.config })
    );

    this.server.listen(this.getPort(), () => {
      console.info(`Server is listening at the ${this.getPort()}`);
    });
  }

  getPort() {
    return this.config.app.port || 3000;
  }
};
