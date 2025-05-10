export const defaultAvatars = [
  '/avatars/avatar-1.jpg',
  '/avatars/avatar-2.jpg',
  '/avatars/avatar-3.jpg',
  '/avatars/avatar-4.jpg'
]

export function getRandomAvatar() {
  const index = Math.floor(Math.random() * defaultAvatars.length)
  return defaultAvatars[index]
}

export function getAvatarByIndex(index: number) {
  return defaultAvatars[index % defaultAvatars.length]
}
