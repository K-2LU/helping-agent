import vine, { SimpleMessagesProvider } from "@vinejs/vine";

vine.messagesProvider = new SimpleMessagesProvider({
    'required' : 'The {{ field }} is required',
    'string': 'The value of {{ field}} must be a string',
    
})