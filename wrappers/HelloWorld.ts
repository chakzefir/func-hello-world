import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type HelloWorldConfig = {};

export function helloWorldConfigToCell(config: HelloWorldConfig): Cell {
    return beginCell().endCell();
}

export class HelloWorld implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new HelloWorld(address);
    }

    static createFromConfig(config: HelloWorldConfig, code: Cell, workchain = 0) {
        const data = helloWorldConfigToCell(config);
        const init = { code, data };
        return new HelloWorld(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getHelloWorld(provider: ContractProvider) {
        const result = await provider.get('hello_world', [])
        return result.stack.readString()
    }
}
