export class EventEmitter {
    constructor() {
        this._events = {};
    }
    on(event_name, callback) {
        this.onOnce(event_name, callback, false);
    }
    once(event_name, callback) {
        this.onOnce(event_name, callback, true);
    }
    onOnce(event_name, callback, once) {
        const evt_obj = {
            Once: once,
            Callback: callback,
        };
        if (this._events.hasOwnProperty(event_name)) {
            this._events[event_name].push(evt_obj);
        }
        else {
            this._events[event_name] = [evt_obj];
        }
    }
    emit(event_name, transmission) {
        if (this._events.hasOwnProperty(event_name)) {
            this._events[event_name]
                .forEach((set, index) => {
                if (set.Once)
                    this._events[event_name].splice(index, 1);
                if (this._events[event_name].length === 0)
                    delete this._events[event_name];
                set.Callback(transmission);
            });
        }
    }
}
//# sourceMappingURL=event-emitter.js.map