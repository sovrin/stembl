type Head = string;

type Graph = {
    [state: string]: {
        action: Function,
        to: {
            [name: string]: string
        }
    }
};

export type Machine = (head: Head, graph: Graph) => {
    transition(to: string, ...param: any);
}
