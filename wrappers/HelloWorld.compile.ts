import { CompilerConfig } from '@ton-community/blueprint';

export const compile: CompilerConfig = {
    lang: 'func',
    targets: ['contracts/hello_world.fc'],
};
