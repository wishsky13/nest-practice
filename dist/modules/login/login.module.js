"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginModule = void 0;
var common_1 = require("@nestjs/common");
var login_controller_1 = require("./login.controller");
var login_service_1 = require("./login.service");
var auth_module_1 = require("../auth/auth.module");
var auth_service_1 = require("../auth/auth.service");
var member_service_1 = require("../members/member.service");
var member_entity_1 = require("../../entity/member.entity");
var typeorm_1 = require("@nestjs/typeorm");
var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member]), auth_module_1.AuthModule],
            controllers: [login_controller_1.LoginController],
            providers: [login_service_1.LoginService, auth_service_1.AuthService, member_service_1.MemberService],
        })
    ], LoginModule);
    return LoginModule;
}());
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.module.js.map