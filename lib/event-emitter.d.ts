export declare class EventEmitter {
    private _events;
    on(event_name: string, callback: (transmission: any) => void): void;
    once(event_name: string, callback: (transmission: any) => void): void;
    private onOnce;
    emit(event_name: string, transmission: any): void;
    setMaxListeners(max_listener_count: number): this;
    eventNames(): string[];
}
