import {Database} from 'vano/types/types';
import {Container, Framework, Io, Log, Prompt} from './services';

export type App = {
    collection: Database,
    container: Container,
    prompt: Prompt,
};

export type AppFactory = () => App
