import WebSocketService from "@/services/websocket";
import nProgress from "nprogress";
import { useEffect, useRef, useState } from "react";

const wsOrigin = import.meta.env.VITE_BASE_URL.replace("https://", "");

export const useWebsocketFilter = ({ sessionId }) => {
  const websocketService = useRef(
    new WebSocketService(
      `wss://${wsOrigin}v1/hotel-availability/event-listener/${sessionId}`
    )
  );

  const [filters, setFilters] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    websocketService.current.connect();

    const messageListener = (message) => {
      const data = JSON.parse(message);

      if (data?.processCompleted) {
        websocketService.current.removeMessageListener(messageListener);
        websocketService.current.closeConnection();
        setLoading(false);

        nProgress.done();
      } else {
        setLoading(true);
      }

      if (data?.filters)
        setFilters((prev) => {
          if (prev?.totalHotels > data?.filters?.totalHotels) return prev;

          return data?.filters;
        });
    };

    websocketService.current.addMessageListener(messageListener);

    return () => {
      setLoading(false);
      websocketService.current.removeMessageListener(messageListener);
      websocketService.current.closeConnection();
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!filters) nProgress.done(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [filters]);

  return { filters, loading };
};
