import PubSub from 'pubsub-js';
import { useEffect } from 'react';

function usePublish(topic: string, payload: any) {
    PubSub.publish(topic, payload);
}

function useSubscribe(topic: string, subscriptionHandler: PubSubJS.SubscriptionListener<any>) {
    useEffect(() => {
        const subscription = PubSub.subscribe(topic, subscriptionHandler);
        
        return () => {
            PubSub.unsubscribe(subscription)
        };
    }, []);
}

export { useSubscribe, usePublish };
