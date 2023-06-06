"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var member_module_1 = require("./modules/members/member.module");
var database_module_1 = require("./database.module");
var auth_module_1 = require("./modules/auth/auth.module");
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './modules/auth/auth.guard';
var login_module_1 = require("./modules/login/login.module");
// @Global() // 全域模組
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule, member_module_1.MemberModule, auth_module_1.AuthModule, login_module_1.LoginModule],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                // {
                //   provide: APP_GUARD,
                //   useClass: AuthGuard,
                // },
            ],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map