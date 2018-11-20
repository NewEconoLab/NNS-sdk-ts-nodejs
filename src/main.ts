import { ThinNeo, Neo } from "nel-thinsdk-ts";
import { Consts, Result } from "./consts";
import { www }from "./tools/wwwtool";
import * as tools from "./tools/tools";


export async function setResolveData(domain: string, str: string, resolve: string, address: string, wif: string) {
    let hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address)
    let hashstr = Neo.Func.toHexString(hash.reverse());
    let arr = domain.split(".");
    let nnshash: Neo.Uint256 = nameHashArray(arr);
    var scriptaddress = Neo.Func.hexToBytes(resolve);

    var sb = new ThinNeo.ScriptBuilder();
    let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
    let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
    sb.EmitPushNumber(random_int);
    sb.Emit(ThinNeo.OpCode.DROP);
    sb.EmitParamJson([
        "(hex160)" + hashstr,
        "(hex256)" + nnshash.toString(),
        "(str)",
        "(str)addr",
        "(str)" + str
    ]);
    sb.EmitPushString("setResolverData");
    sb.EmitAppCall(scriptaddress.reverse());
    var data = sb.ToArray();
    let res = await tools.contractInvokeTrans_attributes(data, address, wif);
    return res;
}

export async function resolveData(domain: string) {
    var scriptaddress = Consts.baseContract;
    let arr = domain.split(".");
    let nnshash = nameHashArray(arr);
    let nnshashstr = nnshash;

    var sb = new ThinNeo.ScriptBuilder();
    sb.EmitParamJson([
        "(str)addr",
        "(hex256)" + nnshashstr,
        "(str)" + ""
    ]);
    sb.EmitPushString("resolve");
    sb.EmitAppCall(scriptaddress);
    var data = sb.ToArray();
    let res = await www.rpc_getInvokescript(data);
    let addr = "";

    try
    {
        var state = res.state as string;
        if (state.includes("HALT, BREAK")) {
            var stack = res.stack as any[];
            if (stack[ 0 ].type == "ByteArray") {
                if (stack[ 0 ].value as string != "00") {
                    let value = Neo.Func.hextoBytes(stack[ 0 ].value as string);
                    addr = ThinNeo.Helper.Bytes2String(value);
                }
            }
        }
    }
    catch (e)
    {
        console.log(e);
    }
    return addr;
}


export function nameHash(domain: string): Neo.Uint256 {
    var domain_bytes = ThinNeo.Helper.String2Bytes(domain);
    var hashd = Neo.Cryptography.Sha256.computeHash(domain_bytes);
    return new Neo.Uint256(hashd);
}

export function nameHashSub(roothash: Neo.Uint256, subdomain: string): Neo.Uint256 {
    var bs: Uint8Array = ThinNeo.Helper.String2Bytes(subdomain);
    if (bs.length == 0)
            return roothash;
    
    var domain = Neo.Cryptography.Sha256.computeHash(bs);
    var domain_bytes = new Uint8Array(domain);
    var domainUint8arry = Neo.Func.concat(domain_bytes, (new Uint8Array(roothash.bits.buffer)));
    
    var sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
    return new Neo.Uint256(sub);
}

export function nameHashArray(domainarray: string[]): Neo.Uint256 {
    domainarray.reverse();
    var hash: Neo.Uint256 = nameHash(domainarray[ 0 ]);
    for (var i = 1; i < domainarray.length; i++)
    {
        hash = nameHashSub(hash, domainarray[ i ]);
    }
    return hash;
}

export async function owner_setResolver(domain: string, resolverhash: Uint8Array, addr: string, wif: string): Promise<Result> {

    let hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
    let hashstr = Neo.Func.toHexString(hash.reverse());
    let arr = domain.split(".");
    let nnshash: Neo.Uint256 = nameHashArray(arr);
    let resolvestr = Neo.Func.toHexString(resolverhash.reverse());
    var scriptaddress = Consts.baseContract;

    var sb = new ThinNeo.ScriptBuilder();
    let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
    let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
    sb.EmitPushNumber(random_int);
    sb.Emit(ThinNeo.OpCode.DROP);
    sb.EmitParamJson([
        "(hex160)" + hashstr,
        "(hex256)" + nnshash.toString(),
        "(hex160)" + resolvestr ]);
    sb.EmitPushString("owner_SetResolver");
    sb.EmitAppCall(scriptaddress);
    var data = sb.ToArray();

    let res = await tools.contractInvokeTrans_attributes(data, addr, wif);
    return res;
}
