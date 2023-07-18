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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = exports.Public = exports.IS_PUBLIC_KEY = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var common_1 = require("@nestjs/common");
var member_service_1 = require("./member.service");
var member_dto_1 = require("./dto/member.dto");
var page_dto_1 = require("../../dtos/page.dto");
var auth_guard_1 = require("../auth/auth.guard");
var common_2 = require("@nestjs/common");
exports.IS_PUBLIC_KEY = 'isPublic';
var Public = function () { return (0, common_2.SetMetadata)(exports.IS_PUBLIC_KEY, true); };
exports.Public = Public;
var MemberController = /** @class */ (function () {
    function MemberController(memberService) {
        this.memberService = memberService;
    }
    MemberController.prototype.getAllMembers = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.memberService.getMembers(query)];
            });
        });
    };
    MemberController.prototype.createMember = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.memberService.createMember(member)];
            });
        });
    };
    MemberController.prototype.getProfile = function (req) {
        var _a = req.member, iat = _a.iat, exp = _a.exp, userData = __rest(_a, ["iat", "exp"]);
        return userData;
    };
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [page_dto_1.PageQueryDto]),
        __metadata("design:returntype", Promise)
    ], MemberController.prototype, "getAllMembers", null);
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [member_dto_1.CreateMemberDto]),
        __metadata("design:returntype", Promise)
    ], MemberController.prototype, "createMember", null);
    __decorate([
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, common_1.Get)('me'),
        __param(0, (0, common_1.Request)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MemberController.prototype, "getProfile", null);
    MemberController = __decorate([
        (0, common_1.Controller)('members'),
        __metadata("design:paramtypes", [member_service_1.MemberService])
    ], MemberController);
    return MemberController;
}());
exports.MemberController = MemberController;
//# sourceMappingURL=member.controller.js.map