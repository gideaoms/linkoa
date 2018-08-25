const KoaRouter = require("koa-router");

module.exports = class Router {
  constructor(routes = {}, controllers = {}) {
    this.routes = routes;
    this.controllers = controllers;
    this.router = new KoaRouter();
  }

  getRoutesFromResources(resources) {
    return Object.values(resources).reduce(
      (acc, resource) => acc.concat(resource),
      []
    );
  }

  separate(handler) {
    return handler.trim().split(".");
  }

  getMethod(method) {
    return method.toLowerCase();
  }

  getPath(path) {
    return path || "/";
  }

  addRoutes(bind) {
    const routes = this.getRoutesFromResources(this.routes);

    routes.map(({ method, path, handler }) => {
      const [controller, action] = this.separate(handler);
      this.router[this.getMethod(method)](
        this.getPath(path),
        this.controllers[controller][action].bind({ ...bind })
      );
    });
    return this.router.routes();
  }
};
