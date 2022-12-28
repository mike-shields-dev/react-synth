function isCustomEvent(e: Event): e is CustomEvent {
    return 'detail' in e;
}

export default isCustomEvent;