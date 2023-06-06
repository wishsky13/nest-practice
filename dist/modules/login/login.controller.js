"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
var common_1 = require("@nestjs/common");
var auth_service_1 = require("../auth/auth.service");
var LoginController = /** @class */ (function () {
    function LoginController(authService) {
        this.authService = authService;
    }
    LoginController.prototype.getLoginPage = function () {
        return { title: '登入' };
    };
    LoginController.prototype.getDashboardPage = function (token, username) {
        return { username: username };
    };
    LoginController.prototype.getSignupPage = function () {
        return {};
    };
    LoginController.prototype.getLogoutPage = function () {
        return {};
    };
    __decorate([
        (0, common_1.Get)('/login'),
        (0, common_1.Render)('login') // 使用 login 模板渲染頁面
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLoginPage", null);
    __decorate([
        (0, common_1.Get)('/dashboard'),
        (0, common_1.Render)('dashboard') // 使用 login 模板渲染頁面
        ,
        __param(0, (0, common_1.Param)('token')),
        __param(1, (0, common_1.Param)('username')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getDashboardPage", null);
    __decorate([
        (0, common_1.Get)('/signup'),
        (0, common_1.Render)('signup') // 使用 login 模板渲染頁面
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getSignupPage", null);
    __decorate([
        (0, common_1.Get)('/logout'),
        (0, common_1.Render)('logout') // 使用 login 模板渲染頁面
        ,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogoutPage", null);
    LoginController = __decorate([
        (0, common_1.Controller)(''),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], LoginController);
    return LoginController;
}());
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map