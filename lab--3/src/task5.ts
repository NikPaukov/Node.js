class MyEventEmitter {
    private events:Map<String, Function>=new Map<String, Function>();
    registerHandler(name: string, callback: Function){
        this.events.set(name, callback);
    }
    emitEvent(name: string){
        const callback = this.events.get(name);
        if (callback) callback();
        else throw new Error("No such event");
    }

}