import { makeObservable, observable } from "mobx";

export default class ActivityScore {
    title = 'Hello from MobX';

    constructor () {
        makeObservable(this, {
            title: observable
        })
    }
}