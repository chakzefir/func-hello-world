import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { HelloWorld } from '../wrappers/HelloWorld';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('HelloWorld', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('HelloWorld');
    });

    let blockchain: Blockchain;
    let helloWorld: SandboxContract<HelloWorld>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        helloWorld = blockchain.openContract(HelloWorld.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await helloWorld.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: helloWorld.address,
            deploy: true,
            success: true,
        });
    });

    it('should return hello world', async () => {
        const getMethodResult = await helloWorld.getHelloWorld()
        expect(getMethodResult).toEqual("Hello world")
        // the check is done inside beforeEach
        // blockchain and helloWorld are ready to use
    });
});
