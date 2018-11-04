import { logging, rpc, sc, u } from "@cityofzion/neon-core";

function concat(arr1: Uint8Array, arr2: Uint8Array) {
    var newarr = new Uint8Array( arr1.length + arr2.length );
    for ( var i = 0; i < arr1.length; i++ )
    {
        newarr[i] = arr1[i];
    }
    for ( var i = 0; i < arr2.length; i++ )
    {
        newarr[arr1.length + i] = arr2[i];
    }
    return newarr;
}

export async function callContract(
  url: string,
  domain: string,
  scriptHash: string,
  operation: string,
  args: any[]
) {
  const sb = new sc.ScriptBuilder();
  const script = sb.emitAppCall(scriptHash, operation, args).str;
  try {
    const res = await rpc.Query.invokeScript(script).execute(url);
    return rpc.StringParser(res.result.stack[0]);
  } catch (err) {
    console.log(`contract call failed with: ${err.message}`);
    throw err;
  }
}

export function nameHashInternal(domain: string) {
  const tldRegEx = ".".concat("neo").concat("$");
  const regExp = new RegExp(tldRegEx);

  const subdomain = domain.replace(regExp, "");
  const hashSubdomain = u.sha256(u.str2hexstring(subdomain));
  return hashSubdomain;
}

//quick test
//console.log(nameHashInternal('test.neo', 'neo'));

export function nameHashSubInternal(
  roothash: string,
  subdomain: string
): string {
  const domain = u.sha256(u.str2hexstring(subdomain));
  const domain_bytes = new Uint8Array(u.str2ab(domain));
  const domainUint8arry = concat(
    domain_bytes,
    new Uint8Array(u.str2ab(roothash))
  );

  const sub = u.sha256(u.ab2hexstring(domainUint8arry));
  return sub;
}

// quick test fail, result is wrong.
//console.log(nameHashSubInternal('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'test01'));

export function nameHashArrayInternal(domainarray: string[]): string {
  domainarray.reverse();
  var hash = nameHashInternal(domainarray[0]);
  for (var i = 1; i < domainarray.length; i++) {
    hash = nameHashSubInternal(hash, domainarray[i]);
  }
  return hash;
}

export async function owner_setResolver(scriptHash: string, args: any[]) {
  return (sb = new sc.ScriptBuilder()) => {
    return sb.emitAppCall(scriptHash, "owner_setResolver", args);
  };
}
