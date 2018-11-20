"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var nel_thinsdk_ts_1 = require("nel-thinsdk-ts");
var www = /** @class */ (function () {
    function www() {
    }
    www.makeRpcUrl = function (url, method) {
        var _params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            _params[_i - 2] = arguments[_i];
        }
        if (url[url.length - 1] != '/')
            url = url + "/";
        var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
        for (var i = 0; i < _params.length; i++) {
            urlout += JSON.stringify(_params[i]);
            if (i != _params.length - 1)
                urlout += ",";
        }
        urlout += "]";
        return urlout;
    };
    www.makeRpcPostBody = function (method) {
        var _params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _params[_i - 1] = arguments[_i];
        }
        var body = {};
        body["jsonrpc"] = "2.0";
        body["id"] = 1;
        body["method"] = method;
        var params = [];
        for (var i = 0; i < _params.length; i++) {
            params.push(_params[i]);
        }
        body["params"] = params;
        return body;
    };
    www.gettransbyaddress = function (address, pagesize, pageindex) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("gettransbyaddress", address, pagesize, pageindex);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getblockcount");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        height = parseInt(r[0]["blockcount"]) - 1;
                        return [2 /*return*/, height];
                }
            });
        });
    };
    www.api_getBlockInfo = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getblocktime", index);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        time = parseInt(r[0]["time"]);
                        return [2 /*return*/, time];
                }
            });
        });
    };
    www.api_getAllAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getallasset");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_getUTXO = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getutxo", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**判断是否可以获取gas */
    www.api_hasclaimgas = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("hasclaimgas", address);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获取gas
     */
    www.api_claimgas = function (address, num) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("claimgas", address, num);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_getnep5Balance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getallnep5assetofaddress", address, 1);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, value, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getbalance", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        value = _a.sent();
                        return [4 /*yield*/, value.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * @method 获得nep5资产信息
     * @param asset 资产id
     */
    www.getNep5Asset = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getnep5asset", asset);
                        return [4 /*yield*/, fetch(www.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 跟地址获取nep资产id对应的余额
     * @param asset 资产id
     * @param address 地址
     */
    www.getnep5balanceofaddress = function (asset, address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getnep5balanceofaddress", asset, address);
                        return [4 /*yield*/, fetch(www.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_getAddressTxs = function (address, size, page) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getaddresstxs", address, size, page);
                        return [4 /*yield*/, fetch(www.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.api_postRawTransaction = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("sendrawtransaction", nel_thinsdk_ts_1.Neo.Func.toHexString(data));
                        return [4 /*yield*/, fetch(www.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw json['error'];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    www.api_getclaimgas = function (address, type) {
        return __awaiter(this, void 0, void 0, function () {
            var str, str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type)
                            str = www.makeRpcUrl(www.api, "getclaimgas", address, type);
                        else
                            str = www.makeRpcUrl(www.api, "getclaimgas", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        if (r == undefined)
                            return [2 /*return*/, 0];
                        return [2 /*return*/, r[0]];
                }
            });
        });
    };
    www.api_getclaimtxhex = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getclaimtxhex", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        if (r == undefined)
                            return [2 /*return*/, ""];
                        return [2 /*return*/, r[0]["claimtxhex"]];
                }
            });
        });
    };
    www.rpc_getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getblockcount");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        height = parseInt(r) - 1;
                        return [2 /*return*/, height];
                }
            });
        });
    };
    www.rpc_getStorage = function (scripthash, key) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getstorage", nel_thinsdk_ts_1.Neo.Func.toHexString(scripthash), nel_thinsdk_ts_1.Neo.Func.toHexString(key));
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.rpc_getInvokescript = function (scripthash) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "invokescript", nel_thinsdk_ts_1.Neo.Func.toHexString(scripthash));
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    www.getrawtransaction = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getrawtransaction", txid);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (!json["result"])
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    //获取nep5的交易详情
    www.getnep5transferbytxid = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getnep5transferbytxid", txid);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (!json["result"])
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    //获取转账域名地址    
    www.getresolvedaddress = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getresolvedaddress", domain);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    //获取地址下所有的域名
    www.getnnsinfo = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody.apply(www, ["getdomainbyaddress"].concat(params));
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 发送合约调用
     * @param scriptaddr 合约参数脚本
     */
    www.api_getcontractstate = function (scriptaddr) {
        return __awaiter(this, void 0, void 0, function () {
            var str, value, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = www.makeRpcUrl(www.api, "getcontractstate", scriptaddr);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        value = _a.sent();
                        return [4 /*yield*/, value.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获得全量的地址列表的数据
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 页面条数
     */
    www.getauctioninfobyaddress = function (address, currentpage, pagesize, root) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getauctioninfobyaddress", address, currentpage, pagesize, root);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 根据id和address更新列表数据
     * @param address 地址
     * @param ids id 列表
     */
    www.getauctioninfobyaucitonid = function (address, ids, root) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getauctioninfobyaucitonid", address, ids, root);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获得分页总条数
     * @param address 地址
     */
    www.getauctioninfocount = function (address, root) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getauctioninfocount", address, root);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, (json && json["result"]) ? json["result"][0]["count"] : 0];
                }
            });
        });
    };
    /**
     * 根据地址查询参与竞拍的域名列表
     * @param address 要查询的地址
     */
    www.api_getBidListByAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getbidlistbyaddress", address);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获得时间轴的域名详情
     * @param domain 域名
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    www.api_getBidDetail = function (id, currentpage, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getbiddetailbydomain", id, currentpage, pagesize);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获得bonus 历史记录
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    www.api_getbonushistbyaddress = function (address, currentpage, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getbonushistbyaddress", address, currentpage, pagesize);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 获得bonus 历史记录
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    www.getavailableutxos = function (address, count) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getavailableutxos", address, count);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 两笔交易提交给服务器发送
     * @param data1 第一笔交易数据
     * @param data2 第二笔交易数据
     */
    www.rechargeandtransfer = function (data1, data2) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("rechargeandtransfer", nel_thinsdk_ts_1.Neo.Func.toHexString(data1), nel_thinsdk_ts_1.Neo.Func.toHexString(data2));
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        console.log("json: " + json);
                        if (json && json["result"] && json["result"][0]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw "Interface call exception";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询合约调用状态
     * @param txid 交易id
     */
    www.getrechargeandtransfer = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getrechargeandtransfer", txid);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 我的域名的状态
     * @param address 地址
     * @param domain 域名
     */
    www.getDomainState = function (address, id) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getdomainstate", address, id);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw "not data";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得交易对应的notify
     * @param txid
     */
    www.getNotify = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getnotify", txid);
                        return [4 /*yield*/, fetch(www.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 查询交易的状态
     * @param txid
     */
    www.hastx = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("hastx", txid);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 查询交易对应notify的方法名
     * @param txid
     */
    www.hascontract = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("hascontract", txid);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 查询我参与竞拍的域名
     * @param address 地址
     * @param domain 域名
     */
    www.searchdomainbyaddress = function (address, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("searchdomainbyaddress", address, domain);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw "not data";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**查询分红 */
    www.getbonushistbyaddress = function (address, page, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getbonushistbyaddress", address, page, pagesize);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw "not data";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询注册器下余额
     * @param address
     * @param hash
     */
    www.getregisteraddressbalance = function (address, hash) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = www.makeRpcPostBody("getregisteraddressbalance", address, hash);
                        return [4 /*yield*/, fetch(www.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, nel_thinsdk_ts_1.Neo.Fixed8.parse(r["balance"]).toString()];
                        }
                        else {
                            return [2 /*return*/, "0"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    www.api = "https://api.nel.group/api/mainnet";
    www.apiaggr = "https://apiwallet.nel.group/api/mainnet";
    return www;
}());
exports.www = www;
