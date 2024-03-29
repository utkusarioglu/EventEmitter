
/* ////////////////////////////////////////////////////////////////////////////
 *
 *	IMPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

import { i_mapEventEmitter } from "./t_event-emitter";






/* ////////////////////////////////////////////////////////////////////////////
 *
 *	EXPORTS
 *
 * ///////////////////////////////////////////////////////////////////////// */

/**
 * Stand-in for NodeJS event emitter
 * 
 * @remarks
 * Component: Controller
 * */
export class EventEmitter {

    /**
     * Stores all the active events
     */
    private _events: i_mapEventEmitter<any> = {};

    /**
     * Number of listeners attached to each event
     * TODO: implement maxListenerCount
     */
    //private _event_listener_count: i_map<number> = {};

    /**
     * Listens to the occurence of an event every time its emitted
     * 
     * @param event_name
     * @param callback
     */
    public on(event_name: string, callback: (transmission: any) => void): void {
        this.onOnce(event_name, callback, false);
    }

    /**
     * Listens to the occurence of an event only once
     * 
     * @param event_name
     * @param callback
     */
    public once(event_name: string, callback: (transmission: any) => void): void {
        this.onOnce(event_name, callback, true);
    }

    /**
     * Processes on and once methods
     * 
     * @param event_name
     * @param callback
     * @param once
     */
    private onOnce(event_name: string, callback: object, once: boolean) {

        const evt_obj = {
            Once: once,
            Callback: callback,
        }

        if (this._events.hasOwnProperty(event_name)) {
            this._events[event_name].push(evt_obj)
        } else {
            this._events[event_name] = [evt_obj];
        }
    }

    /**
     * Emits the event
     * 
     * @param event_name
     * @param transmission
     */
    public emit(event_name: string, transmission: any) {
        if (this._events.hasOwnProperty(event_name)) {
            this._events[event_name]
                .forEach((set: any, index: number) => {
                    if (set.Once) this._events[event_name].splice(index, 1);
                    if (this._events[event_name].length === 0)
                        delete this._events[event_name];
                    set.Callback(transmission);
                });
        }
    }

    /**
     * Sets the max number of listeners for an event
     * 
     * @param max_listener_count
     */
    public setMaxListeners(max_listener_count: number): this {

        return this;
    }

    /**
     * Return currently active event names
     * */
    public eventNames() {
        return Object.keys(this._events);
    }

}