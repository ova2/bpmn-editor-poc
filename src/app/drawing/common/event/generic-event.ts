class GenericEvent<T> {
    payload: T;
    nativeEvent: Event;

    constructor(payload: T, nativeEvent?: Event) {
        this.payload = payload;
        this.nativeEvent = nativeEvent || null;
    }
}

export default GenericEvent;
