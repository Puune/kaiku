package ryhma_3.server;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.DataListener;
import com.mongodb.connection.Server;

import ryhma_3.castObject.ChatObject;
import ryhma_3.init.IServerInit;

/**
 * @author Panu Lindqvist
 * This thread handles operations regarding the chat server
 *
 */
public class GlobalChatServer implements IServer {
	
	IServerInit init;
	final SocketIOServer server;
	private boolean running = true;
	
	/**
	 * @param IChatServerInit: init
	 * This class requires a configuration object as a constructor parameter
	 */
	public GlobalChatServer(IServerInit init) {
		this.init = init;
		server = init.getSocketServer();
	}
	
	
	
	public void start() {
		
		//global namespace (= broadcast to all connected clients) listener
		server.addEventListener("chatevent", ChatObject.class, new DataListener<ChatObject>() {
			public void onData(SocketIOClient client, ChatObject data, AckRequest ackSender) throws Exception {
				server.getBroadcastOperations().sendEvent("chatevent", data);
				System.out.println(data.getContent());	//DEBUG
			}
		});
		
		
		server.start();
	}
	
	
	
	/**
	 * Quit this server and thread.
	 */
	public void stopServer()  {
		server.stop();
	}
}