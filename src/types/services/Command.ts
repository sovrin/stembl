type Flag = [
    flag: string,
    path: string,
    about: string
];

export type Command = {
    command: string,
    flags: Flag[],
    help: string,
}
