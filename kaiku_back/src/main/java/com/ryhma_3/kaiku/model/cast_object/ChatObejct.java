package com.ryhma_3.kaiku.model.cast_object;

public class ChatObejct {
	private String chat_id;
	private String chatName;
	private String type = "private";
	private MessageObject[] messages;
	
	public ChatObejct(String chat_id, String chatName, String type, MessageObject[] messages) {
		super();
		this.chat_id = chat_id;
		this.chatName = chatName;
		this.type = type;
		this.messages = messages;
	}
	
	public ChatObejct() {}

	public String getChat_id() {
		return chat_id;
	}

	public void setChat_id(String chat_id) {
		this.chat_id = chat_id;
	}

	public String getChatName() {
		return chatName;
	}

	public void setChatName(String chatName) {
		this.chatName = chatName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public MessageObject[] getMessages() {
		return messages;
	}

	public void setMessages(MessageObject[] messages) {
		this.messages = messages;
	}
	
	
}
