type Help = (help: string) => string

type Flags = (flags: object) => void

export type Command = (
    help: Help,
    flags: Flags,
) => void;
