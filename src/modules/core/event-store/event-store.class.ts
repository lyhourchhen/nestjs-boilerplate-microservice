import { Logger } from '@nestjs/common';
import { TCPClient, EventFactory } from 'geteventstore-promise';

/**
 * @class EventStore
 * @description EventStore.org
 */
export class EventStore {
    [x: string]: any;
    private _type: string;
    private _eventFactory;
    private _client;

    /**
     * @constructor
     */
    constructor() {
        this._type = 'event-store';
        this._eventFactory = new EventFactory();
    }

    connect(config) {
        try {
            this._client = new TCPClient({
                hostname: config.hostname,
                port: config.tcpPort,
                credentials: config.credentials,
                poolOptions: config.poolOptions,
            });
            Logger.log('EventStore connected successfully.');
        } catch (e) {
            Logger.error(e.message);
        }
        return this;
    }

    getClient() {
        return this.client;
    }

    newEvent(name, payload) {
        return this._eventFactory.newEvent(name, payload);
    }

    close() {
        this.client.close();
        return this;
    }
}