import PusherServer from "pusher"
import PusherClient from "pusher-js"

export const pusherServer = process.env.PUSHER_APP_ID
  ? new PusherServer({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      cluster: process.env.PUSHER_CLUSTER!,
      useTLS: true,
    })
  : null

export const pusherClient = process.env.PUSHER_KEY
  ? new PusherClient(process.env.PUSHER_KEY!, {
      cluster: process.env.PUSHER_CLUSTER!,
    })
  : null
