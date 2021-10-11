import {Command} from '../services';

type Data = {
    commands: Command[],
    args: object,
}

export type Props = {
    route: string,
    data: Data
}


