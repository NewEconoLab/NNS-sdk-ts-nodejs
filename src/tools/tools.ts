import { ThinNeo, Neo } from "nel-thinsdk-ts";
import { Consts, Result } from "../consts";
import { www } from "./wwwtool";

export async function contractInvokeTrans_attributes(script: Uint8Array, addr: string, wif: string) {
    var utxos = await getassets(addr); 
    var gas = utxos[ Consts.id_GAS ];
    var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
    var addrHash: Uint8Array = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
    var wifHash: Uint8Array = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
    tran.inputs = [];
    tran.outputs = [];
    tran.type = ThinNeo.TransactionType.InvocationTransaction;
    tran.extdata = new ThinNeo.InvokeTransData();
    (tran.extdata as ThinNeo.InvokeTransData).script = script;
    tran.attributes = new Array<ThinNeo.Attribute>(1);
    tran.attributes[ 0 ] = new ThinNeo.Attribute();
    tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
    tran.attributes[ 0 ].data = addrHash;
    let feeres: {
        inputs: ThinNeo.TransactionInput[];
        outputs: ThinNeo.TransactionOutput[];
    }; 
    if (gas)
    {   
        feeres = createInuptAndOutup(gas, Neo.Fixed8.parse("0.00000001"));
        tran.inputs = feeres.inputs.map(input =>
        {   
            input.hash = input.hash.reverse();
            return input
        });
        tran.outputs = feeres.outputs;
    }
    
    if (tran.witnesses == null)
        tran.witnesses = [];
    let data = signData(tran, addrHash, wifHash);
    
    var res: Result = new Result();
    var result = await www.api_postRawTransaction(data);
    res.err = !result[ "sendrawtransactionresult" ];
    res.info = result[ "txid" ];
	return res;
}

async function getassets(addr: string): Promise<{ [ id: string ]: UTXO[] }> {
    var height = await www.api_getHeight();
    var utxos = await www.api_getUTXO(addr);   //获得utxo
    if (utxos == undefined)
    {
        return {};
    }
    var assets = {};
    for (var i in utxos)
    {
        var item = utxos[ i ];
        var asset = item.asset;
        if (assets[ asset ] == undefined || assets[ asset ] == null)
        {
            assets[ asset ] = [];
        }
        let utxo = new UTXO();
        utxo.addr = item.addr;
        utxo.asset = item.asset;
        utxo.n = item.n;
        utxo.txid = item.txid;
        utxo.count = Neo.Fixed8.parse(item.value);
        assets[ asset ].push(utxo);
    }

    return assets;
}

function signData(tran: ThinNeo.Transaction,  pubkey: Uint8Array, prikey: Uint8Array): Uint8Array {
    try
    {
        var msg = tran.GetMessage().clone();
        var signdata = ThinNeo.Helper.Sign(msg, prikey);
        var addr = ThinNeo.Helper.GetAddressFromScriptHash(pubkey);
        tran.AddWitness(signdata, pubkey, addr);
        var data: Uint8Array = tran.GetRawData();
        return data;
    } catch (error)
    {
        throw "Signature interrupt";
    }

}


function createInuptAndOutup(utxos: UTXO[], sendcount: Neo.Fixed8, target?: string) {
    let count = Neo.Fixed8.Zero;
    let res = {} as { inputs: ThinNeo.TransactionInput[], outputs: ThinNeo.TransactionOutput[] };
    res[ "inputs" ] = [];
    res[ "outputs" ] = [];
    let scraddr = "";
    let assetId: Uint8Array;
    for (var i = 0; i < utxos.length; i++)
    {
        var input = new ThinNeo.TransactionInput();
        input.hash = Neo.Func.hextoBytes(utxos[ i ].txid);
        input.index = utxos[ i ].n;
        input[ "_addr" ] = utxos[ i ].addr;
        res.inputs.push(input);
        count = count.add(utxos[ i ].count);
        scraddr = utxos[ i ].addr;
        assetId = Neo.Func.hextoBytes(utxos[ i ].asset).reverse();
        if (count.compareTo(sendcount) > 0)
        {
            break;
        }
    }
    if (count.compareTo(sendcount) >= 0)
    {
        if (target)
        {
            if (sendcount.compareTo(Neo.Fixed8.Zero) > 0)
            {
                var output = new ThinNeo.TransactionOutput();
                output.assetId = assetId
                output.value = sendcount;
                output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(target);
                res.outputs.push(output);
            }
        }
        let change = count.subtract(sendcount); //应该找零的值
        if (change.compareTo(Neo.Fixed8.Zero) > 0)
        {
            var outputchange = new ThinNeo.TransactionOutput();
            outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
            outputchange.value = change;
            outputchange.assetId = assetId
            res.outputs.push(outputchange);
        }
        return res;
    }
    else
    {
        throw "You don't have enough utxo;";

    }
}



export class UTXO
{
    addr: string;
    txid: string;
    n: number;
    asset: string;
    count: Neo.Fixed8;

    static ArrayToString(utxos: UTXO[]): Array<any>
    {
        var str = "";
        var obj = [];
        for (var i = 0; i < utxos.length; i++)
        {
            obj.push({});
            obj[ i ].n = utxos[ i ].n;
            obj[ i ].addr = utxos[ i ].addr;
            obj[ i ].txid = utxos[ i ].txid;
            obj[ i ].asset = utxos[ i ].asset;
            obj[ i ].count = utxos[ i ].count.toString();
        }
        return obj
    }
    static StringToArray(obj: Array<any>): UTXO[]
    {
        var utxos: Array<UTXO> = new Array<UTXO>();
        for (var i = 0; i < obj.length; i++)
        {
            utxos.push(new UTXO);
            var str: string = obj[ i ].count;
            utxos[ i ].n = obj[ i ].n;
            utxos[ i ].addr = obj[ i ].addr;
            utxos[ i ].txid = obj[ i ].txid;
            utxos[ i ].asset = obj[ i ].asset;
            utxos[ i ].count = Neo.Fixed8.parse(str);
        }
        return utxos;
    }

    static setAssets(assets: { [ id: string ]: UTXO[] })
    {
        var obj = {}
        for (var asset in assets)
        {
            let arr = UTXO.ArrayToString(assets[ asset ]);
            obj[ asset ] = arr;
        }
        sessionStorage.setItem("current-assets-utxos", JSON.stringify(obj));
    }
    static getAssets()
    {
        let assets = null;
        var str = sessionStorage.getItem("current-assets-utxos");
        if (str !== null && str != undefined && str != '')
        {
            assets = JSON.parse(str);
            for (const asset in assets)
            {
                assets[ asset ] = UTXO.StringToArray(assets[ asset ]);
            }
        }
        return assets;
    }
}
