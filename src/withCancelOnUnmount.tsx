import * as React from 'react';

export interface WithCancelOnUnmountProps {
    cancelablePromise<T>(promise: Promise<T>): Promise<T>;
    getIsCanceled(): boolean;
}

export const withCancelOnUnmount = <P extends object>(Component: React.ComponentType<P>) =>
    class WithCancelOnUnmount extends React.Component<Omit<P, keyof WithCancelOnUnmountProps>> {
        private isCanceled = false;
        private cancelablePromise = (promise: Promise<any>) => new Promise((resolve, reject) => {
            promise
                .then((result) => this.isCanceled ? reject({ isCanceled: true }) : resolve(result))
                .catch((err) => this.isCanceled ? reject({ isCanceled: true }) : reject(err || {}));
        })
        private getIsCanceled = () => {
            return this.isCanceled;
        }
        public componentWillUnmount() {
            this.isCanceled = true;
        }
        public render() {
            return <Component {...this.props as P}
                cancelablePromise={this.cancelablePromise}
                getIsCanceled={this.getIsCanceled} />;
        }
    };
