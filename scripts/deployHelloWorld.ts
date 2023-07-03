import { toNano } from 'ton-core';
import { HelloWorld } from '../wrappers/HelloWorld';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const helloWorld = provider.open(HelloWorld.createFromConfig({}, await compile('HelloWorld')));

    await helloWorld.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(helloWorld.address);

    // run methods on `helloWorld`
}
