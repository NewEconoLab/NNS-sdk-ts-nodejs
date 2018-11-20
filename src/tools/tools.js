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
var consts_1 = require("../consts");
var wwwtool_1 = require("./wwwtool");
function contractInvokeTrans_attributes(script, addr, wif) {
    return __awaiter(this, void 0, void 0, function () {
        var utxos, gas, tran, addrHash, wifHash, feeres, data, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getassets(addr)];
                case 1:
                    utxos = _a.sent();
                    gas = utxos[consts_1.Consts.id_GAS];
                    tran = new nel_thinsdk_ts_1.ThinNeo.Transaction();
                    addrHash = nel_thinsdk_ts_1.ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
                    wifHash = nel_thinsdk_ts_1.ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                    tran.inputs = [];
                    tran.outputs = [];
                    tran.type = nel_thinsdk_ts_1.ThinNeo.TransactionType.InvocationTransaction;
                    tran.extdata = new nel_thinsdk_ts_1.ThinNeo.InvokeTransData();
                    tran.extdata.script = script;
                    tran.attributes = new Array(1);
                    tran.attributes[0] = new nel_thinsdk_ts_1.ThinNeo.Attribute();
                    tran.attributes[0].usage = nel_thinsdk_ts_1.ThinNeo.TransactionAttributeUsage.Script;
                    tran.attributes[0].data = addrHash;
                    if (gas) {
                        feeres = createInuptAndOutup(gas, nel_thinsdk_ts_1.Neo.Fixed8.parse("0.00000001"));
                        tran.inputs = feeres.inputs.map(function (input) {
                            input.hash = input.hash.reverse();
                            return input;
                        });
                        tran.outputs = feeres.outputs;
                    }
                    if (tran.witnesses == null)
                        tran.witnesses = [];
                    data = signData(tran, addrHash, wifHash);
                    res = new consts_1.Result();
                    return [4 /*yield*/, wwwtool_1.www.api_postRawTransaction(data)];
                case 2:
                    result = _a.sent();
                    res.err = !result["sendrawtransactionresult"];
                    res.info = result["txid"];
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.contractInvokeTrans_attributes = contractInvokeTrans_attributes;
function getassets(addr) {
    return __awaiter(this, void 0, void 0, function () {
        var height, utxos, assets, i, item, asset, utxo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, wwwtool_1.www.api_getHeight()];
                case 1:
                    height = _a.sent();
                    return [4 /*yield*/, wwwtool_1.www.api_getUTXO(addr)];
                case 2:
                    utxos = _a.sent();
                    if (utxos == undefined) {
                        return [2 /*return*/, {}];
                    }
                    assets = {};
                    for (i in utxos) {
                        item = utxos[i];
                        asset = item.asset;
                        if (assets[asset] == undefined || assets[asset] == null) {
                            assets[asset] = [];
                        }
                        utxo = new UTXO();
                        utxo.addr = item.addr;
                        utxo.asset = item.asset;
                        utxo.n = item.n;
                        utxo.txid = item.txid;
                        utxo.count = nel_thinsdk_ts_1.Neo.Fixed8.parse(item.value);
                        assets[asset].push(utxo);
                    }
                    return [2 /*return*/, assets];
            }
        });
    });
}
function signData(tran, pubkey, prikey) {
    try {
        var msg = tran.GetMessage().clone();
        var signdata = nel_thinsdk_ts_1.ThinNeo.Helper.Sign(msg, prikey);
        var addr = nel_thinsdk_ts_1.ThinNeo.Helper.GetAddressFromScriptHash(pubkey);
        tran.AddWitness(signdata, pubkey, addr);
        var data = tran.GetRawData();
        return data;
    }
    catch (error) {
        throw "Signature interrupt";
    }
}
function createInuptAndOutup(utxos, sendcount, target) {
    var count = nel_thinsdk_ts_1.Neo.Fixed8.Zero;
    var res = {};
    res["inputs"] = [];
    res["outputs"] = [];
    var scraddr = "";
    var assetId;
    for (var i = 0; i < utxos.length; i++) {
        var input = new nel_thinsdk_ts_1.ThinNeo.TransactionInput();
        input.hash = nel_thinsdk_ts_1.Neo.Func.hextoBytes(utxos[i].txid);
        input.index = utxos[i].n;
        input["_addr"] = utxos[i].addr;
        res.inputs.push(input);
        count = count.add(utxos[i].count);
        scraddr = utxos[i].addr;
        assetId = nel_thinsdk_ts_1.Neo.Func.hextoBytes(utxos[i].asset).reverse();
        if (count.compareTo(sendcount) > 0) {
            break;
        }
    }
    if (count.compareTo(sendcount) >= 0) {
        if (target) {
            if (sendcount.compareTo(nel_thinsdk_ts_1.Neo.Fixed8.Zero) > 0) {
                var output = new nel_thinsdk_ts_1.ThinNeo.TransactionOutput();
                output.assetId = assetId;
                output.value = sendcount;
                output.toAddress = nel_thinsdk_ts_1.ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(target);
                res.outputs.push(output);
            }
        }
        var change = count.subtract(sendcount); //应该找零的值
        if (change.compareTo(nel_thinsdk_ts_1.Neo.Fixed8.Zero) > 0) {
            var outputchange = new nel_thinsdk_ts_1.ThinNeo.TransactionOutput();
            outputchange.toAddress = nel_thinsdk_ts_1.ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
            outputchange.value = change;
            outputchange.assetId = assetId;
            res.outputs.push(outputchange);
        }
        return res;
    }
    else {
        throw "You don't have enough utxo;";
    }
}
var UTXO = /** @class */ (function () {
    function UTXO() {
    }
    UTXO.ArrayToString = function (utxos) {
        var str = "";
        var obj = [];
        for (var i = 0; i < utxos.length; i++) {
            obj.push({});
            obj[i].n = utxos[i].n;
            obj[i].addr = utxos[i].addr;
            obj[i].txid = utxos[i].txid;
            obj[i].asset = utxos[i].asset;
            obj[i].count = utxos[i].count.toString();
        }
        return obj;
    };
    UTXO.StringToArray = function (obj) {
        var utxos = new Array();
        for (var i = 0; i < obj.length; i++) {
            utxos.push(new UTXO);
            var str = obj[i].count;
            utxos[i].n = obj[i].n;
            utxos[i].addr = obj[i].addr;
            utxos[i].txid = obj[i].txid;
            utxos[i].asset = obj[i].asset;
            utxos[i].count = nel_thinsdk_ts_1.Neo.Fixed8.parse(str);
        }
        return utxos;
    };
    UTXO.setAssets = function (assets) {
        var obj = {};
        for (var asset in assets) {
            var arr = UTXO.ArrayToString(assets[asset]);
            obj[asset] = arr;
        }
        sessionStorage.setItem("current-assets-utxos", JSON.stringify(obj));
    };
    UTXO.getAssets = function () {
        var assets = null;
        var str = sessionStorage.getItem("current-assets-utxos");
        if (str !== null && str != undefined && str != '') {
            assets = JSON.parse(str);
            for (var asset in assets) {
                assets[asset] = UTXO.StringToArray(assets[asset]);
            }
        }
        return assets;
    };
    return UTXO;
}());
exports.UTXO = UTXO;
