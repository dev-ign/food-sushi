export interface MenuItem {
  id: string
  name: string
  price: number
  cat: string
  tags: string[]
  desc: string
}

export interface AddonItem {
  id: string
  name: string
  price: number
}

export interface CartEntry {
  id: string
  qty: number
}

export const MENU: MenuItem[] = [
  { id: 'spicytuna', name: 'Spicy Tuna Roll', price: 8.75, cat: 'Popular', tags: ['Popular', 'Spicy'], desc: 'Spicy tuna mix, cucumber, sesame seeds, drizzled with house "baku" sauce.' },
  { id: 'combustion', name: 'Internal Combustion Roll', price: 16.75, cat: 'Popular', tags: ['Chef Favorite', 'Spicy'], desc: 'Spicy tuna, krabstick, avocado, torched salmon, 7-spice, baku, candied jalapeño.' },
  { id: 'argh', name: '"ARGH!" Tampa Roll', price: 8.75, cat: 'Popular', tags: ['Popular'], desc: 'Tempura red snapper, masago, scallions, sesame seeds, japanese mayo.' },
  { id: 'snowcali', name: 'Snow California Roll', price: 11.00, cat: 'Rolls', tags: ['New'], desc: 'Pacific red snow crab, crisp cucumber, creamy avocado, toasted sesame.' },
  { id: 'mrcrabs', name: 'Mr Crabs Roll', price: 11.95, cat: 'Rolls', tags: [], desc: 'Tempura softshell crab, spring mix, carrots, avocado, cucumber, eel sauce.' },
  { id: 'gator', name: 'Classic Gator Roll', price: 9.00, cat: 'Rolls', tags: ['Spicy'], desc: 'Spicy tuna, yellowtail, green onions, masago, wonton strings, spicy baku.' },
  { id: 'florida', name: 'Classic Florida Roll', price: 8.75, cat: 'Rolls', tags: [], desc: 'Tuna, salmon, cream cheese, avocado, sesame seeds, masago.' },
  { id: 'chickfried', name: 'Chick Fried Chicken Roll', price: 8.75, cat: 'Rolls', tags: [], desc: 'Karaage or tempura fried chicken, avocado, eel sauce, wonton strings.' },
  { id: 'salmonnigiri', name: 'Salmon Nigiri (2pc)', price: 6.50, cat: 'Nigiri', tags: [], desc: 'Hand-pressed sushi rice, fresh Atlantic salmon.' },
  { id: 'thaitea', name: 'Thai Tea Boba', price: 5.75, cat: 'Boba', tags: ['Popular'], desc: 'Classic Thai tea, milk, chewy tapioca pearls.' },
  { id: 'miso', name: 'Miso Soup', price: 3.50, cat: 'Appetizers', tags: [], desc: 'Traditional dashi, tofu, wakame, scallions.' },
]

export const CATS = ['All', 'Popular', 'Rolls', 'Nigiri', 'Sashimi', 'Appetizers', 'Ramen', 'Boba', 'Drinks']

export const ADDONS: AddonItem[] = [
  { id: 'eel', name: 'Extra Eel Sauce', price: 0.50 },
  { id: 'mayo', name: 'Spicy Mayo', price: 0.50 },
  { id: 'avocado', name: 'Add Avocado', price: 1.50 },
]

export const SPICE = ['Mild', 'Medium', 'Hot']

export const TIPS = [
  { label: 'No tip', val: 0 },
  { label: '10%', val: 0.10 },
  { label: '15%', val: 0.15 },
  { label: '20%', val: 0.20 },
]

export const IMGS: Record<string, string> = {
  spicytuna: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
  combustion: 'https://images.unsplash.com/photo-1607301405390-d831c242f59b?auto=format&fit=crop&w=600&q=80',
  argh: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80',
  snowcali: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=600&q=80',
  mrcrabs: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
  gator: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?auto=format&fit=crop&w=600&q=80',
  florida: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=600&q=80',
  chickfried: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
  salmonnigiri: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?auto=format&fit=crop&w=600&q=80',
  thaitea: 'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=80',
  miso: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
}

export const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  Popular: { bg: '#A62B1C', color: '#fff' },
  Spicy: { bg: 'rgba(247,241,231,.94)', color: '#A62B1C' },
  'Chef Favorite': { bg: '#1C1A19', color: '#E9CF93' },
  New: { bg: '#BE9A4E', color: '#1C1A19' },
}

export const MILD_CATS = ['Boba', 'Drinks', 'Appetizers', 'Nigiri', 'Sashimi']
export const UPSELL_IDS = ['miso', 'thaitea', 'salmonnigiri']

export const fmt = (n: number) => '$' + n.toFixed(2)
