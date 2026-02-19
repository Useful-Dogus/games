import type {
  DropEventPayload,
  GameOverState,
  HudState,
  MergeEventPayload
} from "./types";

type EventMap = {
  "hud:update": HudState;
  "game:over": GameOverState;
  "game:drop": DropEventPayload;
  "game:merge": MergeEventPayload;
};

type Handler<T> = (payload: T) => void;

export class RuntimeEvents {
  private listeners = new Map<keyof EventMap, Set<Handler<unknown>>>();

  on<K extends keyof EventMap>(event: K, handler: Handler<EventMap[K]>): () => void {
    const handlers = this.listeners.get(event) ?? new Set<Handler<unknown>>();
    handlers.add(handler as Handler<unknown>);
    this.listeners.set(event, handlers);

    return () => {
      handlers.delete(handler as Handler<unknown>);
    };
  }

  emit<K extends keyof EventMap>(event: K, payload: EventMap[K]): void {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => {
      (handler as Handler<EventMap[K]>)(payload);
    });
  }
}
