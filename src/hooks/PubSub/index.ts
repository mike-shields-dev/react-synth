import PubSub from 'pubsub-js';
import { useEffect } from 'react';

interface MidiMessage {
    uid: string;
    data: [number, number, number];
  }

function usePublish(topic: string, payload: MidiMessage) {
    PubSub.publish(topic, payload);
}

function useSubscribe(topic: string, subscriptionHandler: PubSubJS.SubscriptionListener<MidiMessage>) {
    useEffect(() => {
        const subscription = PubSub.subscribe(topic, subscriptionHandler);
        
        return () => {
            PubSub.unsubscribe(subscription)
        };
    }, []);
}

export { useSubscribe, usePublish };
export type { MidiMessage };
