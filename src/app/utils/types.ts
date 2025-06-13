export interface Amenity {
  icon: string;
  amenity: string;
  subItem: string;
}


export interface Hotel {
  id: number;
  hotel_name?: string;
  location_city?: string;
  location_state?: string;
  location_country?: string;
  location_building_address?: string;
  location_plot?: string;
  main_photo?: string[];
 star_rating?: number;
  vat?: string;
 hotel_badge?: string;
 age_restriction?: string;
  state?: {
    name?: string;
    slug?: string;
    country?: {
      name?: string;
    };
  };

  country?: {
    name?: string;
  };

  district?: {
    name?: string;
    state?: {
      name?: string;
      slug?: string;
      country?: {
        name?: string;
      };
    };
  };

  rooms?: Room[];
}

export interface Room {
  id: number;
  hotel?: Hotel;
  rooms_capacity?: number;
  number_of_rooms?: number;
  number_of_room_taken: number;
  room_amenities: Amenity[];
  rooms_rates_per_night: number;
  late_night_date?: { late_night_date: string }[];
}
