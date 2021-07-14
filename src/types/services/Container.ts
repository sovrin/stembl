export type Container = {
    invoke(fn: Function): Promise<any>,
    pipe(...fns: Array<Function>): Promise<any>,
    get(name: string | number): any,
    set(name: string | number, value: any): void,
    unset(name: string | number): void,
}
