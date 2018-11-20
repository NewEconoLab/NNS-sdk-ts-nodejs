import { ThinNeo, Neo } from "nel-thinsdk-ts";

export class Consts {
    static readonly baseContract = Neo.Uint160.parse("348387116c4a75e420663277d9c02049907128c7");
    static readonly registerContract = Neo.Uint160.parse("d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c");

    static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
}

export class Result {
    err: boolean;
    info: any;
}

