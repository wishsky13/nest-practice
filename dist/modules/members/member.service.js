"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var member_entity_1 = require("../../entity/member.entity");
var CryptoJS = require("crypto-js");
var MemberService = /** @class */ (function () {
    function MemberService(memberRepository) {
        this.memberRepository = memberRepository;
    }
    MemberService.prototype.getMembers = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var current, size, _a, members, total, totalPages, pagination, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        current = query.current ? Number(query.current) : 1;
                        size = query.size ? Number(query.size) : 15;
                        return [4 /*yield*/, this.memberRepository.findAndCount({
                                skip: (current - 1) * size,
                                take: size, // 每頁筆數
                            })];
                    case 1:
                        _a = _b.sent(), members = _a[0], total = _a[1];
                        // const members = await this.memberRepository.find();
                        members.forEach(function (member) {
                            delete member.password;
                        });
                        totalPages = Math.ceil(total / size);
                        pagination = {
                            current: current,
                            count: totalPages,
                            size: size,
                            last: total, // 總數據筆數
                        };
                        return [2 /*return*/, {
                                members: members.map(function (i) {
                                    return __assign(__assign({}, i), { role: i.role
                                            .split(',')
                                            .map(function (i) {
                                            return Number(i);
                                        })
                                            .sort(function (a, b) { return a - b; }) });
                                }),
                                page: pagination,
                            }];
                    case 2:
                        err_1 = _b.sent();
                        throw new common_1.HttpException('取得失敗，請確認要求條件後再次申請！', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MemberService.prototype.createMember = function (member) {
        return __awaiter(this, void 0, void 0, function () {
            var secretKey, decrypted, decryptedText, memberData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secretKey = 'mollymoooo';
                        decrypted = CryptoJS.AES.decrypt(member.password, secretKey);
                        decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
                        if (decryptedText) {
                            member.password = decryptedText;
                        }
                        //check role
                        if (member === null || member === void 0 ? void 0 : member.role) {
                            member.role.split(',').forEach(function (i) {
                                if (isNaN(Number(i))) {
                                    throw new common_1.HttpException('註冊失敗：權限設定有誤，請檢查後重新註冊！', common_1.HttpStatus.NOT_ACCEPTABLE);
                                }
                            });
                        }
                        else {
                            member.role = '3';
                        }
                        return [4 /*yield*/, this.memberRepository.save(member)];
                    case 1:
                        memberData = _a.sent();
                        return [2 /*return*/, {
                                id: memberData.id,
                                account: memberData.account,
                                username: memberData.username,
                                role: memberData.role
                                    .split(',')
                                    .map(function (i) {
                                    return Number(i);
                                })
                                    .sort(function (a, b) { return a - b; }),
                                created_at: memberData.created_at,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1 === null || error_1 === void 0 ? void 0 : error_1.code) {
                            switch (error_1.code) {
                                case 'ER_DUP_ENTRY':
                                    throw new common_1.ConflictException('註冊失敗：該帳號已經有人使用，請更換新的帳號名稱！');
                                default:
                                    throw new common_1.HttpException(error_1.sqlMessage, common_1.HttpStatus.NOT_ACCEPTABLE);
                            }
                        }
                        else if (error_1) {
                            throw new common_1.HttpException('註冊失敗：權限設定有誤，請檢查後重新註冊！', common_1.HttpStatus.NOT_ACCEPTABLE);
                        }
                        else {
                            throw new common_1.InternalServerErrorException('註冊失敗！');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MemberService.prototype.findMember = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var Member, _b, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.memberRepository.findOneBy({ id: id })];
                    case 1:
                        if (!((_a = (_c.sent())) !== null && _a !== void 0)) return [3 /*break*/, 2];
                        _b = _a;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.memberRepository.findOneBy({ account: id })];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        Member = _b;
                        if (!Member) {
                            throw new common_1.HttpException('很抱歉，找不到該用戶！', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/, __assign(__assign({}, Member), { role: Member.role
                                    .split(',')
                                    .map(function (i) {
                                    return Number(i);
                                })
                                    .sort(function (a, b) { return a - b; }) })];
                    case 5:
                        err_2 = _c.sent();
                        throw new common_1.HttpException(err_2, common_1.HttpStatus.BAD_REQUEST);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MemberService.prototype.updateMemberRole = function (id, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var member, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findMember(id)];
                    case 1:
                        member = _a.sent();
                        if (!member) {
                            throw new common_1.HttpException('找不到該用戶！', common_1.HttpStatus.NOT_FOUND);
                        }
                        updateData.role.forEach(function (i) {
                            if (isNaN(Number(i))) {
                                throw new common_1.HttpException('註冊失敗：權限設定有誤，請檢查後重新註冊！', common_1.HttpStatus.NOT_ACCEPTABLE);
                            }
                        });
                        // 更新 member 的屬性
                        member.role = updateData.role
                            .map(function (i) {
                            return Number(i);
                        })
                            .sort(function (a, b) { return a - b; });
                        // ...
                        // 執行保存或更新操作，例如：
                        return [4 /*yield*/, this.memberRepository.save(__assign(__assign({}, member), { role: member.role.join(',') }))];
                    case 2:
                        // ...
                        // 執行保存或更新操作，例如：
                        _a.sent();
                        delete member.password;
                        return [2 /*return*/, member];
                    case 3:
                        err_3 = _a.sent();
                        throw new common_1.HttpException('編輯失敗，請確認後再次編輯！', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MemberService.prototype.updateMember = function (id, updateData) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var member, secretKey, decrypted, decryptedText, update, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.findMember(id)];
                    case 1:
                        member = _b.sent();
                        if (!member) {
                            throw new common_1.HttpException('找不到該用戶！', common_1.HttpStatus.NOT_FOUND);
                        }
                        secretKey = 'mollymoooo';
                        decrypted = updateData.password
                            ? CryptoJS.AES.decrypt(updateData.password, secretKey)
                            : '';
                        decryptedText = decrypted === null || decrypted === void 0 ? void 0 : decrypted.toString(CryptoJS.enc.Utf8);
                        update = {
                            username: (_a = updateData.username) !== null && _a !== void 0 ? _a : member.username,
                            password: updateData.password
                                ? decryptedText
                                    ? decryptedText
                                    : updateData.password
                                : member.password,
                        };
                        return [4 /*yield*/, this.memberRepository.save(__assign(__assign(__assign({}, member), update), { role: member.role.join(',') }))];
                    case 2:
                        _b.sent();
                        delete member.password;
                        if (update.password) {
                            delete update.password;
                        }
                        return [2 /*return*/, __assign(__assign({}, member), update)];
                    case 3:
                        err_4 = _b.sent();
                        throw new common_1.HttpException('編輯失敗，請確認後再次編輯！', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MemberService.prototype.getMemberWithLogs = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var Member, _b, err_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.memberRepository.findOne({
                                where: { id: id },
                                relations: ['logs'],
                            })];
                    case 1:
                        if (!((_a = (_c.sent())) !== null && _a !== void 0)) return [3 /*break*/, 2];
                        _b = _a;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.memberRepository.findOne({
                            where: { account: id },
                            relations: ['logs'],
                        })];
                    case 3:
                        _b = (_c.sent());
                        _c.label = 4;
                    case 4:
                        Member = _b;
                        if (!Member) {
                            throw new common_1.HttpException('找不到該用戶！', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_5 = _c.sent();
                        throw new common_1.HttpException(err_5, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                    case 6: return [2 /*return*/, Member];
                }
            });
        });
    };
    MemberService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.Member)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map