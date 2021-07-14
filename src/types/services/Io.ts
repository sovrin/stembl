export type Io = {
    load(module: string): any;
    traverse(path: string, filter?: string, processor?: Function): any;
}
