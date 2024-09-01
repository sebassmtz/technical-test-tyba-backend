export interface Root {
  business_status: string
  geometry: Geometry
  icon: string
  icon_background_color: string
  icon_mask_base_uri: string
  name: string
  opening_hours: OpeningHours
  photos: Photo[]
  place_id: string
  plus_code: PlusCode
  rating: number
  reference: string
  scope: string
  types: string[]
  user_ratings_total: number
  vicinity: string
}

export interface Geometry {
  location: Location
  viewport: Viewport
}

export interface Location {
  lat: number
  lng: number
}

export interface Viewport {
  northeast: Northeast
  southwest: Southwest
}

export interface Northeast {
  lat: number
  lng: number
}

export interface Southwest {
  lat: number
  lng: number
}

export interface OpeningHours {
  open_now: boolean
}

export interface Photo {
  height: number
  html_attributions: string[]
  photo_reference: string
  width: number
}

export interface PlusCode {
  compound_code: string
  global_code: string
}
