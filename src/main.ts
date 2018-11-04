import { logging, rpc, sc, u, wallet } from "@cityofzion/neon-core";
import * as core from "./core";

export async function resolveDomain(
  url: string,
  contract: string,
  domain: string,
  tld: string
): Promise<string> {
  const protocol = {
    type: "String",
    value: "addr"
  };

  const empty = {
    type: "String",
    value: ""
  };

  const tldRegEx = ".".concat(tld).concat("$");
  const regExp = new RegExp(tldRegEx);

  const subdomain = domain.replace(regExp, "");
  const hashSubdomain = u.sha256(u.str2hexstring(subdomain));
  const hashDomain = u.sha256(u.str2hexstring(tld));

  const hashName = u.sha256(hashSubdomain.concat(hashDomain));
  const parsedName = sc.ContractParam.byteArray(hashName, "name");

  const args = [protocol, parsedName, empty];

  const response = await core.callContract(url, domain, contract, "resolve", args);

  return response;
}

export async function getNameHash(
  url: string,
  contract: string,
  domain: string,
  tld: string
): Promise<string> {
  const tldRegEx = ".".concat(tld).concat("$");
  const regExp = new RegExp(tldRegEx);

  const subdomain = domain.replace(regExp, "");

  const args = [subdomain];

  const response = await core.callContract(url, domain, contract, "nameHash", args);

  return response;
}

export async function setResolver(
  url: string,
  contract: string,
  domain: string,
  tld: string,
  resolver: string,
  address: string
): Promise<string> {
  const protocol = {
    type: "String",
    value: "addr"
  };

  const ownerHash = wallet.getScriptHashFromAddress(address);
  const tldRegEx = ".".concat(tld).concat("$");
  const regExp = new RegExp(tldRegEx);
  const subdomain = domain.replace(regExp, "");
  const hashSubdomain = u.sha256(u.str2hexstring(subdomain));
  const hashDomain = u.sha256(u.str2hexstring(tld));
  const hashName = u.sha256(hashSubdomain.concat(hashDomain));

  const owner = sc.ContractParam.byteArray(ownerHash, "owner");
  const fullhash = sc.ContractParam.byteArray(hashName, "fullhash");
  const resolverArg = sc.ContractParam.byteArray(resolver, "resolver");

  const args = [owner, fullhash, resolverArg];

  const response = await core.callContract(
    url,
    domain,
    contract,
    "owner_SetResolver",
    args
  );

  return response;
}

export async function setAddress(
  url: string,
  contract: string,
  domain: string,
  tld: string
): Promise<string> {
  const tldRegEx = ".".concat(tld).concat("$");
  const regExp = new RegExp(tldRegEx);

  const subdomain = domain.replace(regExp, "");

  const args = [subdomain];

  const response = await core.callContract(
    url,
    domain,
    contract,
    "setResolverData",
    args
  );

  return response;
}
