import nProgress from "nprogress";

class WebSocketService {
  constructor(url) {
    this.url = url;
    this.websocket = null;
    this.callbacks = [];
  }

  connect() {
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      nProgress.start();
      console.log("WebSocket connection opened");
      // setTimeout(() => {
      //   nProgress.done(true);
      // }, 10000);
    };

    this.websocket.onmessage = (message) => {
      this.callbacks.forEach((callback) => callback(message.data));
    };

    this.websocket.onclose = () => {
      nProgress.done(true);
      console.log("WebSocket connection closed");
    };

    this.websocket.onerror = (error) => {
      nProgress.done(true);
      console.error("WebSocket error:", error);
    };
  }

  sendMessage(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  }

  closeConnection() {
    if (this.websocket) {
      this.websocket.close();
    }
  }

  addMessageListener(callback) {
    this.callbacks.push(callback);
  }

  removeMessageListener(callback) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }
}

export default WebSocketService;
