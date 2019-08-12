# [cancelonunmount](https://www.npmjs.com/package/cancelonunmount)

###### A Reac HOC and HOOK to manage Promise cancellation when the component unmounts.

### Installation

```sh
npm install cancelonunmount --save
```

### HOC Props

```sh
export interface WithCancelOnUnmountProps {
    cancelablePromise(promise: Promise<any>): Promise<any>;
    getIsCanceled(): boolean;
}
```

### Usage

```sh
import React, { Component } from "react";
import { WithCancelOnUnmountProps, withCancelOnUnmount } from "cancelonunmount";
type Props = WithCancelOnUnmountProps;
interface Experiment{
    date: string;
    name:string;
}
class ExperimentsLayout extends Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.state={};
    }
    public componentDidMount() {
        this.someAPICall();
    }
    
    private someAPICall = () => {
       /* Uses the `cancelablePromise` from props */
        this.props.cancelablePromise(axios.get("/experiments/get-experiments/"))
            .then((experiments: Experiment[] ) => {
                this.setState({ experiments });
            })
            .catch((err:any)=>{
                /* Checks whether the the promise was canceled */
                if(!err.isCanceled){
                    this.setState({experiments:undefined})
                }
            })
    }

    public render() {
        return this.state.experiments ? <div>{'results ' + this.state.experiments.length}</div> : null;
    }
}
```

### License

MIT


