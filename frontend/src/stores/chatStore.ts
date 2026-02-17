import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Message {
  id: number
  chatId: number
  senderId: number
  senderName: string
  text: string
  timestamp: Date
  read: boolean
}

export interface ChatThread {
  id: number
  productId?: number
  productTitle?: string
  productImage?: string
  otherUserId: number
  otherUserName: string
  otherUserAvatar?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  messages: Message[]
}

export const useChatStore = defineStore('chat', () => {
  const currentUserId = ref(1) // ID del usuario actual (debería venir del auth)
  
  const chats = ref<ChatThread[]>([
    {
      id: 1,
      productId: 1,
      productTitle: 'iPhone 13 Pro',
      productImage: '/product-1a.svg',
      otherUserId: 2,
      otherUserName: 'María García',
      lastMessage: '¿Todavía está disponible?',
      lastMessageTime: new Date('2026-02-17T10:50:00'),
      unreadCount: 2,
      messages: [
        {
          id: 1,
          chatId: 1,
          senderId: 1,
          senderName: 'Tú',
          text: 'Hola, me interesa el iPhone',
          timestamp: new Date('2026-02-17T10:00:00'),
          read: true,
        },
        {
          id: 2,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: 'Hola! Claro, está en perfecto estado',
          timestamp: new Date('2026-02-17T10:15:00'),
          read: true,
        },
        {
          id: 3,
          chatId: 1,
          senderId: 1,
          senderName: 'Tú',
          text: '¿Cuánto tiempo lo has tenido?',
          timestamp: new Date('2026-02-17T10:18:00'),
          read: true,
        },
        {
          id: 4,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: 'Lo compré hace un año, pero me han regalado el nuevo modelo',
          timestamp: new Date('2026-02-17T10:20:00'),
          read: true,
        },
        {
          id: 5,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: 'La batería está al 92% de salud',
          timestamp: new Date('2026-02-17T10:21:00'),
          read: true,
        },
        {
          id: 6,
          chatId: 1,
          senderId: 1,
          senderName: 'Tú',
          text: 'Genial! ¿Viene con la caja original y accesorios?',
          timestamp: new Date('2026-02-17T10:25:00'),
          read: true,
        },
        {
          id: 7,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: 'Sí, incluye caja, cable y cargador original',
          timestamp: new Date('2026-02-17T10:27:00'),
          read: true,
        },
        {
          id: 8,
          chatId: 1,
          senderId: 1,
          senderName: 'Tú',
          text: '¿Tiene algún arañazo o golpe?',
          timestamp: new Date('2026-02-17T10:28:00'),
          read: true,
        },
        {
          id: 9,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: 'Nada visible, siempre lo he tenido con funda y protector',
          timestamp: new Date('2026-02-17T10:30:00'),
          read: false,
        },
        {
          id: 10,
          chatId: 1,
          senderId: 1,
          senderName: 'Tú',
          text: 'Perfecto! ¿Dónde te viene mejor para quedar?',
          timestamp: new Date('2026-02-17T10:35:00'),
          read: false,
        },
        {
          id: 11,
          chatId: 1,
          senderId: 2,
          senderName: 'María García',
          text: '¿Todavía está disponible?',
          timestamp: new Date('2026-02-17T10:50:00'),
          read: false,
        },
      ],
    },
    {
      id: 2,
      productId: 6,
      productTitle: 'Seat Ibiza 2016',
      productImage: '/placeholder.svg',
      otherUserId: 3,
      otherUserName: 'Roberto Díaz',
      lastMessage: '¿Podemos quedar mañana por la tarde?',
      lastMessageTime: new Date('2026-02-16T19:15:00'),
      unreadCount: 0,
      messages: [
        {
          id: 4,
          chatId: 2,
          senderId: 1,
          senderName: 'Tú',
          text: 'Hola, vi tu anuncio del Seat Ibiza',
          timestamp: new Date('2026-02-16T17:45:00'),
          read: true,
        },
        {
          id: 5,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: 'Hola! Sí, el coche está disponible',
          timestamp: new Date('2026-02-16T17:50:00'),
          read: true,
        },
        {
          id: 6,
          chatId: 2,
          senderId: 1,
          senderName: 'Tú',
          text: '¿El coche tiene algún problema mecánico?',
          timestamp: new Date('2026-02-16T18:00:00'),
          read: true,
        },
        {
          id: 7,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: 'No, todo funciona perfectamente. ITV pasada hace 2 meses',
          timestamp: new Date('2026-02-16T18:30:00'),
          read: true,
        },
        {
          id: 8,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: 'También le acabo de cambiar las pastillas de freno',
          timestamp: new Date('2026-02-16T18:31:00'),
          read: true,
        },
        {
          id: 9,
          chatId: 2,
          senderId: 1,
          senderName: 'Tú',
          text: 'Genial, gracias por la información',
          timestamp: new Date('2026-02-16T18:40:00'),
          read: true,
        },
        {
          id: 10,
          chatId: 2,
          senderId: 1,
          senderName: 'Tú',
          text: '¿Cuántos kilómetros tiene exactamente?',
          timestamp: new Date('2026-02-16T18:42:00'),
          read: true,
        },
        {
          id: 11,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: '120.345 km, uso principalmente urbano',
          timestamp: new Date('2026-02-16T18:44:00'),
          read: true,
        },
        {
          id: 12,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: 'Perfecto, muchas gracias',
          timestamp: new Date('2026-02-16T18:45:00'),
          read: true,
        },
        {
          id: 13,
          chatId: 2,
          senderId: 1,
          senderName: 'Tú',
          text: '¿Podríamos verlo antes de decidir?',
          timestamp: new Date('2026-02-16T19:00:00'),
          read: true,
        },
        {
          id: 14,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: 'Claro, sin problema. ¿Cuándo te vendría bien?',
          timestamp: new Date('2026-02-16T19:10:00'),
          read: true,
        },
        {
          id: 15,
          chatId: 2,
          senderId: 3,
          senderName: 'Roberto Díaz',
          text: '¿Podemos quedar mañana por la tarde?',
          timestamp: new Date('2026-02-16T19:15:00'),
          read: true,
        },
      ],
    },
    {
      id: 3,
      otherUserId: 999,
      otherUserName: 'Soporte ReMarket',
      lastMessage: 'Estamos aquí para ayudarte',
      lastMessageTime: new Date('2026-02-15T12:00:00'),
      unreadCount: 0,
      messages: [
        {
          id: 8,
          chatId: 3,
          senderId: 999,
          senderName: 'Soporte ReMarket',
          text: '¡Bienvenido a ReMarket! ¿En qué podemos ayudarte?',
          timestamp: new Date('2026-02-15T12:00:00'),
          read: true,
        },
        {
          id: 9,
          chatId: 3,
          senderId: 999,
          senderName: 'Soporte ReMarket',
          text: 'Estamos aquí para ayudarte',
          timestamp: new Date('2026-02-15T12:00:00'),
          read: true,
        },
      ],
    },
  ])

  const sortedChats = computed(() => {
    return [...chats.value].sort((a, b) => 
      b.lastMessageTime.getTime() - a.lastMessageTime.getTime()
    )
  })

  const totalUnread = computed(() => {
    return chats.value.reduce((sum, chat) => sum + chat.unreadCount, 0)
  })

  const getChatById = (id: number): ChatThread | undefined => {
    return chats.value.find(chat => chat.id === id)
  }

  const sendMessage = (chatId: number, text: string): void => {
    const chat = chats.value.find(c => c.id === chatId)
    if (!chat) return

    const newMessage: Message = {
      id: Date.now(),
      chatId,
      senderId: currentUserId.value,
      senderName: 'Tú',
      text,
      timestamp: new Date(),
      read: false,
    }

    chat.messages.push(newMessage)
    chat.lastMessage = text
    chat.lastMessageTime = new Date()
  }

  const markChatAsRead = (chatId: number): void => {
    const chat = chats.value.find(c => c.id === chatId)
    if (!chat) return

    chat.messages.forEach(msg => {
      if (msg.senderId !== currentUserId.value) {
        msg.read = true
      }
    })
    chat.unreadCount = 0
  }

  const createOrGetChat = (otherUserId: number, otherUserName: string, productId?: number, productTitle?: string, productImage?: string): ChatThread => {
    // Buscar chat existente
    let chat = chats.value.find(c => 
      c.otherUserId === otherUserId && 
      (!productId || c.productId === productId)
    )

    if (!chat) {
      // Crear nuevo chat
      chat = {
        id: Math.max(...chats.value.map(c => c.id), 0) + 1,
        productId,
        productTitle,
        productImage,
        otherUserId,
        otherUserName,
        lastMessage: '',
        lastMessageTime: new Date(),
        unreadCount: 0,
        messages: [],
      }
      chats.value.push(chat)
    }

    return chat
  }

  return {
    chats,
    sortedChats,
    totalUnread,
    currentUserId,
    getChatById,
    sendMessage,
    markChatAsRead,
    createOrGetChat,
  }
})
