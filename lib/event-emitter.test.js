"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_emitter_1 = require("./event-emitter");
test("on_emit", () => {
    const ee = new event_emitter_1.EventEmitter();
    const event_name = "event/name";
    const resolution_message = "resolution_message";
    const response = new Promise((resolve) => {
        ee.on(event_name, (transmission) => {
            resolve(transmission);
        });
    });
    ee.emit(event_name, resolution_message);
    return expect(response).resolves.toStrictEqual(resolution_message);
});
test("on_emit_multiple", () => {
    const ee = new event_emitter_1.EventEmitter();
    const event_name = "event/name";
    const resolution_message = "resolution_message";
    const emit_count = 4;
    const response = new Promise((resolve) => {
        let emit_counter = 0;
        let transmission_pack = '';
        ee.on(event_name, (transmission) => {
            transmission_pack += transmission;
            if (++emit_counter === emit_count) {
                resolve(transmission_pack);
            }
        });
    });
    for (let i = 0; i < emit_count; i++) {
        ee.emit(event_name, resolution_message);
    }
    return expect(response)
        .resolves
        .toStrictEqual(resolution_message.repeat(emit_count));
});
test("once_emit_multiple", () => {
    const ee = new event_emitter_1.EventEmitter();
    const event_name = "event/name";
    const on_message = "on";
    const once_message = "once";
    const emit_count = 4;
    const response = new Promise((resolve) => {
        let emit_counter = 0;
        let transmission_pack = '';
        ee.on(event_name, (transmission) => {
            transmission_pack += transmission;
            if (++emit_counter === emit_count) {
                resolve(transmission_pack);
            }
        });
        ee.once(event_name, (transmission) => {
            transmission_pack = once_message + transmission_pack;
        });
    });
    for (let i = 0; i < emit_count; i++) {
        ee.emit(event_name, on_message);
    }
    return expect(response)
        .resolves
        .toStrictEqual(once_message + on_message.repeat(emit_count));
});
//# sourceMappingURL=event-emitter.test.js.map