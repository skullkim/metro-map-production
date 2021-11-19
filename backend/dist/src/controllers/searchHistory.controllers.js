"use strict";
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
var currentSearched_1 = require("../models/currentSearched");
var stationBookMark_1 = require("../models/stationBookMark");
var success_1 = require("../utils/jsonResponse/success");
var getUserSearchHistories = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, searchHistory, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, currentSearched_1.CurrentSearched.getUserSearchHistory(userId)];
            case 2:
                searchHistory = _a.sent();
                res.status(200);
                return [2 /*return*/, res.json((0, success_1.jsonResponse)(req, { search_history: searchHistory }))];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var setUserPathBookmark = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookmarkId, _a, id, email, _b, from, to, stopover, target, exBookmark, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                bookmarkId = req.params.bookmarkId;
                _a = res.locals.userData, id = _a.id, email = _a.email;
                _b = req.body.pathInfo, from = _b.from, to = _b.to, stopover = _b.stopover, target = _b.target;
                return [4 /*yield*/, currentSearched_1.CurrentSearched.checkBookmark(bookmarkId)];
            case 1:
                _c.sent();
                return [4 /*yield*/, stationBookMark_1.StationBookMark.getBookMark(id, from, to, stopover, target)];
            case 2:
                exBookmark = _c.sent();
                if (!!exBookmark) return [3 /*break*/, 4];
                return [4 /*yield*/, stationBookMark_1.StationBookMark.setBookMark(email, from, to, stopover, target)];
            case 3:
                _c.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, stationBookMark_1.StationBookMark.deleteBookMark(id, from, to, stopover, target)];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                res.status(204);
                return [2 /*return*/, res.json((0, success_1.jsonResponse)(req, {}, 204))];
            case 7:
                err_2 = _c.sent();
                next(err_2);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    getUserSearchHistories: getUserSearchHistories,
    setUserPathBookmark: setUserPathBookmark,
};
//# sourceMappingURL=searchHistory.controllers.js.map